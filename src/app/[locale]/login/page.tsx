import DiscoBall from "@/src/components/disco-ball";
import Spacer from "@/src/components/form/spacer";
import Login from "@/src/components/login";
import { isString } from "@/src/utils/shared";

export const runtime = 'edge';

export default function LoginPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const searchState = isString(searchParams.state) ? searchParams.state : '';

  return (
    <div className="h-full flex">
      <div className="m-auto">
        <DiscoBall radius={100} tileSize={8} tileGap={2} />
        <Spacer />
        <Login searchState={searchState} />
      </div>
    </div>
  );
}