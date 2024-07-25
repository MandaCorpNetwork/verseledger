import DigiBox from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { ContractDefaultPayLabel } from '@Common/Components/TextFields/ContractDefaultPay';
import { ContractPayStructureLabel } from '@Common/Components/TextFields/ContractPayStructure';
import { Box, TextField, Tooltip, Typography } from '@mui/material';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

type NonNegotiateBidProps = {
  contract: IContract;
};

export const NonNegotiateBid: React.FC<NonNegotiateBidProps> = ({ contract }) => {
  const acceptedContractorsCount =
    contract.Bids?.filter((bid) => bid.status === 'ACCEPTED').length ?? 0;

  return (
    <DigiBox data-testid="ContractBid__NonNegotiateBid_Wrapper" sx={{ p: '.5em' }}>
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
        data-testid="ContractBid__NonNegotiateBid_TopContainer"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          my: '.5em',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            mb: '.5em',
          }}
        >
          <DigiDisplay
            data-testid="ContractBid__NonNegotiateBid_ContractPayWrapper"
            sx={{
              px: '1em',
              pb: '.5em',
            }}
          >
            <Typography
              data-testid="ContractBid-ContractorInfo-Static__PayTitle"
              variant="body2"
              align="center"
              sx={{ fontWeight: 'bold', color: 'text.secondary' }}
            >
              Contractor Pay
            </Typography>
            <ContractPayStructureLabel
              maxWidth="130px"
              payStructure={contract.payStructure}
            />
            <ContractDefaultPayLabel maxWidth="130px" pay={contract.defaultPay} />
          </DigiDisplay>
          <DigiDisplay
            data-testid="ContractBid__NonNegotiateBid_ContractorsDetailsWrapper"
            sx={{
              px: '1em',
              pb: '.5em',
            }}
          >
            <Typography
              data-testid="ContractBid-NonNegotiateBid-ContractorDetails__Title"
              variant="body2"
              align="center"
              sx={{ fontWeight: 'bold', color: 'text.secondary', cursor: 'default' }}
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
              }}
            >
              Max Contractors&nbsp;
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
              Active Contractors&nbsp;
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
          <TextField label="Start Date" value="Null" sx={{ width: '40%' }} />
          <TextField label="End Date" value="Null" sx={{ width: '40%' }} />
        </DigiDisplay>
      </Box>
    </DigiBox>
  );
};
