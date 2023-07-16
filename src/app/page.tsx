import { getError } from "../utils/errors"
import { isString } from "../utils/shared";

export const runtime = 'experimental-edge';

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const searchError = searchParams.error;

  if (!isString(searchError)) {
    return <div>You win!</div>
  }

  const error = getError(searchError);

  return (
    <div>
        Hello World! {error.toString()}
        <form action="/api/login" method="post">
          <input type="text" name="password"></input>
          <button type="submit">Enter</button>
        </form>
    </div>
  )
}

