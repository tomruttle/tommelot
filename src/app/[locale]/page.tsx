import Content from "@/src/components/content";
import DiscoBall from "../../components/disco-ball";
import { NextIntlClientProvider } from "next-intl";
import { loadMessages } from "@/i18n";
import { notFound } from "next/navigation";
import RsvpForm from "@/src/components/rsvp/rsvp-form";
import TP from "@/src/components/atoms/tp";
import { LINE_CLASSES } from "@/src/utils/constants";

export const runtime = 'edge';

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  let messages;
  try {
    const page = await loadMessages({ locale });
    messages = page.messages;
  } catch (error) {
    notFound();
  }

  return (
    <>
      <DiscoBall radius={50} tileSize={6} tileGap={2} />

      <div className="text-center">
        <TP>2 March 2024<br /><br />Berlin</TP>
        <hr className={`w-1/2 mx-auto my-4 border-b ${LINE_CLASSES}`} />
        <TP>2 Maart 2024<br /><br />Berlijn</TP>

        <div className="my-4">
          <TP>TMP: Spotify thing!</TP>
        </div>
      </div>

      <NextIntlClientProvider locale={locale} messages={messages}>
        <RsvpForm />
      </NextIntlClientProvider>

      <Content />
    </>
  )
}
