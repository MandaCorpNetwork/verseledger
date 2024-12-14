import { Typography } from '@mui/material';
import React from 'react';
import type { ContractPayStructure } from 'vl-shared/src/schemas/contracts/ContractPayStructureSchema';

import { DigiField } from './DigiField';

type PayLabelProps = {
  /** The label for the DigiField */
  label: string;
  /** The pay displayed in the DigiField */
  pay: number;
  /** The sx props for the DigiField @extends {@link DigiField} sx props */
  sx?: object;
  /** The max width of the DigiField */
  maxWidth?: string;
  /** The width of the DigiField */
  width?: string;
  /** The test id for the DigiField @extends {@link DigiField} testid */
  testid?: string;
  /** The slots for the DigiField @extends {@link DigiField} slots */
  slots?: object;
  /** The structure of the pay */
  structure?: ContractPayStructure;
  /** The size of the Text */
  size?: 'small' | 'medium';
};

/**
 * ### PayDisplay
 * @description
 * A custom DigiField component that displays a label and a pay amount.
 * @see {@link DigiField}
 * @param props - The props for the component
 */
const PayDigiField: React.FC<PayLabelProps> = ({
  label,
  pay,
  maxWidth,
  width,
  testid,
  sx,
  slots,
  structure,
  size = 'medium',
}) => {
  // LOGIC
  /**
   * Returns the pay string based on the structure
   * @param structure - The structure of the pay

   */
  const payString = React.useCallback(() => {
    if (!structure) return 'Invalid Structure';
    const poolPay = structure === 'POOL' && pay > 100 ? 'Over Limit' : pay;
    switch (structure) {
      case 'FLATRATE':
      case 'HOURLY':
        return pay.toLocaleString();
      case 'POOL':
        return poolPay;
    }
  }, [structure, pay]);
  /** Calls {@link payString} and returns the result */
  const formattedPay = payString();

  /** @var {string} textSize - The Variant of the typography based on the size */
  const textSize = size === 'small' ? 'body2' : 'body1';

  /**
   * Returns the pay suffix based on the structure
   * @param structure - The structure of the pay

   * - `HOURLY` - `/HR`
   * - `POOL` - `%`
   */
  const getPaySuffix = React.useCallback(() => {
    if (structure === 'POOL') {
      return <Typography variant={textSize}>%</Typography>;
    }
    if (structure === 'HOURLY') {
      return <Typography variant={textSize}>/HR</Typography>;
    }
  }, [structure, textSize]);
  const paySuffix = getPaySuffix();

  return (
    <DigiField
      data-testid={testid}
      label={label}
      tooltip={formattedPay?.toString()}
      slots={{
        typography: {
          variant: textSize,
        },
        ...slots,
      }}
      startAdornment={
        structure !== 'POOL' && <Typography color="secondary">¤</Typography>
      }
      endAdornment={structure !== 'FLATRATE' && paySuffix}
      sx={{
        maxWidth: maxWidth,
        width: width,
        ...sx,
      }}
    >
      {formattedPay}
    </DigiField>
  );
};

export const PayDisplay = React.memo(PayDigiField);
