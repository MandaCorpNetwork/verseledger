import { Typography } from '@mui/material';
import React from 'react';
import { ContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';

import { DigiField } from './DigiField';

type PayLabelProps = {
  /** @prop {string} label - The label for the DigiField */
  label: string;
  /** @prop {number} pay - The pay displayed in the DigiField */
  pay: number;
  /** @prop {object} sx - The sx props for the DigiField @extends {@link DigiField} sx props */
  sx?: object;
  /** @prop {string} maxWidth - The max width of the DigiField */
  maxWidth?: string;
  /** @prop {string} width - The width of the DigiField */
  width?: string;
  /** @prop {string} testid - The test id for the DigiField @extends {@link DigiField} testid */
  testid?: string;
  /** @prop {object} slots - The slots for the DigiField @extends {@link DigiField} slots */
  slots?: object;
  /** @prop {ContractPayStructure} structure - The structure of the pay */
  structure?: ContractPayStructure;
  /** @prop {string} size - The size of the Text */
  size?: 'small' | 'medium';
};

/**
 * ### PayDisplay
 * @global
 * @description
 * A custom DigiField component that displays a label and a pay amount.
 * @version 0.1.2
 * @see {@link DigiField}
 * @param {PayLabelProps} props - The props for the component
 * @returns {React.FC}
 * @author ThreeCrown
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
   * @function payString - Returns the pay string based on the structure
   * @param {ContractPayStructure} structure - The structure of the pay
   * @returns {string} - The pay string
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
   * @function getPaySuffix - Returns the pay suffix based on the structure
   * @param {ContractPayStructure} structure - The structure of the pay
   * @returns {React.ReactNode} The pay suffix
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
