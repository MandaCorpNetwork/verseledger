import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  Tooltip,
  Chip,
  CircularProgress,
  SvgIcon,
} from '@mui/material';
import TestAttacheIcon from '@/assets/icons/TestAttacheIcon';

type ContractCardProps = {
  contractTitle: string;
  contractOwner: string;
  contractOwnerPicture: string;
  contractOwnerRating: number;
  createDate: Date;
  bidTime: number;
  location: string;
  defaultPay: string;
  payStructure: string;
  type: string;
  subType: string;
};

const subTypeIcon = TestAttacheIcon;

export const ContractCard: React.FC<ContractCardProps> = ({
  contractTitle,
  contractOwner,
  contractOwnerPicture,
  contractOwnerRating,
  createDate,
  bidTime,
  location,
  defaultPay,
  payStructure,
  type,
  subType,
}) => {
  return (
    <Card sx={{ height: '10em', width: '15em', padding: '.5em' }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'columns',
          height: '100%',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <SvgIcon>
            <img src={subTypeIcon} alt="" />
          </SvgIcon>
          <Tooltip title="Test Owner">
            <Avatar src={contractOwnerPicture} sx={{ mt: 'auto', mb: 'auto' }} />
          </Tooltip>
          <Tooltip title="Test Type & SubType">
            <Typography></Typography>
          </Tooltip>
          <CircularProgress color="secondary" sx={{ mt: 'auto' }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="h6"
            sx={{
              paddingLeft: '.5em',
              overflow: 'hidden',
              fontWeight: '600',
            }}
          >
            Test Title
          </Typography>
          <Box sx={{ flexGrow: 1, pl: '15%', pt: '10%' }}>
            <Chip label="Star" size="small" />
            <Chip label="Planet" size="small" />
            <Chip label="Moon" size="small" />
            <Chip label="Location" size="small" />
          </Box>
          <Box
            sx={{
              display: 'inline',
              marginLeft: 'auto',
              marginTop: 'auto',
              bgcolor: 'text.disabled',
              padding: '.3em',
              borderRadius: '.3em',
            }}
          >
            <Typography component="span">¤</Typography>
            <Tooltip title="Test Pay Structure">
              <Typography component="span">5,555</Typography>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
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
