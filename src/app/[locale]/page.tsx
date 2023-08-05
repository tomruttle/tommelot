import Content from "@/src/components/content";
import { NextIntlClientProvider } from "next-intl";
import { loadMessages } from "@/i18n";
import { notFound } from "next/navigation";
import RsvpForm from "@/src/components/rsvp/rsvp-form";
import IntroText from "@/src/components/intro-text";
import Contact from "@/src/components/contact";
import Playlist from "@/src/components/playlist";
import Nav from "@/src/components/nav";

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
      <IntroText />

      <Nav />

      <Content />

      <NextIntlClientProvider locale={locale} messages={messages}>
        <RsvpForm />
      </NextIntlClientProvider>

      <Contact />

      <Playlist />
    </>
  )
}
