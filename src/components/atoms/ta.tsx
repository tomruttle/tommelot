import { LINK_CLASSES } from "@/src/utils/constants";
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

export default function TA(props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & { children: React.ReactNode }) {
  const { children, ...rest } = props;
  return <a className={LINK_CLASSES} {...rest}>{children}</a>
}