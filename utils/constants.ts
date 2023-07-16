export enum Errors {
    Missing = 'missing-password',
    Incorrect = 'incorrect-password',
    Invalid = 'invalid-method',
}

export const CFP_COOKIE_KEY = 'CFP-Auth-Key';
export const CFP_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const CFP_ALLOWED_PATHS = ['/cfp_login'];