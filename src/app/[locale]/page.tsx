import { isString } from "../../utils/shared";
import Login from "../../components/login";
import DiscoBall from "../../components/disco-ball";

export const runtime = 'edge';

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const searchState = searchParams.state;

  if (isString(searchState)) {
    return (
      <div>
        <DiscoBall />
        <div className="sm:w-1/12 h-12"></div>
        <Login searchState={searchState} />
      </div>
    );
  }

  return (
    <div>
      <DiscoBall />
      <div className="sm:w-1/12 h-12"></div>
      TEST
    </div>
  )
}
