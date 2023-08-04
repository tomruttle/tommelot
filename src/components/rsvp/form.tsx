import { useTranslations } from "next-intl";
import { FormEventHandler, useState } from "react";
import PersonForm from "./person-form";
import { Radio } from "../form/radio";
import Spacer from "../form/spacer";
import Button from "../form/button";
import { LINE_CLASSES } from "@/src/utils/constants";

export default function Form({ onSubmit, disableSubmit }: { onSubmit: FormEventHandler<HTMLFormElement>, disableSubmit: boolean }) {
  const t = useTranslations('rsvp');

  const [hasPlusOne, setHasPlusOne] = useState<string | undefined>();
  const [attendance, setAttendance] = useState<string | undefined>();

  return (
    (
      <form className={`p-8 border ${LINE_CLASSES}`} onSubmit={onSubmit}>
        <PersonForm nameName="name" emailName="email" phoneName="phone" />

        <Radio
          name="attendance"
          currentValue={attendance}
          options={[
            { id: 'attend', value: 'yes', text: t('attend') },
            { id: 'not-attend', value: 'no', text: t('not-attend') },
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
              label={t('plus-one')}
              name="plus-one"
              options={[
                { id: 'has-plus-one', value: 'yes', text: t('yes') },
                { id: 'no-plus-one', value: 'no', text: t('no') },
              ]}
              currentValue={hasPlusOne}
              onChange={(e) => { setHasPlusOne(e.target.value) }}
            />

            <Spacer />

            {hasPlusOne === 'yes' ? (
              <>
                {t('plus-one-details')}:
                <div className="ml-12">
                  <PersonForm nameName="plus-one-name" phoneName="plus-one-phone" emailName="plus-one-email" />
                </div>
              </>
            ) : (
              <>
                <input type="hidden" id="plus-one-name" name="plus-one-name" />
                <input type="hidden" id="plus-one-phone" name="plus-one-phone" />
                <input type="hidden" id="plus-one-email" name="plus-one-email" />
              </>
            )}

            <Radio
              label={t('tour')}
              name="tour"
              options={[
                { id: 'yes-tour', value: 'yes', text: t('yes') },
                { id: 'maybe-tour', value: 'maybe', text: t('maybe') },
                { id: 'no-tour', value: 'no', text: t('no') },
              ]}
            />

            <Spacer />

            <Radio
              label={t('brunch')}
              name="brunch"
              options={[
                { id: 'yes-brunch', value: 'yes', text: t('yes') },
                { id: 'maybe-brunch', value: 'maybe', text: t('maybe') },
                { id: 'no-brunch', value: 'no', text: t('no') },
              ]}
            />

            <Spacer />

            <Radio
              label={t('eater')}
              name="eater"
              options={[
                { id: 'vegetarian', value: 'vegetarian', text: t('vegetarian') },
                { id: 'vegan', value: 'vegan', text: t('vegan') },
                { id: 'onmivore', value: 'omnivore', text: t('omnivore') },
              ]}
            />

            <Spacer />

            <div className="mb-4">
              <label htmlFor="diet">{t('diet')}</label>
              <Spacer />
              <textarea className="form-input bg-black border-gray-200 focus:ring-0 focus:border-gray-300" id="diet" name="diet" />
            </div>

            <Spacer />
          </>
        ) : null}

        <div className="w-fit mx-auto">
          <Button text={t('enter')} isDisabled={disableSubmit} />
        </div>
      </form>
    )
  )
}