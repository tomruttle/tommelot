'use client';

import { FormEventHandler, useState } from "react";
import Input from "../../../components/form/input";
import Spacer from "../../../components/form/spacer";
import Button from "../../../components/form/button";
import { useTranslations } from "next-intl";
import { Radio } from "@/src/components/form/radio";
import { isString } from "@/src/utils/shared";

function PersonForm({ nameName, emailName, phoneName }: { nameName: string, emailName: string, phoneName: string }) {
  return (
    <>
      <Input id="name" name={nameName} label="Full Name" />
      <Input id="email" name={emailName} label="Email Address" type="email" />
      <Input id="phone" name={phoneName} label="Phone Number" type="tel" />
    </>
  )
}

export default function RsvpForm() {
  const t = useTranslations();

  const [attendance, setAttendance] = useState<string | undefined>();
  const [hasPlusOne, setHasPlusOne] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submissionError, setSubmissionEror] = useState('');

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) {
      return;
    }
     
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/rsvp', { method: 'POST', body: new FormData(e.target) })

      if (res.status !== 200) {
        throw new Error(`Error submitting form. Server responded with status ${res.status}`);
      }

      setHasSubmitted(true);
    } catch (err) {
      if (err instanceof Error) {
        setSubmissionEror(err.toString())
      }
    }

    setIsSubmitting(false);
  };

  if (hasSubmitted) {
    return (
      <div>THAAAAAAANKS {attendance === 'yes' ? 'we look forward to seeing you' : 'sorry you cannot join us!'}</div>
    )
  }

  return (
    <form className="w-full max-w-sm" onSubmit={onSubmit}>
      {isString(submissionError) ? <pre>{submissionError}</pre> : null}

      <PersonForm nameName="name" emailName="email" phoneName="phone" />

      <Radio
        name="attendance"
        currentValue={attendance}
        options={[
          { id: 'attend', value: 'yes', text: 'Will Attend' },
          { id: 'not-attend', value: 'no', text: 'Will Not Attend' },
        ]}
        onChange={(e) => {
          setAttendance(e.target.value)
          setHasPlusOne(undefined)
        }}
      />

      <Spacer />

      {attendance === 'yes' ? (
        <>
          <Spacer />

          <Radio
            label="Will you be bringing a +1?"
            name="plus-one"
            options={[
              { id: 'has-plus-one', value: 'yes', text: 'Yes' },
              { id: 'no-plus-one', value: 'no', text: 'No' },
            ]}
            currentValue={hasPlusOne}
            onChange={(e) => { setHasPlusOne(e.target.value) }}
          />

          <Spacer />

          {hasPlusOne === 'yes' ? (
            <>
              +1 details:
              <div className="ml-12">
                <PersonForm nameName="plus-one-name" phoneName="plus-one-phone" emailName="plus-one-email" />
              </div>
            </>
          ) : null}

          <Radio
            label="If enough people are interested in exploring the city on Saturday morning, we would like to create an opportunity for our guests to get familiar with the city of Berlin. Would you want to join a guided walking tour departing around 10:30?"
            name="tour"
            options={[
              { id: 'yes-tour', value: 'yes', text: 'Yes' },
              { id: 'maybe-tour', value: 'maybe', text: 'Maybe' },
              { id: 'no-tour', value: 'no', text: 'No' },
            ]}
          />

          <Spacer />

          <Radio
            label="We are considering organizing a brunch on the day after the wedding. Would you be interested in joining a Sunday morning brunch around noon?"
            name="brunch"
            options={[
              { id: 'yes-brunch', value: 'yes', text: 'Yes' },
              { id: 'maybe-brunch', value: 'maybe', text: 'Maybe' },
              { id: 'no-brunch', value: 'no', text: 'No' },
            ]}
          />

          <Spacer />

          <Radio
            label="What type of eater are you?"
            name="eater"
            options={[
              { id: 'vegetarian', value: 'vegetarian', text: 'Vegetarian' },
              { id: 'vegan', value: 'vegan', text: 'Vegan' },
              { id: 'onmivore', value: 'omnivore', text: 'Omnivore' },
            ]}
          />

          <Spacer />

          <div className="mb-4">
            <label htmlFor="diet">Do you have any other dietary requirements (e.g. allergies) we should take into account?</label>
            <Spacer />
            <textarea className="form-input bg-black border-gray-200 focus:ring-0 focus:border-gray-300" id="diet" name="diet" />
          </div>

          <Spacer />

          <Input label="Do you vow to dress as extravagantly as you can bear? (Enter initials)" id="extravagance" name="extravagance" />

          <Spacer />
        </>
      ) : null}

      <Button text={t('enter')} isDisabled={isSubmitting} />
    </form>
  )
}