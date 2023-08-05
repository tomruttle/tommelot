import { LINE_CLASSES, colors } from "@/src/utils/constants";

export default function TH3({ id, children, refProps }: { refProps?: React.MutableRefObject<HTMLHeadingElement | null>, id: string, children: React.ReactNode }) {
  return <h3 id={id} ref={refProps} className={`w-3/4 mx-auto text-center font-medium border-b text-lg ${colors.HEADER_COLOR} ${LINE_CLASSES}`}>{children}</h3>
}