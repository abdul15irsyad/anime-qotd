import { IconShare3 } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';

import { useCapture } from '../(hooks)/use-capture';
import { Button } from './button';

export const ShareButton = ({
  refElement,
}: {
  refElement: React.RefObject<HTMLDivElement | null>;
}) => {
  const { captureElement, canShare } = useCapture();
  const handleClick = useCallback(async () => {
    if (!canShare || !refElement?.current) return;

    const { file } = await captureElement({
      element: refElement.current,
      filename: `anime-qotd-${dayjs().valueOf()}.png`,
    });

    const shareData: ShareData = {
      title: 'Share Quote',
      files: [file],
    };

    await navigator?.share?.(shareData).catch((error) => {
      if (!['AbortError'].includes(error.name)) throw error;
    });
  }, [canShare, captureElement, refElement]);

  return (
    canShare && (
      <Button
        startIcon={<IconShare3 size='1.25em' />}
        onClick={handleClick}
        text='Share'
      />
    )
  );
};
