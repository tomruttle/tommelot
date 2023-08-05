import { notFound } from 'next/navigation';
import { Red_Hat_Mono } from 'next/font/google'
import { useLocale } from 'next-intl';
import LocaleSwitcher from '@/src/components/locale-switcher';

export const runtime = 'edge';

const redHatMono = Red_Hat_Mono({ subsets: ['latin'] })

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string }; }) {
  const locale = useLocale();
 
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={redHatMono.className}>
        <div className={`max-w-fit m-4 float-right`}>
          <LocaleSwitcher locale={locale} />
        </div>

        <main className="clear-both min-h-screen mx-auto md:w-3/4 xl:w-1/2 px-8 sm:px-16 md:px-24 space-y-8 pb-16 overflow-x-scroll">{children}</main>
      </body>
    </html>
  );
}
