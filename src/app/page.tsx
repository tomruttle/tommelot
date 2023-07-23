import { isString } from "../utils/shared";
import Login from "../components/login";
import DiscoBall from "../components/disco-ball";

export const runtime = 'edge';

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const searchState = searchParams.state;

  if (isString(searchState)) {
    return (
      <>
        <DiscoBall />
        <Login searchState={searchState} />
      </>
    );
  }

  return (
    <div>
      state
      <DiscoBall />
    </div>
  )
}
