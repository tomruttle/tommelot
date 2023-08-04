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

      {t.rich('wedding.text', { mcEmail: (chunks) => <TA href="mailto:mc@tommelot.com">{chunks}</TA> })}

      <TH3 id="travel">{t('travel.heading')}</TH3>

      {t.rich('travel.text', {
        mapsLink: (chunks) => <TA href="https://goo.gl/maps/r1S3p9dehQ65iXdTA">{chunks}</TA>,
        bvgLink: (chunks) => <TA href="https://www.bvg.de/en/tickets-tariffs/all-apps">{chunks}</TA>,
        bikeLink: (chunks) => <TA href="https://www.berlin.de/en/getting-around/bikesharing/">{chunks}</TA>,
      })}

      <ul className="list-disc list-inside">
        <li><TA href="https://hotel-theyard.berlin">Hotel The YARD</TA></li>
        <li><TA href="https://numastays.com/locations/germany/berlin/kreuzberg/arc">Numa stays</TA></li>
        <li><TA href="https://www.select-hotels.com/en/select-hotel-checkpoint-charlie">Select Hotel Berlin Checkpoint Charlie</TA></li>
        <li><TA href="https://www.hotel-johann.berlin/">Hotel Johann Berlin</TA></li>
        <li><TA href="https://ginn-hotels.com/yorck-berlin/">GINN City & Lounge Yorck Berlin</TA></li>
        <li><TA href="https://www.ihg.com/crowneplaza/hotels/gb/en/berlin/bercp/hoteldetail">Crowne Plaza Berlin - Potsdamer Platz</TA></li>
        <li><TA href="https://movenpick.accor.com/de/europe/germany/berlin/hotel-berlin.html">Movenpick Hotel Berlin am Potsdamer Platz</TA></li>
        <li><TA href="https://all.accor.com/hotel/3745/index.de.shtml">Novotal Suites Berlin City Potsdamer Platz</TA></li>
        <li><TA href="https://all.accor.com/hotel/3752/index.de.shtml">Ibis Berlin Potsdamer Platz</TA></li>
        <li><TA href="https://all.accor.com/hotel/5058/index.de.shtm">Ibis budget Berlin City Potsdamer Platz</TA></li>
        <li><TA href="https://onepagebooking.com/nena-apartments-bluecherstr">Nena apartments Kreuzberg61</TA></li>
        <li><TA href="https://www.nh-hotels.com/hotel/nh-berlin-potsdamer-platz">NH Berlin Potsdamer Platz</TA></li>
        <li><TA href="https://www.ihg.com/holidayinnexpress/hotels/us/en/berlin/berab/hoteldetail">Holiday Inn Express Berlin City Centre</TA></li>
        <li><TA href="https://www.wil7.de/">The Wil7</TA></li>
        <li><TA href="https://www.relexa-hotel-berlin.de/">Relexa Hotel Berlin</TA></li>
        <li><TA href="https://www.airbnb.nl/wishlists/v/1298327373?s=67&unique_share_id=f77d35c6-1f7e-4a62-b55d-63d84ef6e1f3" >Airbnb {t('suggestions')}</TA></li>
      </ul>
    </>
  );
}