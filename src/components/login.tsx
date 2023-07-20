import { States, getState } from "../utils/states";

export const runtime = 'edge';

export default function Login({ searchState }: { searchState: string }) {
  const state = getState(searchState);
  const isIncorrectPassword = state === States.Incorrect;
  const inputBorderColor = isIncorrectPassword ? 'border-red-500' : 'border-gray-200';
  const inputFocusBorderColor = isIncorrectPassword ? 'focus:border-red-600' : 'focus:border-gray-300'

  return (
    <form className="w-full max-w-sm" action="/api/login" method="post">
      <div className="sm:flex">
        <div className="sm:w-8/12 min-w-fit">
          <input className={`bg-black appearance-none focus:outline-none border w-full py-2 px-4 leading-tight min-w-[10rem] ${inputFocusBorderColor} ${inputBorderColor}`} placeholder="password" id="password" name="password" type="password" required />
          {isIncorrectPassword ? (
            <div className="text-xs text-red-500 py-1 px-4">Incorrect Password</div>
          ) : null}
        </div>
        <div className="sm:w-1/12 h-4"></div>
        <div className="sm:w-3/12">
          <button className="hover:underline py-2 px-4 focus:outline-none border border-black focus:border-white" type="submit">
            Enter
          </button>
        </div>
      </div>
    </form>
  );
}

