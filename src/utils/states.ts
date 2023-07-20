import { isString } from "./shared";

export enum States {
  Missing = 'missing-password',
  Incorrect = 'incorrect-password',
  Empty = 'empty-password',
  General = 'general'
}
  
export function getState(test: string): string {
  switch (test) {
    case States.Missing.toString(): return States.Missing;
    case States.Incorrect.toString(): return States.Incorrect;
    case States.Empty.toString(): return States.Empty;
  }

  return States.General;
}

function formatString(input: string): string {
  return input.trim().toLocaleLowerCase();
}

export function getNewState(cfpPassword: string, cookiePassword: string): States | null {
  if (!isString(cfpPassword)) {
    return States.Missing;
  }
  
  if (!isString(cookiePassword)) {
    return States.Empty;
  }
  
  if (formatString(cookiePassword) !== formatString(cfpPassword)) {
    return States.Incorrect;
  }

  return null;
}