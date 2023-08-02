import TH3 from "../atoms/th3";
import TP from "../atoms/tp";

export default function PostSubmission({ attendance }: { attendance: boolean }) {
  return attendance ? (
    <>
      <TH3>Pronouncement</TH3>
      <TP>By the power vested in us by the love we share, we now pronounce you a registered wedding guest!</TP>
    </>
  ) : (
    <>
      <TH3>RSVP</TH3>
      <TP>We are sorry you can’t make it. Please know that we appreciate having you in our lives!</TP>
    </>
  )
}