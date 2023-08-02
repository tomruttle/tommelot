'use client';

import { FormEventHandler, useState } from "react";
import { isString } from "@/src/utils/shared";
import PostSubmission from "./post-submission";
import Form from "./form";
import TP from "../atoms/tp";

export default function RsvpForm() {
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
      const res = await fetch('/api/rsvp', { method: 'POST', body: new FormData(e.target) })

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

  return isString(isAttending) ? (
    <PostSubmission attendance={isAttending === 'yes'} />
  ) : (
    <>
      <TP>Please join in celebrating Tom and Annelot’s commitment to loving each other as hard as they can. Your presence is requested at Hallesches Haus, Berlin, Germany, on Saturday, March 2, 2024.</TP>
      <TP>Please let us know if you will be attending at your earliest convenience, but no later than 22-10-2023.</TP>

      {isString(submissionError) ? <pre>{submissionError}</pre> : null}

      <Form onSubmit={onSubmit} disableSubmit={isSubmitting} />
    </>
  )
}