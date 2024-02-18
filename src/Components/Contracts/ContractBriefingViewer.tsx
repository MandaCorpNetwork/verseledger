import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  Rating,
  Skeleton,
  Typography,
} from '@mui/material';

type ContractBriefingViewerProps = {
  Title: string;
  Type: string;
  SubType: string;
  Owner: string;
  OwnerPicture: string;
  OwnerRating: number;
  OwnerOrg: string;
  OwnerRank: string;
  OwnerRole: string;
  PayStructure: string;
  DefaultPay: string;
  Duration: number;
  StartTime: number;
  Status: string;
  AcceptedContractors: string;
  FleetAllocation: string;
  BriefingText: string;
};

export const ContractBriefingViewer: React.FC<ContractBriefingViewerProps> = ({
  Title,
  Type,
  SubType,
  Owner,
  OwnerPicture,
  OwnerRating,
  OwnerOrg,
  OwnerRank,
  OwnerRole,
  PayStructure,
  DefaultPay,
  Duration,
  StartTime,
  Status,
  AcceptedContractors,
  FleetAllocation,
  BriefingText,
}) => {
  return (
    <Box
      sx={{
        bgcolor: 'text.disabled',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden',
      }}
    >
      <Box
        id="Player-Profile-Box"
        sx={{
          padding: '.5em',
          marginRight: 'auto',
          ml: '1em',
          mt: '1em',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '40%',
          height: '30%',
          bgcolor: 'background.default',
        }}
      >
        <Box
          id="Player-Data"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            bgcolor: 'background.default',
          }}
        >
          <Avatar
            id="Profile-Picture"
            src={OwnerPicture}
            sx={{ ml: 'auto', bgcolor: 'primary.dark' }}
          />
          <Rating
            id="Rating"
            name="Rating"
            sx={{ ml: 'auto', mr: 'auto', mt: 'auto', mb: '5%' }}
          />
          <Typography id="UserName" sx={{ ml: 'auto', mr: 'auto' }}>
            UserName
          </Typography>
        </Box>
        <Divider
          variant="middle"
          color="secondary"
          sx={{ mb: '.5em', borderColor: 'text.secondary' }}
        />
        {/*<Box
          id="Org-Data"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Box
            id="MainOrgLogo"
            sx={{ ml: '20%', mr: '20%', bgcolor: 'primary.dark', width: '50', height: '50' }}
          ><img /></Box>
          <Skeleton
            id="Rank"
            variant="text"
            animation="wave"
            width={60}
            height={30}
            sx={{ m: 'auto', bgcolor: 'primary.dark' }}
          />
          <Skeleton
            id="Role"
            variant="text"
            animation="wave"
            width={60}
            height={30}
            sx={{ m: 'auto', bgcolor: 'primary.dark' }}
          />
        </Box>*/}
      </Box>
      <Box
        id="Contract-Header-Box"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box id="Title-Box" sx={{ display: 'flex', mb: '0' }}>
          <Typography id="Title" variant="h5" sx={{ mt: '1em', mr: '1em' }}>
            Contract Title
          </Typography>
        </Box>
        <Box id="Type-Box" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography id="Type" variant="subtitle1" sx={{}}>
            Contract Type
          </Typography>
          <Typography id="SubType" variant="caption" sx={{}}>
            Contract SubType
          </Typography>
        </Box>
        <Box id="Pay-Box" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box id="PayStructure" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography id="PayStructure-Title" variant="subtitle2" sx={{}}>
              Pay Structure
            </Typography>
            <Typography id="PayStructure-Text" variant="subtitle2" sx={{}}>
              Pay Structure Text
            </Typography>
          </Box>
          <Box>
            <Typography id="DefaultContractPay-Title" variant="subtitle2" sx={{}}>
              Contract Pay
            </Typography>
            <Typography id="DefaultContractPay-Text" variant="subtitle2" sx={{}}>
              Contract Pay Text
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        id="Details-Box"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          id="ContractStatus-Box"
          sx={{ display: 'flex', flexDirection: 'column', ml: '1em' }}
        >
          <Box id="ContractDuration" sx={{ bgcolor: 'primary.dark' }}>
            <Typography id="ContractDuration-Title" variant="subtitle2" sx={{}}>
              Contract Duration
            </Typography>
            <Typography id="ContractDuration-Text" variant="subtitle2" sx={{}}>
              Contract Dur Text
            </Typography>
          </Box>
          <Box id="ContractStatus" sx={{ bgcolor: 'primary.dark' }}>
            <Typography id="ContractStatus-Title" variant="subtitle2" sx={{}}>
              Contract Status
            </Typography>
            <Typography id="ContractStatus-Text" variant="subtitle2" sx={{}}>
              Contract Stat Text
            </Typography>
          </Box>
          <Box id="ContractStartTime" sx={{ bgcolor: 'primary.dark' }}>
            <Typography id="ContractStartTime-Title" variant="subtitle2" sx={{}}>
              Contract Start Time
            </Typography>
            <Typography id="ContractStartTime-Text" variant="subtitle2" sx={{}}>
              Contract Start Text
            </Typography>
          </Box>
        </Box>
        <Box
          id="AcceptedContractor-Box"
          sx={{
            mr: '1em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            mt: '1em',
          }}
        >
          <Box
            sx={{
              bgcolor: 'background.default',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              padding: '.5em',
            }}
          >
            <Typography id="AcceptedContractor-Title" variant="subtitle2" sx={{}}>
              Accepted Contractor
            </Typography>
            <Box id="Contractor-Display-Block" sx={{}}>
              <AvatarGroup alt="Accepted Contractors" src={AcceptedContractors} max={5} />
            </Box>
          </Box>
        </Box>
        <Box
          id="ShipQueue-Box"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mr: '1em',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              bgcolor: 'background.default',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              padding: '.5em',
            }}
          >
            <Typography
              id="ShipQueue-Header"
              variant="subtitle1"
              animation="wave"
              sx={{}}
            >
              Ship Queue
            </Typography>
            <Box id="Ship-Box" sx={{ bgcolor: 'primary.dark', display: 'flex' }}>
              <Typography id="Ship" variant="subtitle2" sx={{}}>
                Ship
              </Typography>
              <Typography id="CrewCount" variant="subtitle2" sx={{}}>
                0/0
              </Typography>
            </Box>
            <Box id="Ship-Box" sx={{ bgcolor: 'primary.dark', display: 'flex' }}>
              <Typography id="Ship" variant="subtitle2" sx={{}}>
                Ship
              </Typography>
              <Typography id="CrewCount" variant="subtitle2" sx={{}}>
                0/0
              </Typography>
            </Box>
            <Box id="Ship-Box" sx={{ bgcolor: 'primary.dark', display: 'flex' }}>
              <Typography id="Ship" variant="subtitle2" sx={{}}>
                Ship
              </Typography>
              <Typography id="CrewCount" variant="subtitle2" sx={{}}>
                0/0
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        id="ContractExpandedInfo-Box"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box
          id="ContractBriefing-Box"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '60%',
            ml: '1em',
            bgcolor: 'background.default',
            mb: '1em',
          }}
        >
          <Typography
            id="ContractBriefing-Header"
            variant="h6"
            sx={{ bgcolor: 'primary.dark' }}
          >
            Briefing
          </Typography>
          <Typography
            id="Brief-Text"
            variant="body2"
            animation="wave"
            width={250}
            sx={{}}
          >
            This is where the paragraph of text will go.
          </Typography>
        </Box>
        <Box
          id="Bid-Button-Box"
          sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}
        >
          <Button
            id="Bid-Button"
            variant="contained"
            sx={{ bgcolor: 'primary.dark', mb: '2em', mr: '1.5em' }}
          >
            submit bid
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
