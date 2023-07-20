import { isString } from "./shared";

export enum States {
  Missing = 'missing-password',
  Incorrect = 'incorrect-password',
  Invalid = 'invalid-method',
  Empty = 'empty-password',
  General = 'general'
}
  
export function getState(test: string): States {
  switch (test) {
    case States.Missing.toString(): return States.Missing;
    case States.Incorrect.toString(): return States.Incorrect;
    case States.Invalid.toString(): return States.Invalid;
    case States.Empty.toString(): return States.Empty;
  }

  return States.General;
}

export function getNewState(cfpPassword: string, cookiePassword: string): States | null {
  if (!isString(cfpPassword)) {
    return States.Missing;
  }
  
  if (!isString(cookiePassword)) {
    return States.Empty;
  }
  
  if (cookiePassword !== cfpPassword) {
    return States.Incorrect;
  }

  return null;
}