import html2canvas from 'html2canvas';
import { useCallback, useMemo, useState } from 'react';

export const useCapture = () => {
  const canShare = useMemo(() => !!navigator?.canShare?.({ title: '' }), []);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const captureElement = useCallback(
    async <T extends HTMLElement>({
      element,
      filename,
    }: {
      element: T;
      filename: string;
    }) => {
      try {
        setIsLoading(true);

        const canvas = await html2canvas(element);
        const blob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((blob) => blob && resolve(blob), 'image/png'),
        );
        const imageUrl = canvas.toDataURL('image/png');
        const file = new File([blob], filename, { type: 'image/png' });

        return { file, imageUrl };
      } catch (err: any) {
        throw err?.message ?? 'something went wrong';
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return useMemo(
    () => ({
      captureElement,
      canShare,
      isLoading,
    }),
    [canShare, captureElement, isLoading],
  );
};
