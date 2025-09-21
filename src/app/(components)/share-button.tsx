import { IconShare2 } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';

import { outfit } from '../(fonts)/outfit';
import { useCapture } from '../(hooks)/use-capture';
import style from './share-button.module.css';

export const ShareButton = ({
  ref,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  const canShare = useMemo(() => !!navigator?.canShare?.({ title: '' }), []);

  const { captureElement, isLoading } = useCapture();
  const handleClick = useCallback(async () => {
    if (!canShare || !ref?.current) return;

    const { file } = await captureElement({
      element: ref.current,
      filename: `quote of the day ${dayjs().format('YYYY-MM-DD')}.png`,
    });

    const shareData: ShareData = {
      title: 'Share Quote',
      files: [file],
    };

    await navigator?.share?.(shareData);
  }, [canShare, captureElement, ref]);

  return (
    canShare && (
      <button
        className={`${style['share-button']} ${outfit.className}`}
        onClick={handleClick}
      >
        <IconShare2 size='1.25em' />
        <span style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
          Share Quote
        </span>
      </button>
    )
  );
};
