import { isString } from "@/src/utils/shared"
import Spacer from "./spacer"
import { colors } from "@/src/utils/constants"

export default function Input({
  id,
  name,
  type = 'text',
  label,
  borderColor = colors.INPUT_BORDER_COLOR,
  focusColor = colors.INPUT_FOCUS_BORDER_COLOR,
  children
}: { id: string, name: string, label?: string, type?: string, borderColor?: string, focusColor?: string, children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap mb-4 min-w-fit">
      {isString(label) ? <label className="min-w-fit" htmlFor={name}>{label}</label> : null}
      <Spacer />
      <input className={`form-input ${colors.BACKGROUND_COLOR} ${borderColor} focus:ring-0 ${focusColor}`} id={id} name={name} type={type} required />
      {children}
    </div>
  )
}