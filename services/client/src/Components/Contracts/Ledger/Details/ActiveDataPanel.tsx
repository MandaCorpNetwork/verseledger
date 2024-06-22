import { Avatar, Box, Chip, Typography } from '@mui/material';
import { POPUP_PLAYER_CARD } from '@Popups/PlayerCard/PlayerCard';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectActiveContractors } from '@Redux/Slices/Contracts/contractSelectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
type ContractorProps = {
  userName: string;
  profilePicture: string;
  userId: string;
};

const Contractor: React.FC<ContractorProps> = ({ userName, profilePicture, userId }) => {
  const dispatch = useAppDispatch();
  const handlePlayerCardOpen = () => {
    dispatch(openPopup(POPUP_PLAYER_CARD, { userId }));
  };
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
          backgroundColor: 'rgba(14,49,141,.25)',
          borderRadius: '10px',
          p: '.2em',
          width: '50%',
          justifyContent: 'space-around',
          alignContent: 'center',
        }}
      >
        <Chip
          data-testid="ActiveData-ContractorPanel-ContractorList-Contractor__UserChip"
          avatar={<Avatar src={profilePicture} />}
          label={userName}
          color="secondary"
          variant="outlined"
          onClick={handlePlayerCardOpen}
        />
        <Box
          sx={{
            my: 'auto',
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 'bold', color: 'text.secondary' }}
          >
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
  contractId: contract,
  contractorLimit,
}) => {
  const contractors = useAppSelector((state) => selectActiveContractors(state, contract));

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
            backgroundColor: 'rgba(14,49,141,.25)',
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
                color: 'text.secondary',
              }}
            >
              Active Contractors: {contractors.length}
            </Typography>
            <Typography
              data-testid="ContractBriefing-ActiveData-ContractorPanel-CountBar__ContractorLimitCount"
              variant="body2"
              sx={{
                fontWeight: 'bold',
                color: 'text.secondary',
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
            {contractors.map((contractor) => (
              <Contractor
                key={contractor.id}
                userName={contractor.displayName}
                profilePicture={contractor.pfp}
                userId={contractor.id}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
