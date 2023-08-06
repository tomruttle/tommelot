import { useTranslations } from "next-intl";
import Link from 'next-intl/link';
import { LINK_CLASSES } from "../utils/constants";

const menuItems = ['story', 'wedding', 'rsvp', 'travel', 'contact'];

export default function Nav() {
  const t = useTranslations();

  return (
    <nav className="text-xs w-fit mx-auto">
      {menuItems.reduce((acc, link, index) => (
        <>
          {index === 0 ? null : <>{acc} &#8226; </> }
          <Link className={LINK_CLASSES} key={link} href={`#${link}`}>{t(`${link}.heading`)}</Link>
        </>
      ), <></>)}
    </nav>
  )
}
