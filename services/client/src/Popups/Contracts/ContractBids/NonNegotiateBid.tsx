import '@Assets/Css/contractDetails.css';

import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import { ComponentDisplay } from '@Common/Components/Core/Boxes/ComponentDisplay';
import { PopupFormSelection } from '@CommonLegacy/Components/Boxes/PopupFormSelection';
import { LocationChip } from '@CommonLegacy/Components/Chips/LocationChip';
import { DigiField } from '@CommonLegacy/Components/Custom/DigiField/DigiField';
import { PayDisplay } from '@CommonLegacy/Components/Custom/DigiField/PayDisplay';
import { PayStructure } from '@CommonLegacy/Components/Custom/DigiField/PayStructure';
import { Box, Tooltip, Typography } from '@mui/material';
import { useHorizontalAdvancedScroll } from '@Utils/horizontalScroll';
import dayjs from 'dayjs';
import type React from 'react';
import { useCallback } from 'react';
import type { ContractPayStructure } from 'vl-shared/src/schemas/contracts/ContractPayStructureSchema';
import type { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';

type NonNegotiateBidProps = {
  contract: IContract;
};

export const NonNegotiateBid: React.FC<NonNegotiateBidProps> = ({ contract }) => {
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

  return (
    <ComponentContainer
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
            Non-Negotiable
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
          data-testid="ContractBid-NonNegotiateBid__TopBox"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-around',
            pb: '.5em',
            width: '100%',
            gap: '1em',
          }}
        >
          <ComponentDisplay
            data-testid="ContractBid__NonNegotiateBid_ContractPayWrapper"
            sx={{
              px: '1em',
              pb: '.5em',
              color: 'text.secondary',
              transition: 'color 0.2s ease-in-out',
              gap: '.5em',
              '&:hover': {
                color: 'secondary.main',
              },
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
            <PayStructure
              testid="ContractBid-NonNegotiateBid__PayStructure"
              payStructure={contract.payStructure}
              maxWidth="100%"
            />
            <PayDisplay
              label="Default Pay"
              pay={contract.defaultPay}
              structure={(contract.payStructure as ContractPayStructure) ?? undefined}
              maxWidth="125px"
              width="100%"
            />
          </ComponentDisplay>
          <ComponentDisplay
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
          </ComponentDisplay>
        </Box>
        <ComponentDisplay
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-around',
            p: '.5em',
            width: '90%',
            gap: '.5em',
          }}
        >
          <DigiField label="Start Date">{startDate}</DigiField>
          <DigiField label="End Date">{endDate}</DigiField>
        </ComponentDisplay>
        <ComponentDisplay
          sx={{
            my: '.5em',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'inherit' }}>
            Locations
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              my: '.5em',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
              gap: '.5em',
            }}
          >
            <DigiField label="Start Location" sx={{ width: '120px' }}>
              {startLocationId ? (
                <LocationChip locationId={startLocationId} />
              ) : (
                'Redacted'
              )}
            </DigiField>
            <DigiField label="End Location" sx={{ width: '120px' }}>
              {endLocationId ? <LocationChip locationId={endLocationId} /> : 'Unknown'}
            </DigiField>
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
              <Typography variant="body2" sx={{ color: 'inherit', cursor: 'default' }}>
                Other Locations
              </Typography>
              <Box className="SelectScrollWrapper" ref={scrollRef}>
                {otherLocationIds.length === 0 ? (
                  <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                    No Other Locations
                  </Typography>
                ) : (
                  otherLocationIds.map((loc) => (
                    <LocationChip key={loc} locationId={loc} />
                  ))
                )}
              </Box>
            </PopupFormSelection>
          )}
        </ComponentDisplay>
      </Box>
    </ComponentContainer>
  );
};
