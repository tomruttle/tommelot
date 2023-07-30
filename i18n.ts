import {getRequestConfig} from 'next-intl/server';
 
export async function loadMessages({ locale }: { locale: string }) {
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  }
}

export default getRequestConfig(loadMessages);
