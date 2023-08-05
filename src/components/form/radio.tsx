import { isString } from "@/src/utils/shared";
import { ChangeEventHandler } from "react"
import Spacer from "./spacer";
import { colors } from "@/src/utils/constants";

type Option = { id: string, value: string, text: string }

export function Radio({ label, options, currentValue, name, onChange }: { label?: string, options: Array<Option>, currentValue?: string | undefined, name: string, onChange?: ChangeEventHandler<HTMLInputElement> }) {  
  return (
    <div>
      {isString(label) ? label : null}

      <Spacer />

      {options.map(({ id, value, text }) => (
        <label className="block flex" key={id} htmlFor={id}>
          {text}

          <Spacer />

          <input
            type="radio"
            className={`form-radio focus:outline-none focus:ring-0 ${colors.RADIO_SELECT_COLOR} ${colors.BACKGROUND_COLOR} ${colors.INPUT_BORDER_COLOR} ${colors.INPUT_FOCUS_BORDER_COLOR}`}
            id={id}
            name={name}
            value={value}
            required
            {...typeof onChange === 'function' ? {
              checked: currentValue === value,
              onChange,
            } : {}}
          />
        </label>
      ))}
    </div>
  );
}