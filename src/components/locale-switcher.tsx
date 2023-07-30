import Link from 'next-intl/link';
import { locales } from '../utils/constants';

function Item({ path, locale, text }: { path: string, locale: string, text: string }) {
  return (
    <span key={path}>
      {path === locale ? text : <Link href='/' locale={path}>{text}</Link>}
    </span>
  )
}

export default async function LocaleSwitcher({ locale }: { locale: string }) {
  const links = Object.entries(locales)
    .map(([path, text]) => <Item key={path} path={path} locale={locale} text={text} />)
    .reduce((acc, item) => <>{acc} / {item}</>);

  return (
    <div>
      {links}
    </div>
  );
}