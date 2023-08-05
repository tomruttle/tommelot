import { colors } from "@/src/utils/constants"
import { MouseEventHandler } from "react"

export default function Button({ text, isDisabled = false, isLoading = false, onClick }: { text: string, isDisabled?: boolean, isLoading?: boolean, onClick?: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button
      className={`hover:underline py-2 px-4 focus:outline-none border ${colors.INPUT_BORDER_COLOR} ${colors.BUTTON_FOCUS}`}
      type="submit"
      disabled={isDisabled}
      onClick={onClick}
    >
      {isLoading ? <span className={`h-6 w-6 block rounded-full border-4 ${colors.BORDER_TOP_COLOR} animate-spin`}></span> : <>{text}</>}
    </button>
  )
}