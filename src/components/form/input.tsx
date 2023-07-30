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
  // bg-black appearance-none focus:outline-none border w-full py-2 px-4 leading-tight min-w-[10rem] focus:${focusColor} ${borderColor}

  return (
    <div className="flex flex-wrap mb-4">
      {isString(label) ? <label className="min-w-fit" htmlFor={name}>{label}</label> : null}
      <Spacer />
      <input className={`form-input bg-black ${borderColor} focus:ring-0 focus:${focusColor}`} id={id} name={name} type={type} required />
      {children}
    </div>
  )
}