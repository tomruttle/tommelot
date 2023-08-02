import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

export default function TA(props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & { children: React.ReactNode }) {
  const { children, ...rest } = props;
  return <a className="text-slate-400 hover:underline" {...rest}>{children}</a>
}