import { PayDisplayBox } from '@Common/Components/Core/Boxes/PayDisplayBox';
import { type SxProps, Tooltip, Typography, type TypographyProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import { useMemo } from 'react';
import { IContractPayStructure } from 'vl-shared/src/schemas/contracts/ContractPayStructureSchema';

type PayDisplayProps = {
  structure: IContractPayStructure;
  value: number;
  'data-testid'?: string;
  'aria-label'?: string;
  label?: string;
  sx?: SxProps<Theme>;
  slotProps?: {
    prefix?: TypographyProps;
    pay?: TypographyProps;
    suffix?: TypographyProps;
  };
};

export const PayDisplay: React.FC<PayDisplayProps> = (props) => {
  const {
    structure,
    value,
    'data-testid': testId = 'PayDisplay',
    'aria-label': ariaLabel = 'Display of Pay',
    sx,
    slotProps,
  } = props;
  const themeExtend = useDynamicTheme();

  const prefix = useMemo(() => {
    if (structure === 'FLATRATE' || structure === 'HOURLY') {
      return '¤';
    }
  }, [structure]);

  const pay = value.toLocaleString();

  const suffix = useMemo(() => {
    if (structure === 'HOURLY') {
      return '/HR';
    }
    if (structure === 'POOL') {
      return '%';
    }
  }, [structure]);

  const payLabel = `${prefix ? prefix + ' ' : ''}${pay} ${suffix ? ' ' + suffix : ''}`;

  const layout = useMemo(() => {
    const prefix = themeExtend.layout('Displays.PayDisplayPrefix');
    const pay = themeExtend.layout('Displays.PayDisplayValue');
    const suffix = themeExtend.layout('Displays.PayDisplaySuffix');

    const prefixOverwrite = {
      ...prefix,
      ...slotProps?.prefix?.sx,
    };
    const payOverwrite = {
      ...pay,
      ...slotProps?.pay?.sx,
    };
    const suffixOverwrite = {
      ...suffix,
      ...slotProps?.suffix?.sx,
    };

    return { prefixOverwrite, payOverwrite, suffixOverwrite };
  }, [slotProps?.pay?.sx, slotProps?.prefix?.sx, slotProps?.suffix?.sx, themeExtend]);

  return (
    <Tooltip data-testid={`${testId}__Tooltip`} title={payLabel}>
      <PayDisplayBox
        data-testid={testId}
        aria-label={ariaLabel}
        sx={{
          ...sx,
        }}
      >
        <Typography
          data-testid={`${testId}__Prefix`}
          sx={{
            ...layout.prefixOverwrite,
          }}
          {...slotProps?.prefix}
        >
          {prefix}
        </Typography>
        <Typography
          data-testid={`${testId}__Value`}
          sx={{
            flexShrink: 1,
            ...layout.payOverwrite,
          }}
          {...slotProps?.pay}
        >
          {pay}
        </Typography>
        <Typography
          data-testid={`${testId}__Suffix`}
          sx={{
            ...layout.suffixOverwrite,
          }}
          {...slotProps?.suffix}
        >
          {suffix}
        </Typography>
      </PayDisplayBox>
    </Tooltip>
  );
};
