import { useTranslations } from "next-intl";
import Link from 'next-intl/link';

const menuItems = ['story', 'wedding', 'travel', 'rsvp', 'contact'];

export default function Nav() {
  const t = useTranslations();

  return (
    <nav className="text-xs w-fit mx-auto">
      {menuItems.reduce((acc, link, index) => (
        <>
          {index === 0 ? null : <>{acc} &#8226; </> }
          <Link className="text-slate-400 hover:underline" key={link} href={`#${link}`}>{t(`${link}.heading`)}</Link>
        </>
      ), <></>)}
    </nav>
  )
}
