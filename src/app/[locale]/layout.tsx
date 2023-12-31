import { notFound } from 'next/navigation';
import { Red_Hat_Mono } from 'next/font/google'
import { useLocale } from 'next-intl';
import LocaleSwitcher from '@/src/components/locale-switcher';
import { colors } from '@/src/utils/constants';

export const runtime = 'edge';

const redHatMono = Red_Hat_Mono({ subsets: ['latin'] })

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string }; }) {
  const locale = useLocale();
 
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${redHatMono.className} ${colors.BACKGROUND_COLOR} ${colors.TEXT_COLOR}`}>
        <div className={`max-w-fit m-4 float-right`}>
          <LocaleSwitcher locale={locale} />
        </div>

        <main className="clear-both min-h-screen mx-auto md:w-3/4 xl:w-1/2 px-8 sm:px-16 md:px-24 space-y-8 pb-16 overflow-x-scroll">{children}</main>
      
        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "fd70b5b6dd5042f689d920914b3e2817"}'></script>
      </body>
    </html>
  );
}
