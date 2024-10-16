//ContractCard is the Contract Displayer Item that is mapped for the contracts pulled from the database. It is displayed in the ContractCardDisplay component.
//This is a low level amount of information for a contract
//This Contract passes it's ID to the ContractCardDisplay when clicked and sets itself to selected to display it's full information in the ContractBriefingViewer
import { MiniPlayerCard } from '@Common/Components/App/MiniPlayerCard';
import { PayDisplay } from '@Common/Components/App/PayDisplay';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { EmergencyShare, ErrorTwoTone } from '@mui/icons-material';
import { Avatar, Box, Card, CardActionArea, Tooltip, Typography } from '@mui/material';
import { POPUP_PLAYER_CARD } from '@Popups/PlayerCard/PlayerCard';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { selectUserById } from '@Redux/Slices/Users/users.selectors';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

type ContractCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contract: IContract;
  onClick?: () => void;
  isSelected: boolean;
};

export const ContractCard: React.FC<ContractCardProps> = ({
  contract,
  onClick,
  isSelected,
}) => {
  const [archetype, setArchetype] = React.useState<string | null>(null);

  React.useEffect(() => {
    const selectedArchetype = contractArchetypes.find((option) =>
      option.subTypes.some((subType) => subType.value === contract.subtype),
    );
    if (selectedArchetype) {
      setArchetype(selectedArchetype.archetype);
    } else {
      setArchetype(null);
    }
  }, [contract.subtype]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => selectUserById(state, contract.owner_id));

  const handleAvatarClick = React.useCallback(() => {
    const userid = user?.id;
    dispatch(openPopup(POPUP_PLAYER_CARD, { userid }));
  }, [dispatch, user?.id]);

  const startLocationId = contract?.Locations?.find(
    (location) => location.ContractLocation?.tag === 'start',
  )?.id;

  const archetypeObject = contractArchetypes.find(
    (option) => option.archetype === archetype,
  );
  return (
    <Card
      onClick={handleClick}
      sx={{
        height: '10em',
        width: '15em',
        background: 'linear-gradient(45deg, rgba(8,22,141), rgba(0,30,100))',
        bgcolor: 'action.disabledBackground',
        overflow: 'visible',
        border: '1px solid rgba(14,49,252,.4)',
        boxShadow:
          isSelected && contract.isEmergency
            ? '0 0 10px 2px red'
            : isSelected
              ? '0 0 10px 2px #18fcfc'
              : '0 0 10px 2px #0e318d',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: contract.isEmergency
            ? '0 0 10px 2px #ff4d4d'
            : isSelected
              ? '0 0 10px 2px rgb(33, 150, 243)'
              : '0 0 10px 2px rgba(14,49,252,.4)',
        },
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
      {contract.isEmergency && (
        <Tooltip title="Emergency Contract">
          <EmergencyShare
            color="error"
            fontSize="large"
            sx={{
              position: 'absolute',
              display: 'flex',
              top: '-10px',
              left: '90%',
              opacity: isSelected ? '1' : '.7',
              transition: 'opacity 0.3s ease-in-out',
            }}
          />
        </Tooltip>
      )}
      <CardActionArea
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          padding: '1em',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '90%',
            alignItems: 'center',
            mb: 'auto',
          }}
        >
          <MiniPlayerCard user={user ?? undefined}>
            <Avatar
              src={user?.pfp}
              sizes="small"
              onClick={handleAvatarClick}
              sx={{
                mr: '.5em',
                mt: 'auto',
                mb: 'auto',
                bgcolor: 'rgba(8,22,80,.9)',
                '&:hover': {
                  boxShadow: '0 0 10px 2px #0e318d',
                  bgcolor: '#0e318d',
                },
                boxShadow: '2px 2px 10px 5px rgba(8,22,80,.7)',
              }}
            />
          </MiniPlayerCard>
          <Tooltip title={contract.title}>
            <Typography
              variant="body1"
              align="center"
              sx={{
                overflow: 'hidden',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {contract.title}
            </Typography>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '80%',
            flexGrow: '1',
            my: '.5em',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Tooltip title={archetype}>
            {archetypeObject ? (
              React.cloneElement(archetypeObject.archetypeIcon, {
                fontSize: 'large',
                color: 'secondary',
              })
            ) : (
              <ErrorTwoTone fontSize="large" color="error" />
            )}
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ mx: 'auto' }}>
            <LocationChip
              locationId={startLocationId ?? ''}
              sx={{
                maxWidth: '100px',
              }}
            />
          </Box>
          <PayDisplay
            value={contract.defaultPay}
            variant={contract.payStructure}
            maxWidth="120px"
          />
        </Box>
      </CardActionArea>
    </Card>
  );
};

/*
Card Must take in the following information to display ALWAYS:
* Contract Title
* Bid Time Remaining
* Location
* Contract Owner Picture
* Pay
* SubType Icon -- Adding in later

Contract Props Card Takes In:
* Contract ID //Not used for testDB
* Contract Title
* Create Date
* BidTime
* Location
* Contract OwnerID //Not used for testDB
* Contract Owner Picture
* Contract Owner Name
* Contract Owner Rating
* DefaultPay
* PayStructure
* Type
* SubType

 Briefing Screen Information:
 - Contract Title
 * Player Card
  - Profile Picture
  * Name
  * Rating
  * Main Org
  * Rank
  * Role
 * Briefing Box
  * Estimated Duration
  * Contract Status
  * Remaining Bid Time -- If Status is Bidding
  * Pay Structure
  * Default Pay
  * Briefing Text
  * Contractors
  * Fleet Allocation
  * Submit Bid

Card Layout:
 - SubType Icon: Top Left
 - Profile Picture: Under SubType Icon slightly padded in
 - Contract Title: Top Center
 - Bid Time Remaining: Top Right
 - Pay: Center under Title
 - Location : Center under Pay

 Contract Object requires: {
  id: string;
  title: string;
  ownerID: string;
  createDate: Date;
  bidTime: number;
  contractDuration: number;
  contractStatus: string;
  type: string;
  subtype: string;
  payStructure: string;
  defaultPay: number;
  location: string;
  briefing: string;
  biddingContractorIDs: string[];
  acceptedContractorIDs: string[];
  rejectedContractorIDs: string[];
  ownerFleetAllocation: {
    id: string;
    allocationStatus: true;
    ship: {
      id: string;
      name: string;
      ownerID: string;
      shipModelID: string;
      crewAllocation: {
        //These will be pulled by the ShipModelID Eventually.
        crewCapacity: number;
        pilotID: string;
        captianID: string;
        helmsmanID: string;
        officers: {
          officerID: string;
          officerType: string;
          officerTitle: string;
        }
        gunners: {
          seatNumber: number;
          gunnerID: string;
        };
        crewman: {
          crewmanType: string;
          crewmanTitle: string;
          crewmanID: string;
        };
        security: {
          squadID: string;
          squadName: string;
          squadType: string;
          squadMembers: {
            squadMemberID: string;
          };
        };
      };
    };
  };
  requestedFleetAllocation: {};
  acceptedFleetAllocation: {};
  rejectedFleetAllocation: {};
 }
*/
