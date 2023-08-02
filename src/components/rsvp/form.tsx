import { useTranslations } from "next-intl";
import { FormEventHandler, useState } from "react";
import PersonForm from "./person-form";
import { Radio } from "../form/radio";
import Spacer from "../form/spacer";
import Input from "../form/input";
import Button from "../form/button";
import { LINE_CLASSES } from "@/src/utils/constants";

export default function Form({ onSubmit, disableSubmit }: { onSubmit: FormEventHandler<HTMLFormElement>, disableSubmit: boolean }) {
  const t = useTranslations();
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

        <Button text={t('enter')} isDisabled={disableSubmit} />
      </form>
    )
  )
}