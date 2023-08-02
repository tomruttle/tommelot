import { LINE_CLASSES } from "@/src/utils/constants";

export default function TH3({ children }: { children: React.ReactNode }) {
  return <h3 className={`w-3/4 mx-auto text-center font-medium border-b ${LINE_CLASSES}`}>{children}</h3>
}