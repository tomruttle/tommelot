'use client';

import { FormEventHandler, useRef, useState } from "react";
import { isString } from "@/src/utils/shared";
import Form from "./form";
import TP from "../atoms/tp";
import TH3 from "../atoms/th3";
import { useTranslations } from "next-intl";
import TA from "../atoms/ta";

export default function RsvpForm() {
  const t = useTranslations('rsvp');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAttending, setIsAttending] = useState<string | undefined>();
  const [submissionError, setSubmissionEror] = useState('');
  const rsvpRef = useRef<HTMLHeadingElement | null>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);
      const res = await fetch('/api/rsvp', { method: 'POST', body: formData })

      if (res.status !== 200) {
        throw new Error(`Error submitting form. Server responded with status ${res.status}`);
      }

      setIsAttending(formData.get('attendance')?.toString());
    } catch (err) {
      if (err instanceof Error) {
        setSubmissionEror(t('error'))
      }
    }

    setIsSubmitting(false);

    await new Promise((resolve) => setTimeout(resolve, 0))

    rsvpRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  return (
    <>
      <TH3 id="rsvp" refProps={rsvpRef}>{t('heading')}</TH3>

      {isString(isAttending) ? <TP>{isAttending === 'yes' ? t('is-attending') : t('not-attending')}</TP> : (
        <>
          {t.rich('intro', {
            TP: (chunks) => <TP>{chunks}</TP>,
            hahaLink: (chunks) => <TA href="https://www.hallescheshaus.com">{chunks}</TA>
          })}
          {isString(submissionError) ? <pre>{submissionError}</pre> : null}
          <Form onSubmit={onSubmit} disableSubmit={isSubmitting} />
        </>
      )}
    </>
  )
}