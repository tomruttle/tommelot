'use client';

import { FormEventHandler, useState } from "react";
import { isString } from "@/src/utils/shared";
import Form from "./form";
import TP from "../atoms/tp";
import TH3 from "../atoms/th3";
import { useTranslations } from "next-intl";

export default function RsvpForm() {
  const t = useTranslations('rsvp');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAttending, setIsAttending] = useState<string | undefined>();
  const [submissionError, setSubmissionEror] = useState('');

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
        setSubmissionEror(err.toString())
      }
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <TH3>RSVP</TH3>

      {isString(isAttending) ? <TP>{isAttending === 'yes' ? t('is-attending') : t('not-attending')}</TP> : (
        <>
          {t.rich('intro', { TP: (chunks) => <TP>{chunks}</TP> })}
          {isString(submissionError) ? <pre>{submissionError}</pre> : null}
          <Form onSubmit={onSubmit} disableSubmit={isSubmitting} />
        </>
      )}
    </>
  )
}