import { getState } from "../utils/states"
import { isString } from "../utils/shared";

export const runtime = 'edge';

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const searchState = searchParams.state;

  if (!isString(searchState)) {
    return <div>You win!</div>
  }

  const state = getState(searchState);

  return (
    <div>
        Hello World! {state.toString()}
        <form action="/api/login" method="post">
          <input type="text" name="password"></input>
          <button type="submit">Enter</button>
        </form>
    </div>
  )
}

