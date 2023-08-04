import Content from "@/src/components/content";
import DiscoBall from "../../components/disco-ball";
import { NextIntlClientProvider } from "next-intl";
import { loadMessages } from "@/i18n";
import { notFound } from "next/navigation";
import RsvpForm from "@/src/components/rsvp/rsvp-form";
import IntroText from "@/src/components/intro-text";
import Contact from "@/src/components/contact";

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

      <IntroText />
      <Content />

      <NextIntlClientProvider locale={locale} messages={messages}>
        <RsvpForm />
      </NextIntlClientProvider>

      <Contact />
    </>
  )
}
