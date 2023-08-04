import { useTranslations } from "next-intl";
import TP from "./atoms/tp";

export default function IntroText() {
  const t = useTranslations('intro');

  return (
    <div className="text-center">
      <TP>{t('date')}<br /><br />16:00–03:00<br /><br />{t('place')}</TP>

      <div className="my-4">
        <TP>TMP: Spotify thing!</TP>
      </div>
    </div>
  );
}