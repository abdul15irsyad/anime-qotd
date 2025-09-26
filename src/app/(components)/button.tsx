import React, { ReactNode } from 'react';

import { outfit } from '../(fonts)/outfit';
import style from './button.module.css';

export const Button = ({
  text,
  startIcon,
  className,
  isLoading,
  onClick,
}: {
  text: string;
  startIcon: ReactNode;
  className?: string;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className={`${style.button} ${outfit.className}${className ? ` ${className}` : ''}`}
      onClick={isLoading ? undefined : onClick}
    >
      {startIcon}
      <span>{text}</span>
    </button>
  );
};
