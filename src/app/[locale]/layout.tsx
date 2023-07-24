import { notFound } from 'next/navigation';
import { Red_Hat_Mono } from 'next/font/google'
import { useLocale } from 'next-intl';

export const runtime = 'edge';

const redHatMono = Red_Hat_Mono({ subsets: ['latin'] })

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string }; }) {
  const locale = useLocale();
 
  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
    return;
  }

  return (
    <html lang={locale}>
      <body className={redHatMono.className}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">{children}</main>
      </body>
    </html>
  );
}
