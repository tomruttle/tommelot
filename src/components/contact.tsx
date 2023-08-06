import { useTranslations } from "next-intl";
import TH3 from "./atoms/th3";

export default function Contact() {
  const t = useTranslations();

  return (
    <>
      <TH3 id="contact">{t('contact.heading')}</TH3>
      {t.rich('contact.text')}
    </>
  )
}