import TH3 from "../atoms/th3";
import TP from "../atoms/tp";

export default function PostSubmission({ attendance }: { attendance: boolean }) {
  return (
    <div>
      {attendance ? (
        <>
          <TH3>PRONOUNCEMENT</TH3>
          <TP>By the power vested in us by the love we share, we now pronounce you a registered wedding guest!</TP>
          <TP>If you have any questions, please feel free to send them to info@tommelot.com.</TP>
          <TP>Guest participation is encouraged. If you would like to give a speech or surprise Tom and Annelot in a different way during the event, please reach out to our wonderful masters of ceremony, Britt Boeddha and Mei Li, at mc@tommelot.com.</TP>
        </>
      ) : (
        <>We are sorry you can’t make it. Please know that we appreciate having you in our lives!</>
      )}
    </div>
  )
}