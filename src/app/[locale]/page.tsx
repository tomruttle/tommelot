import Content from "@/src/components/content";
import DiscoBall from "../../components/disco-ball";
import { NextIntlClientProvider } from "next-intl";
import { loadMessages } from "@/i18n";
import { notFound } from "next/navigation";
import RsvpForm from "@/src/components/rsvp/rsvp-form";
import IntroText from "@/src/components/intro-text";
import Contact from "@/src/components/contact";
import Playlist from "@/src/components/playlist";
import TA from "@/src/components/atoms/ta";

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

      <p className="text-xs w-fit mx-auto"><TA href="#story">Story</TA> &#8226; <TA href="#wedding">Wedding</TA> &#8226; <TA href="#travel">Travel</TA> &#8226; <TA href="#rsvp">RSVP</TA> &#8226; <TA href="#contact">Contact</TA></p>

      <Content />

      <NextIntlClientProvider locale={locale} messages={messages}>
        <RsvpForm />
      </NextIntlClientProvider>

      <Contact />

      <Playlist />
    </>
  )
}
