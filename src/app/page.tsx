import { isString } from "../utils/shared";
import Login from "../components/login";

export const runtime = 'edge';

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const searchState = searchParams.state;

  if (isString(searchState)) {
    return <Login searchState={searchState} />
  }

  return (
    <div>state</div>
  )
}

