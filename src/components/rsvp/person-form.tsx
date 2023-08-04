import { useTranslations } from "next-intl";
import Input from "../form/input";

export default function PersonForm({ nameName, emailName, phoneName }: { nameName: string, emailName: string, phoneName: string }) {
  const t = useTranslations('rsvp');

  return (
    <>
      <Input id="name" name={nameName} label={t('name')} />
      <Input id="email" name={emailName} label={t('email')} type="email" />
      <Input id="phone" name={phoneName} label={t('phone')} type="tel" />
    </>
  )
}