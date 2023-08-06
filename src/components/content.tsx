import { useTranslations } from "next-intl";
import TA from "./atoms/ta";
import TH3 from "./atoms/th3";

export default function Content() {
  const t = useTranslations();

  return (
    <>
      <TH3 id="story">{t('story.heading')}</TH3>

      {t.rich('story.text')}

      <TH3 id="wedding">{t('wedding.heading')}</TH3>

      <div className="mx-auto w-max">{t.rich('wedding.times')}</div>

      {t.rich('wedding.text', {
        hahaLink: (chunks) => <TA href="https://www.hallescheshaus.com">{chunks}</TA>
      })}
    </>
  );
}