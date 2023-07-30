import { MouseEventHandler } from "react"

export default function Button({ text, isDisabled = false, onClick }: { text: string, isDisabled?: boolean, onClick?: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <div className="sm:w-3/12">
      <button
        className="hover:underline py-2 px-4 focus:outline-none border border-black focus:border-white"
        type="submit"
        disabled={isDisabled}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  )
}