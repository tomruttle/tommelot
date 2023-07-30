import DiscoBall from "@/src/components/disco-ball";
import Login from "@/src/components/login";
import { isString } from "@/src/utils/shared";

export const runtime = 'edge';

export default function LoginPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const searchState = isString(searchParams.state) ? searchParams.state : '';

  return (
    <div>
      <DiscoBall />
      <div className="sm:w-1/12 h-12"></div>
      <Login searchState={searchState} />
    </div>
  );
}