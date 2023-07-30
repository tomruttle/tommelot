import Link from "next-intl/link";
import DiscoBall from "../../components/disco-ball";

export const runtime = 'edge';

export default function Home() {
  return (
    <div>
      <DiscoBall radius={50} tileSize={6} tileGap={2} />
      <div className="sm:w-1/12 h-12"></div>
      <div>TEST</div>
      <Link href="/rsvp">RSVP PLEASE</Link>
    </div>
  )
}
