import { isString } from "@/src/utils/shared";
import { Base64 } from "js-base64";

const pemHeader = '-----BEGIN PRIVATE KEY-----';
const pemFooter = '-----END PRIVATE KEY-----';
const baseURL = 'https://sheets.googleapis.com/'
const algoName = 'RSASSA-PKCS1-v1_5'
const algorithm = { name: algoName, hash: { name: 'SHA-256', } }
const searchParams = new URLSearchParams({
  valueInputOption: 'RAW',
  insertDataOption: 'INSERT_ROWS',
})
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

async function getPrivateKey(keyIn: string): Promise<CryptoKey> {
  const pem = keyIn.replace(/\n/g, '')

  if (!pem.startsWith(pemHeader) || !pem.endsWith(pemFooter)) {
    throw new Error('Invalid service account private key');
  }

  const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
  const buffer = Base64.toUint8Array(pemContents)

  return crypto.subtle.importKey('pkcs8', buffer, algorithm, false, ['sign'])
}

async function getAssertion(email: string, kid: string, key: CryptoKey): Promise<string> {
  const headerArgs = {
    alg: 'RS256',
    typ: 'JWT',
    kid,
  };

  const iat = Math.floor(Date.now() / 1000)

  const payloadArgs = {
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: iat + 3600,
    iat
  };

  const header = Base64.encodeURI(JSON.stringify(headerArgs),)
  const payload = Base64.encodeURI(JSON.stringify(payloadArgs));
  const textEncoder = new TextEncoder()
  const inputArrayBuffer = textEncoder.encode(`${header}.${payload}`)
  const outputArrayBuffer = await crypto.subtle.sign({ name: algoName }, key, inputArrayBuffer)
  const signature = Base64.fromUint8Array(new Uint8Array(outputArrayBuffer), true)

  return `${header}.${payload}.${signature}`
}

async function getAccessToken(credentials: string): Promise<string> {
  const serviceAccount = JSON.parse(credentials);

  const privateKey = await getPrivateKey(serviceAccount.private_key);

  const assertion = await getAssertion(serviceAccount.client_email, serviceAccount.private_key_id, privateKey);

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: JSON.stringify({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion
    })
  })

  if (tokenResponse.status !== 200) {
    throw new Error(`invalid status from token endpoint: ${tokenResponse.status}`)
  }

  const { access_token: accessToken } = await tokenResponse.json();

  if (!isString(accessToken)) {
    throw new Error('access token not found in token response');
  }

  return accessToken
}

export async function appendToSheets(values: FormDataEntryValue[]) {
  const { GOOGLE_SHEET_ID, GOOGLE_CREDS } = process.env;

  if (!isString(GOOGLE_SHEET_ID) || !isString(GOOGLE_CREDS)) {
    throw new Error('Missing environment variables')
  }

  const accessToken = await getAccessToken(GOOGLE_CREDS);

  const range = `A1:${alphabet[values.length - 1]}1`;

  const url = new URL(`/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${encodeURIComponent(range)}:append?${searchParams.toString()}`, baseURL)

  const appendResponse = await fetch(url.toString(), {
    method: 'POST',
    body: JSON.stringify({ range, values: [values] }),
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
  })

  if (appendResponse.status !== 200) {
    throw new Error(`invalid status from sheets endpoint: ${appendResponse.status}`)
  }
}