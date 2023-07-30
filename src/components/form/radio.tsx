import { isString } from "@/src/utils/shared";
import { ChangeEventHandler } from "react"
import Spacer from "./spacer";

type Option = { id: string, value: string, text: string }

export function Radio({ label, options, currentValue, name, onChange }: { label?: string, options: Array<Option>, currentValue?: string | undefined, name: string, onChange?: ChangeEventHandler<HTMLInputElement> }) {  
  return (
    <div>
      {isString(label) ? label : null}
      {options.map(({ id, value, text }) => (
        <label className="block flex" key={id} htmlFor={id}>
          {text} <Spacer />
          <input
            type="radio"
            id={id}
            name={name}
            value={value}
            {...typeof onChange === 'function' ? {
              checked: currentValue === value,
              onChange,
            } : {}}
            required
          />
        </label>
      ))}
    </div>
  );
}