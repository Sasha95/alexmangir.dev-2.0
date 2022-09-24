import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function Callout({ children }: Props) {
  return (
    <div className="flex p-3 space-x-4 bg-gray-100 rounded-lg dark:bg-midnight">
      {children}
    </div>
  );
}
