import { useTranslations } from "next-intl";
import TP from "./atoms/tp";
import DiscoBall from "./disco-ball";
import Spacer from "./form/spacer";
import { colors } from "../utils/constants";

export default function IntroText() {
  const t = useTranslations('intro');

  return (
    <div className={`text-center border ${colors.BORDER_COLOR} p-8 w-3/4 xs:w-1/2 min-w-fit mx-auto`}>
      <DiscoBall radius={70} tileSize={6} tileGap={2} />
      <Spacer />
      <Spacer />
      <TP>{t('date')}<br /><br />16:00–03:00<br /><br />Hallesches Haus, {t('place')}</TP>
    </div>
  );
}