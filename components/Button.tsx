import { ButtonType } from '@/lib/types';
import { ReactNode } from 'react';

type Props = {
  buttonType: ButtonType;
  onButtonClick: () => void;
  children: ReactNode;
};

export const Button = ({ buttonType, onButtonClick, children }: Props) => {
  return (
    <button
      aria-label="button"
      type="button"
      className={`md:w-auto md:inline-flex py-3 px-2 md:px-12 rounded-full w-full ${
        buttonType === ButtonType.PRIMARY
          ? 'bg-midnight text-white dark:bg-gray-200 dark:text-midnight'
          : buttonType === ButtonType.SECONDARY
          ? 'bg-gray-200 dark:bg-midnight text-midnight dark:text-white'
          : null
      } items-center justify-center general-ring-state font-medium`}
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
};
