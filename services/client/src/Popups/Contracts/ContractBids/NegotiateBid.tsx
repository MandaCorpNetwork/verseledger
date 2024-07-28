import DigiBox from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { PopupFormSelection } from '@Common/Components/Boxes/PopupFormSelection';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { PayStructure } from '@Common/Components/Custom/DigiField/PayStructure';
import { PayField } from '@Common/Components/TextFields/PayField';
import { Box, TextField, Tooltip, Typography } from '@mui/material';
import { useHorizontalAdvancedScroll } from '@Utils/horizontalScroll';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

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

  const handlePayChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const invalidCharacters = value.match(/[^\d.,]/g);
      if (invalidCharacters) {
        enqueueSnackbar('Please only use numbers', { variant: 'error' });
      }

      const inputValue = Number(value.replace(/[^0-9.]/g, ''));

      setFormData(inputValue);
      // setDisplayValue(inputValue.toLocaleString());
    },
    [formData],
  );

  const handlePayClear = () => {
    setFormData(contract.defaultPay);
  };

  return (
    <DigiBox
      data-testid="ContractBid__NonNegotiateBid_Wrapper"
      sx={{ p: '.5em', maxHeight: '65%', overflowY: 'auto' }}
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
            Negotiable
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
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            pb: '.5em',
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
              value={formData.toLocaleString()}
              onChange={handlePayChange}
              onClear={handlePayClear}
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
          sx={{ flexDirection: 'row', justifyContent: 'space-around', p: '.5em' }}
        >
          <TextField
            label="Start Date"
            value={startDate}
            sx={{ width: '160px' }}
            size="small"
            margin="dense"
            color="secondary"
          />
          <TextField
            label="End Date"
            value={endDate}
            sx={{ width: '160px' }}
            size="small"
            margin="dense"
            color="secondary"
          />
        </DigiDisplay>
        <DigiDisplay sx={{ my: '.5em' }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 'bold', color: 'text.secondary' }}
          >
            Locations
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', my: '.5em' }}>
            {startLocationId && (
              <TextField
                label="Start Location"
                size="small"
                color="secondary"
                inputProps={{
                  sx: {
                    cursor: 'default',
                  },
                }}
                InputProps={{
                  readOnly: true,
                  startAdornment: <LocationChip locationId={startLocationId} />,
                }}
                sx={{
                  display: 'flex',
                  width: '150px',
                  cursor: 'default',
                }}
              />
            )}
            {endLocationId && (
              <TextField
                label="End Location"
                size="small"
                inputProps={{
                  sx: {
                    cursor: 'default',
                  },
                }}
                InputProps={{
                  readOnly: true,
                  startAdornment: <LocationChip locationId={endLocationId} />,
                }}
                sx={{
                  display: 'flex',
                  width: '150px',
                  cursor: 'default',
                }}
              />
            )}
          </Box>
          {otherLocationIds && (
            <PopupFormSelection
              sx={{
                flexDirection: 'column',
                py: '.5em',
                px: '.5em',
                my: '.5em',
                overflow: 'hidden',
              }}
            >
              <Typography>Other Locations</Typography>
              <Box className="SelectScrollWrapper" ref={scrollRef}>
                {otherLocationIds.map((loc) => (
                  <LocationChip key={loc} locationId={loc} />
                ))}
              </Box>
            </PopupFormSelection>
          )}
        </DigiDisplay>
      </Box>
    </DigiBox>
  );
};
