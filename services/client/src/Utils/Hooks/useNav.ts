import { useSoundEffect } from '@Audio/AudioManager';
import { URLUtil } from '@Utils/URLUtil';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
export const useNavAux = () => {};

export const useNav = () => {
  const navigate = useNavigate();
  const sound = useSoundEffect();

  const handleClick = useCallback(
    (
      e: React.MouseEvent,
      url: string,
      variant: 'external' | 'internal' = 'internal',
      pageChange = true,
    ) => {
      if (e.button === 1) e.preventDefault();
      if (variant === 'internal') {
        sound.playSound('navigate');
        if ((e.ctrlKey || e.metaKey || e.button === 1) && pageChange) {
          const prefix = URLUtil.frontendHost;
          window.open(`${prefix}${url}`, '_blank');
        } else {
          if (pageChange) {
            sound.playSound('navigate');
          } else {
            sound.playSound('close');
          }
          navigate(url);
        }
      } else {
        sound.playSound('navigate');
        window.open(url, '_blank');
      }
    },
    [sound, navigate],
  );

  const click = useCallback(
    (url: string, variant: 'external' | 'internal' = 'internal', pageChange = true) => {
      return {
        onClick: (e: React.MouseEvent) => {
          handleClick(e, url, variant, pageChange);
        },
        onAuxClick: (e: React.MouseEvent) => {
          handleClick(e, url, variant, pageChange);
        },
      };
    },
    [handleClick],
  );

  return useMemo(() => click, [click]);
};
