import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { DigiDisplay } from '@Common/Components/Boxes/DigiDisplay';
import { PopupFormSelection } from '@Common/Components/Boxes/PopupFormSelection';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { PayStructure } from '@Common/Components/Custom/DigiField/PayStructure';
import { PayField } from '@Common/Components/TextFields/PayField';
import { Box, Tooltip, Typography } from '@mui/material';
import { useHorizontalAdvancedScroll } from '@Utils/horizontalScroll';
import { Logger } from '@Utils/Logger';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { ContractPayStructure } from 'vl-shared/src/schemas/ContractPayStructureSchema';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { useSoundEffect } from '@/AudioManager';

type NegotiateBidProps = {
  contract: IContract;
  formData: number;
  setFormData: React.Dispatch<React.SetStateAction<number>>;
};

export const NegotiateBid: React.FC<NegotiateBidProps> = ({
  contract,
  formData,
  setFormData,
}) => {
  const { playSound } = useSoundEffect();
  const acceptedContractorsCount =
    contract.Bids?.filter((bid) => bid.status === 'ACCEPTED').length ?? 0;

  const startLocationId = contract.Locations?.find(
    (loc) => loc.ContractLocation?.tag === 'start',
  )?.id;

  const endLocationId = contract.Locations?.find(
    (loc) => loc.ContractLocation?.tag === 'end',
  )?.id;

  const otherLocationIds = contract.Locations?.filter(
    (loc) => loc.ContractLocation?.tag === 'other',
  )?.map((loc) => loc.id);

  const formattedStartDate = useCallback(() => {
    if (contract.startDate === undefined) {
      return 'Manual Control';
    }
    return dayjs(contract.startDate).format('DD/MM/YY @ HH:mm');
  }, [contract.startDate]);

  const startDate = formattedStartDate();

  const formattedEndDate = useCallback(() => {
    if (contract.endDate === undefined) {
      return 'Manual Control';
    }
    return dayjs(contract.endDate).format('DD/MM/YY @ HH:mm');
  }, [contract.endDate]);

  const endDate = formattedEndDate();

  const scrollRef = useHorizontalAdvancedScroll();

  const pool = contract.payStructure === 'POOL';
  const maxLimit = 100 - acceptedContractorsCount;

  const handlePayChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const invalidCharacters = value.match(/[^\d.,]/g);
      if (invalidCharacters) {
        enqueueSnackbar('Please only use numbers', { variant: 'error' });
        playSound('warning');
      }

      const inputValue = Number(value.replace(/[^0-9.]/g, ''));

      if (pool) {
        if (inputValue >= maxLimit) {
          enqueueSnackbar('Percentage to high, others need pay too...', {
            variant: 'error',
          });
          playSound('warning');
        }
      }

      setFormData(inputValue);
      Logger.info(`Pay Value Changed To: ${inputValue}`);
      Logger.info(`Form Data: ${formData}`);
      // setDisplayValue(inputValue.toLocaleString());
    },
    [formData, maxLimit, playSound, pool, setFormData],
  );

  const handlePayClear = () => {
    playSound('toggleOff');
    setFormData(contract.defaultPay);
  };

  return (
    <DigiBox
      data-testid="ContractBid__NonNegotiateBid_Wrapper"
      sx={{ p: '.5em', maxHeight: { xs: '100%', md: '65%' } }}
    >
      <Typography
        data-testid="ContractBid__NonNegotiateBid_Title"
        sx={{
          display: 'inline-flex',
          fontSize: '1.2em',
          fontWeight: 'bold',
          color: 'secondary.main',
          alignItems: 'center',
          cursor: 'default',
        }}
      >
        Contractor Info&nbsp;
        <Tooltip title="This contract must be accepted by the terms displayed.">
          <Typography
            data-testid="ContractBid__NonNegotiateBid_NegotiateStatus"
            variant="body2"
            sx={{
              fontWeight: 'bold',
              color: 'info.main',
              ml: '.5em',
              cursor: 'default',
            }}
          >
            Negotiable Pay
          </Typography>
        </Tooltip>
      </Typography>
      <Box
        data-testid="ContractBid__NonNegotiateBid_Container"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          my: '.5em',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-around',
            pb: '.5em',
            width: '100%',
            gap: '1em',
          }}
        >
          <DigiDisplay
            data-testid="ContractBid__NonNegotiateBid_ContractPayWrapper"
            sx={{
              px: '1em',
              pb: '.5em',
              gap: '.5em',
            }}
          >
            <Typography
              data-testid="ContractBid-ContractorInfo-Static__PayTitle"
              variant="body2"
              align="center"
              sx={{ fontWeight: 'bold', color: 'inherit' }}
            >
              Contractor Pay
            </Typography>
            <PayStructure width="100%" payStructure={contract.payStructure} />
            <PayField
              label="Contract Pay"
              value={formData.toLocaleString()}
              onChange={handlePayChange}
              onClear={handlePayClear}
              structure={contract.payStructure as ContractPayStructure}
              activeCount={acceptedContractorsCount}
              sx={{
                width: '130px',
              }}
            />
          </DigiDisplay>
          <DigiDisplay
            data-testid="ContractBid__NonNegotiateBid_ContractorsDetailsWrapper"
            sx={{
              px: '1em',
              color: 'text.secondary',
              justifyContent: 'center',
              transition: 'color 0.2s ease-in-out',
              '&:hover': {
                color: 'secondary.main',
              },
            }}
          >
            <Typography
              data-testid="ContractBid-NonNegotiateBid-ContractorDetails__Title"
              variant="body2"
              align="center"
              sx={{
                fontWeight: 'bold',
                color: 'inherit',
                cursor: 'default',
              }}
            >
              Contractors
            </Typography>
            <Typography
              data-testid="ContractBid-NonNegotiateBid-ContractorDetails__MaxContractor_Title"
              variant="body2"
              sx={{
                display: 'inline-flex',
                fontWeight: 'bold',
                color: 'text.secondary',
                cursor: 'default',
                alignItems: 'center',
                fontSize: '.8em',
                mt: '.5em',
                justifyContent: 'center',
              }}
            >
              Max Contractors:&nbsp;
              <Typography
                data-testid="ContractBid-NonNegotiateBid-ContractorDetails__MaxContractor_Count"
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                  color: 'secondary.main',
                  cursor: 'default',
                }}
              >
                {contract.contractorLimit}
              </Typography>
            </Typography>
            <Typography
              data-testid="ContractBid-NonNegotiateBid-ContractorDetails__ActiveContractors_Title"
              variant="body2"
              sx={{
                display: 'inline-flex',
                fontWeight: 'bold',
                color: 'text.secondary',
                cursor: 'default',
                alignItems: 'center',
                fontSize: '.8em',
                mt: '.5em',
              }}
            >
              Active Contractors:&nbsp;
              <Typography
                data-testid="ContractBid-NonNegotiateBid-ContractorDetails__ActiveContractors_Count"
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                  color: 'secondary.main',
                  cursor: 'default',
                }}
              >
                {acceptedContractorsCount}
              </Typography>
            </Typography>
          </DigiDisplay>
        </Box>
        <DigiDisplay
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-around',
            p: '.5em',
            width: '90%',
            gap: '.5em',
          }}
        >
          <DigiField label="Start Date" sx={{ minWidth: '150px' }}>
            {startDate}
          </DigiField>
          <DigiField label="End Date" sx={{ minWidth: '150px' }}>
            {endDate}
          </DigiField>
        </DigiDisplay>
        <DigiDisplay sx={{ my: '.5em', width: '90%' }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'inherit' }}>
            Locations
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              my: '.5em',
              width: '100%',
              justifyContent: 'space-around',
              gap: '.5em',
              alignItems: 'center',
            }}
          >
            <DigiField label="Start Location" sx={{ width: '120px' }}>
              {startLocationId ? (
                <LocationChip locationId={startLocationId} />
              ) : (
                'Unknown Location'
              )}
            </DigiField>
            <DigiField label="End Location" sx={{ width: '120px' }}>
              {endLocationId ? <LocationChip locationId={endLocationId} /> : 'Redacted'}
            </DigiField>
          </Box>
          <PopupFormSelection
            sx={{
              flexDirection: 'column',
              py: '.5em',
              px: '.5em',
              my: '.5em',
              overflow: 'hidden',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Other Locations
            </Typography>
            <Box className="SelectScrollWrapper" ref={scrollRef}>
              {otherLocationIds?.length === 0 ? (
                <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                  No Other Locations
                </Typography>
              ) : (
                otherLocationIds?.map((loc) => (
                  <LocationChip key={loc} locationId={loc} />
                ))
              )}
            </Box>
          </PopupFormSelection>
        </DigiDisplay>
      </Box>
    </DigiBox>
  );
};
