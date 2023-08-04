/* eslint-disable @typescript-eslint/no-explicit-any */

import { getRequestConfig } from 'next-intl/server';
import TP from './src/components/atoms/tp';
 
export async function loadMessages({ locale }: { locale: string }) {
  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    defaultTranslationValues: {
      TP: (chunks: any) => <TP>{chunks}</TP>,
      a: (chunks: any) => <a>{chunks}</a>,
      br: () => <br />,
    }
  }
}

export default getRequestConfig(loadMessages);
