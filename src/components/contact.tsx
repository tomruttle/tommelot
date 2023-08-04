import { useTranslations } from "next-intl";
import TA from "./atoms/ta";
import TH3 from "./atoms/th3";

export default function Contact() {
  const t = useTranslations();

  return (
    <>
      <TH3>{t('contact.heading')}</TH3>
      {t.rich('contact.text', {
        mcEmail: (chunks) => <TA href="mailto:mc@tommelot.com">{chunks}</TA>,
        infoEmail: (chunks) => <TA href="mailto:info@tommelot.com">{chunks}</TA>,
      })}
    </>
  )
}