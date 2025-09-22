import { IconShare3 } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';

import { outfit } from '../(fonts)/outfit';
import { useCapture } from '../(hooks)/use-capture';
import style from './share-button.module.css';

export const ShareButton = ({
  ref,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  const { captureElement, canShare } = useCapture();
  const handleClick = useCallback(async () => {
    if (!canShare || !ref?.current) return;

    const { file } = await captureElement({
      element: ref.current,
      filename: `anime-qotd-${dayjs().valueOf()}.png`,
    });

    const shareData: ShareData = {
      title: 'Share Quote',
      files: [file],
    };

    await navigator?.share?.(shareData).catch((error) => {
      if (!['AbortError'].includes(error.name)) throw error;
    });
  }, [canShare, captureElement, ref]);

  return (
    canShare && (
      <button
        className={`${style['share-button']} ${outfit.className}`}
        onClick={handleClick}
      >
        <IconShare3 size='1.25em' />
        <span>Share</span>
      </button>
    )
  );
};
