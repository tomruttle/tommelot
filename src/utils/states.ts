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
