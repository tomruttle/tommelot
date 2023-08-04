import { isString } from "@/src/utils/shared"
import Spacer from "./spacer"

export default function Input({
  id,
  name,
  type = 'text',
  label,
  borderColor = 'border-gray-200',
  focusColor = 'border-gray-300',
  children
}: { id: string, name: string, label?: string, type?: string, borderColor?: string, focusColor?: string, children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap mb-4 min-w-fit">
      {isString(label) ? <label className="min-w-fit" htmlFor={name}>{label}</label> : null}
      <Spacer />
      <input className={`form-input bg-black ${borderColor} focus:ring-0 focus:${focusColor}`} id={id} name={name} type={type} required />
      {children}
    </div>
  )
}