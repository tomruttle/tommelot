import { useTranslations } from "next-intl";
import TH3 from "./atoms/th3";

export default function Playlist() {
  const t = useTranslations();

  return (
    <>
      <TH3 id="playlist">{t('playlist')}</TH3>

      <div className="my-4">
        <iframe style={{ borderRadius: "12px" }} src="https://open.spotify.com/embed/playlist/71Rgmfn3NAUvgFkKB3h5xv?utm_source=generator&theme=0" width="100%" height="2020" allowFullScreen={false} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
    </>
  )
}