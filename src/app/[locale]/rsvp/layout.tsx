import { loadMessages } from "@/i18n";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

export default async function Rsvp({ children, params: { locale } }: { children: React.ReactNode, params: { locale: string }}) {
  let messages;
  try {
    const page = await loadMessages({ locale });
    messages = page.messages;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
