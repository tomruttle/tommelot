import { MouseEventHandler } from "react"

export default function Button({ text, isDisabled = false, isLoading = false, onClick }: { text: string, isDisabled?: boolean, isLoading?: boolean, onClick?: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button
      className="hover:underline py-2 px-4 focus:outline-none border border-neutral-400 focus:border-white"
      type="submit"
      disabled={isDisabled}
      onClick={onClick}
    >
      {isLoading ? <span className="h-6 w-6 block rounded-full border-4 border-t-neutral-400 animate-spin"></span> : <>{text}</>}
    </button>
  )
}