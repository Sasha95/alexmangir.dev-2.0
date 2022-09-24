import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function Blockquote({ children }: Props) {
  return <blockquote className="p-3 rounded-r-lg">{children}</blockquote>;
}
