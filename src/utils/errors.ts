export enum Errors {
  Missing = 'missing-password',
  Incorrect = 'incorrect-password',
  Invalid = 'invalid-method',
  Empty = 'empty-password',
  General = 'general'
}
  
export function getError(test: string): Errors {
  switch (test) {
    case Errors.Missing.toString(): return Errors.Missing;
    case Errors.Incorrect.toString(): return Errors.Incorrect;
    case Errors.Invalid.toString(): return Errors.Invalid;
    case Errors.Empty.toString(): return Errors.Empty;
  }

  return Errors.General;
}