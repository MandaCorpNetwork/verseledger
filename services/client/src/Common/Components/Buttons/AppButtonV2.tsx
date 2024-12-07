import '@Assets/Css/AppDockV3.css';

import { useSoundEffect } from '@Audio/AudioManager';
import { POPUP_APP_LIST } from '@Common/AppDockV3/Tools/AllAppsModal';
import type { SvgIconComponent } from '@mui/icons-material';
import { Button, SvgIcon, Typography, TypographyProps } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectAnimations, selectQuality } from '@Redux/Slices/Auth/auth.selectors';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import { selectIsPopupOpen } from '@Redux/Slices/Popups/popups.selectors';
import { useNav } from '@Utils/Hooks/useNav';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

type AppButtonProps = {
  label: string;
  icon: SvgIconComponent;
  path: string;
  disabled?: boolean;
  ['data-testid']?: string;
};

export const AppButtonV2: React.FC<AppButtonProps> = ({
  icon: Icon,
  label,
  path,
  disabled,
  'data-testid': testid = 'App',
}) => {
  const [rotateY, setRotateY] = React.useState<number>(0);

  const animationFrameId = React.useRef<number | null>(null);
  const targetRotateY = React.useRef<number>(rotateY);

  const { t } = useTranslation();
  const location = useLocation();
  const nav = useNav();
  const sound = useSoundEffect();
  const { selectedOrgId } = useParams();
  const dispatch = useAppDispatch();

  const animationSetting = useAppSelector(selectAnimations);
  const qualitySetting = useAppSelector(selectQuality);
  const isListOpen = useAppSelector((state) => selectIsPopupOpen(state, POPUP_APP_LIST));

  const orgButton = path.startsWith('/orgs');

  const checkIsActive = React.useCallback(() => {
    const isOn =
      label === 'Home'
        ? location.pathname === path || location.pathname === '/apps'
        : location.pathname.startsWith(path);
    return isOn;
  }, [label, location, path]);

  const isOn = checkIsActive();

  const activeClass = isOn ? 'on' : 'off';

  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (isOn) return sound.playSound('denied');
      if (orgButton && path !== '/orgs/finder') {
        const url = selectedOrgId ? `${path}/${selectedOrgId}` : path;
        nav(url, 'internal', true).onClick(e);
      } else {
        nav(path, 'internal', true).onClick(e);
      }
      if (isListOpen) dispatch(closePopup(POPUP_APP_LIST));
    },
    [isOn, nav, orgButton, path, selectedOrgId, sound, isListOpen, dispatch],
  );

  const handleAuxClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (orgButton && path !== '/orgs/finder') {
        const url = selectedOrgId ? `${path}/${selectedOrgId}` : path;
        nav(url, 'internal', true).onAuxClick(e);
      } else {
        nav(path, 'internal', true).onAuxClick(e);
      }
      if (isListOpen) dispatch(closePopup(POPUP_APP_LIST));
    },
    [nav, orgButton, path, selectedOrgId, isListOpen, dispatch],
  );

  const appButtonStyles = React.useMemo(() => {
    const classNames: string[] = [];
    switch (qualitySetting) {
      case 'low':
        classNames.push('AppButton', activeClass);
        break;
      case 'potato':
        classNames.push('PotatoAppButton', activeClass);
        break;
      case 'medium':
      case 'high':
      default:
        classNames.push('AdvAppButton', activeClass);
        break;
    }
    //TODO: Simplify CSS to only use the High, Med, & Low Animation ClassNames
    if (
      animationSetting !== 'none' &&
      (qualitySetting === 'high' || qualitySetting === 'medium')
    ) {
      classNames.push('AdvAppButtonAnimations');
    }
    switch (animationSetting) {
      case 'high':
        classNames.push('HighAnimations');
        break;
      case 'low':
        classNames.push('LowAnimations');
        break;
      case 'none':
        break;
      case 'medium':
      default:
        classNames.push('MedAnimations');
        break;
    }

    return classNames.join(' ');
  }, [activeClass, animationSetting, qualitySetting]);

  const appIconStyles = React.useMemo(() => {
    const classNames: string[] = [];
    switch (qualitySetting) {
      case 'low':
        classNames.push('AppIcon', activeClass);
        break;
      case 'high':
      case 'medium':
      default:
        classNames.push('AdvAppIcon', activeClass);
        break;
    }

    switch (animationSetting) {
      case 'high':
        if (qualitySetting === 'high' || qualitySetting === 'medium')
          classNames.push('AdvAppIconHighAnimation');
        else classNames.push('HighAnimation');
        break;
      case 'low':
        classNames.push('LowAnimations');
        break;
      case 'none':
        break;
      case 'medium':
      default:
        if (qualitySetting === 'high' || qualitySetting === 'medium')
          classNames.push('AdvAppIconMedAnimation');
        else classNames.push('MedAnimations');
        break;
    }

    return classNames.join(' ');
  }, [activeClass, animationSetting, qualitySetting]);

  const iconSize = React.useMemo(() => {
    switch (qualitySetting) {
      case 'low':
      case 'potato':
        return 'medium';
      case 'high':
      case 'medium':
      default:
        return 'large';
    }
  }, [qualitySetting]);

  const appIcon = (
    <SvgIcon
      data-testid={`${testid}-AppButton-${label}__Icon`}
      id={`${testid}-AppButton-${label}__Icon`}
      component={Icon}
      className={appIconStyles}
      fontSize={iconSize}
      sx={[animationSetting === 'high' && { '--rotate-y': `${rotateY}deg` }]}
    />
  );

  const appIconReflection = (
    <SvgIcon
      data-testid={`${testid}-AppButton-${label}__ReflectionIcon`}
      id={`${testid}-AppButton-${label}__ReflectionIcon`}
      component={Icon}
      className={`AppReflection ${activeClass}`}
      fontSize="large"
    />
  );

  const orgTextClass = React.useMemo(() => {
    switch (qualitySetting) {
      case 'low':
        return 'NormalOrgLabel';
      case 'potato':
        return 'PotatoOrgLabel';
      case 'high':
      case 'med':
      default:
        return 'AdvOrgLabel';
    }
  }, [qualitySetting]);

  const orgTextVariant = React.useMemo<TypographyProps['variant']>(() => {
    switch (qualitySetting) {
      case 'low':
        return 'caption';
      case 'potato':
        return 'caption';
      case 'high':
      case 'med':
      default:
        return 'h6';
    }
  }, [qualitySetting]);

  const orgText = (
    <Typography
      data-testid={`${testid}-AppButton-${label}__Org_Text`}
      id={`${testid}-AppButton-${label}__Org_Text`}
      variant={orgTextVariant}
      className={orgTextClass}
      sx={[
        (qualitySetting === 'high' || qualitySetting === 'medium') && {
          position: 'absolute',
          top: '50%',
          left: 2,
          transform: 'translateY(-60%)',
          writingMode: 'vertical-lr',
          textOrientation: 'upright',
          letterSpacing: '0.1px',
          fontWeight: 'bold',
          fontSize: '1.2em',
        },
        qualitySetting === 'low' && {
          position: 'absolute',
          top: 0,
          left: 10,
          letterSpacing: '1px',
        },
      ]}
    >
      {t('@APP.ORGS.LABEL')}
    </Typography>
  );

  const appLabelStyles = React.useMemo(() => {
    const classNames: string[] = [];
    switch (qualitySetting) {
      case 'low':
        classNames.push('AppLabelLow', activeClass);
        break;
      case 'potato':
        classNames.push('AppLabelPotato', activeClass);
        break;
      case 'high':
      case 'medium':
      default:
        classNames.push('AppLabelHighFidelity', activeClass);
    }
    return classNames.join(' ');
  }, [activeClass, qualitySetting]);

  const appLabel = (
    <Typography
      data-testid={`${testid}-AppButton-${label}__Label_Text`}
      id={`${testid}-AppButton-${label}__Label_Text`}
      color="textPrimary"
      className={appLabelStyles}
      variant="body2"
      sx={[
        { fontWeight: 'bold' },
        (qualitySetting === 'high' || qualitySetting === 'medium') && { mb: '5px' },
      ]}
    >
      {t(label) ?? label}
    </Typography>
  );

  const smoothRotate = React.useCallback(() => {
    setRotateY((prevRotateY) => {
      const delta = targetRotateY.current - prevRotateY;
      const step = delta * 0.1;

      if (Math.abs(delta) < 0.1) {
        cancelAnimationFrame(animationFrameId.current!);
        animationFrameId.current = null;
        return targetRotateY.current;
      }
      return prevRotateY + step;
    });
    animationFrameId.current = requestAnimationFrame(smoothRotate);
  }, [targetRotateY]);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const { clientX, target } = e;
      const element = target as HTMLElement;
      const { left, right } = element.getBoundingClientRect();

      const mouseX = clientX - left;
      const width = right - left;

      const percentageX = Math.min(Math.max((mouseX + 5) / width - 0.05, 0), 1);

      const boundedYRotation = -30 + percentageX * 70;

      targetRotateY.current = boundedYRotation;

      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(smoothRotate);
      }
    },
    [smoothRotate, targetRotateY],
  );

  const resetRotation = React.useCallback(() => {
    targetRotateY.current = 0;
    if (!animationFrameId.current) {
      animationFrameId.current = requestAnimationFrame(smoothRotate);
    }
  }, [smoothRotate, targetRotateY]);

  const advButtonAnimation = React.useMemo(() => {
    if (animationSetting === 'high') {
      return { handleMouseMove, resetRotation };
    }
  }, [animationSetting, handleMouseMove, resetRotation]);

  React.useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <Button
      data-testid={`${testid}__AppButton_${label}_Button`}
      id={`${testid}__AppButton_${label}_Button`}
      className={appButtonStyles}
      onMouseMove={advButtonAnimation?.handleMouseMove}
      onMouseLeave={advButtonAnimation?.resetRotation}
      onClick={handleClick}
      onAuxClick={handleAuxClick}
      disabled={disabled}
      sx={[
        {
          borderRadius: '15px',
          border: '2px outset',
          borderColor: disabled ? 'rgba(8,22,80,0.3)' : 'rgba(0,183,252,0.5)',
          minWidth: '120px',
          '&:hover': {
            borderColor: disabled ? 'rgba(8,22,80,0.5)' : 'rgba(0,183,252,0.8)',
          },
        },
        qualitySetting === 'low' && {
          border: '2px solid',
          borderColor: 'rgba(0,183,252,0.8)',
          minWidth: '100px',
          backgroundColor: 'action.disabledBackground',
          '&:hover': {
            borderColor: 'rgba(24,252,252)',
            backgroundColor: 'action.disabled',
          },
          '&:disabled': {
            borderColor: 'rgba(8,22,80,0.8)',
          },
        },
      ]}
      aria-label={`Navigate to ${orgButton && 'Org '}${t(label)} App`}
      aria-selected={isOn}
      aria-disabled={disabled}
      type="button"
    >
      <div className="AppIconContainer">
        {qualitySetting !== 'potato' && appIcon}
        {(qualitySetting === 'high' || qualitySetting === 'medium') && appIconReflection}
      </div>
      {orgButton && orgText}
      {appLabel}
    </Button>
  );
};

export default AppButtonV2;
