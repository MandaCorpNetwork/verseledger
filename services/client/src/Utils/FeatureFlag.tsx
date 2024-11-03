import { useAppSelector } from '@Redux/hooks';
import { selectHasFlag } from '@Redux/Slices/Flags/flags.selectors';
import React, { PropsWithChildren } from 'react';

export const useHasFeatureFlag = (flag: string): boolean => {
  return useAppSelector((state) => selectHasFlag(state, flag));
};

type FeatureFlagProps = { flag: string };

export const FeatureFlag: React.FC<PropsWithChildren<FeatureFlagProps>> = (props) => {
  const { flag, children } = props;
  const hasFeatureFlag = useHasFeatureFlag(flag);
  if (hasFeatureFlag) return <>{children}</>;
  return null;
};
