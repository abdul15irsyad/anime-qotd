import { Property } from 'csstype';
import React from 'react';

import style from './loader.module.css';

export const Loader = ({
  size = 'md',
}: {
  size?: 'lg' | 'md' | 'sm' | Property.Width<string | number>;
}) => {
  return (
    <div
      className={style.loader}
      style={{
        ...(size === 'lg'
          ? { width: '60px', height: '60px' }
          : size === 'md'
            ? { width: '40px', height: '40px' }
            : size === 'sm'
              ? { width: '20px', height: '20px' }
              : { width: size, height: size }),
      }}
    ></div>
  );
};
