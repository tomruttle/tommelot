import { notFound } from 'next/navigation';
import { Red_Hat_Mono } from 'next/font/google'
import { useLocale } from 'next-intl';
import LocaleSwitcher from '@/src/components/locale-switcher';
import { LINE_CLASSES } from '@/src/utils/constants';

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
        <div className={`max-w-fit ml-auto mt-1 mr-1 border ${LINE_CLASSES} p-1`}>
          <LocaleSwitcher locale={locale} />
        </div>

        <main className="min-h-screen mx-auto md:w-3/4 xl:w-1/2 p-24 space-y-8">{children}</main>
      </body>
    </html>
  );
}
