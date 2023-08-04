import { MouseEventHandler } from "react"

export default function Button({ text, isDisabled = false, onClick }: { text: string, isDisabled?: boolean, onClick?: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button
      className="hover:underline py-2 px-4 focus:outline-none border border-neutral-400 focus:border-white"
      type="submit"
      disabled={isDisabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}