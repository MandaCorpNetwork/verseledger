import { UserChip } from '@Common/Components/Users/UserChip';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectActiveContractors } from '@Redux/Slices/Contracts/contractSelectors';

type ContractorProps = {
  userId: string;
};

const Contractor: React.FC<ContractorProps> = ({ userId }) => {
  return (
    <Box
      data-testid="ActiveData-ContractorPanel-ContractorList__ContractorContainer"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        my: '.2em',
      }}
    >
      <Box
        data-testid="ActiveData-ContractorPanel-ContractorList__ContractorWrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          background: 'linear-gradient(135deg, rgba(8,22,141,0.8), rgba(0,30,100))',
          bgcolor: 'action.disabledBackground',
          borderRadius: '10px',
          p: '.2em',
          width: '50%',
          justifyContent: 'space-around',
          alignContent: 'center',
          border: '1px solid rgba(14,49,252,.4)',
          boxShadow: '0 0 5px 2px #0e318d',
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '5px 5px',
            opacity: 0.3,
          },
        }}
      >
        <UserChip userid={userId} size="medium" />
        <Box
          sx={{
            my: 'auto',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.disabled' }}>
            Ship: InDev
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

type ContractorPanelProps = {
  contractId: string;
  contractorLimit: number;
};

export const ContractorsPanel: React.FC<ContractorPanelProps> = ({
  contractId,
  contractorLimit,
}) => {
  const contractors = useAppSelector((state) =>
    selectActiveContractors(state, contractId),
  );
  return (
    <Box
      data-testid="ContractBriefing-ActiveData-ContractorPanel__Container"
      sx={{
        display: 'flex',
        flexDisplay: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        data-testid="ContractBriefing-ActiveData-ContractorPanel__Wrapper"
        sx={{
          width: '100%',
          height: '100%',
          p: '.5em',
        }}
      >
        <Box
          data-testid="ContractBriefing-ActiveData-ContractorPanel__CountBarContainer"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            backgroundColor: 'rgba(33,150,243,.2)',
            borderRadius: '10px',
          }}
        >
          <Box
            data-testid="ContractBriefing-ActiveData-ContractorPanel__CountBarWrapper"
            sx={{
              display: 'inherit',
              flexDirection: 'inherit',
              justifyContent: 'space-around',
              width: '100%',
              alignContent: 'center',
            }}
          >
            <Typography
              data-testid="ContractBriefing-ActiveData-ContractorPanel-CountBar__ActiveContractorsCount"
              variant="body2"
              sx={{
                fontWeight: 'bold',
                color:
                  contractorLimit === contractors.length ? 'info.main' : 'text.secondary',
              }}
            >
              Active Contractors: {contractors.length}
            </Typography>
            <Typography
              data-testid="ContractBriefing-ActiveData-ContractorPanel-CountBar__ContractorLimitCount"
              variant="body2"
              sx={{
                fontWeight: 'bold',
                color:
                  contractorLimit === contractors.length ? 'info.main' : 'text.secondary',
              }}
            >
              Contractor Limit: {contractorLimit || 'No Limit'}
            </Typography>
          </Box>
        </Box>
        <Box
          data-testid="ContractBriefing-ActiveData-ContratorPanel__ContractorListContainer"
          sx={{
            width: '100%',
            height: '85%',
            overflow: 'auto',
            mt: '.5em',
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgb(8, 29, 68)',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '20px',
              background: 'rgb(121, 192, 244, .5)',
            },
          }}
        >
          <Box
            data-testid="ContractBriefing-ActiveData-ContractorPanel-ContractorList__Wrapper"
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {contractors && contractors.length > 0 ? (
              contractors.map((contractor) => (
                <Contractor key={contractor.id} userId={contractor.id} />
              ))
            ) : (
              <Typography align="center" sx={{ alignItems: 'center' }}>
                No Active Contractors
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
