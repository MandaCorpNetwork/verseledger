import { Box, Divider, Skeleton } from '@mui/material';

export const ContractBriefingSkelton: React.FC<unknown> = () => {
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
          <Skeleton
            id="Profile-Picture"
            variant="circular"
            animation="pulse"
            width={50}
            height={50}
            sx={{ ml: 'auto', bgcolor: 'primary.dark' }}
          />
          <Skeleton
            id="Rating"
            variant="rectangular"
            animation="pulse"
            width={60}
            height={20}
            sx={{ ml: 'auto', mr: 'auto', mt: 'auto', mb: '5%', bgcolor: 'primary.dark' }}
          />
          <Skeleton
            id="UserName"
            variant="text"
            animation="pulse"
            width={90}
            height={50}
            sx={{ ml: 'auto', mr: 'auto', bgcolor: 'primary.dark' }}
          />
        </Box>
        <Divider
          variant="middle"
          color="secondary"
          sx={{ mb: '.5em', borderColor: 'text.secondary' }}
        />
        <Box
          id="Org-Data"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Skeleton
            id="MainOrgLogo"
            variant="rectangular"
            animation="pulse"
            width={50}
            height={50}
            sx={{ ml: '20%', mr: '20%', bgcolor: 'primary.dark' }}
          />
          <Skeleton
            id="Rank"
            variant="text"
            animation="pulse"
            width={60}
            height={30}
            sx={{ m: 'auto', bgcolor: 'primary.dark' }}
          />
          <Skeleton
            id="Role"
            variant="text"
            animation="pulse"
            width={60}
            height={30}
            sx={{ m: 'auto', bgcolor: 'primary.dark' }}
          />
        </Box>
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
          <Skeleton
            id="Contract-Title"
            variant="h1"
            //This is actually matching the call fine in the DOM, please ignore.
            animation="pulse"
            width={200}
            height={50}
            sx={{ bgcolor: 'primary.dark', mt: '1em', mr: '1em' }}
          />
        </Box>
        <Box id="Contract-Type-Box" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Skeleton
            id="Contract-Type"
            variant="text"
            animation="pulse"
            width={80}
            height={40}
            sx={{ bgcolor: 'primary.dark', zindex: '10', position: 'absolute' }}
          />
          <Skeleton
            id="Contract-SubType"
            variant="text"
            animation="pulse"
            width={80}
            height={40}
            sx={{ bgcolor: 'primary.dark', zindex: '20', mt: '2em' }}
          />
        </Box>
        <Box id="Contract-Pay-Box" sx={{ display: 'flex', flexDirection: 'column'}}>
        <Skeleton
          id="ContractPayStructure"
          variant="text"
          animation="pulse"
          width={100}
          height={60}
          sx={{ bgcolor: 'primary.dark', zIndex: '10', position: 'absolute' }}
        />
        <Skeleton
          id="DefaultContractPay"
          variant="text"
          animation="pulse"
          width={100}
          height={60}
          sx={{ bgcolor: 'primary.dark', mt: '2.8em' }}
        />
      </Box>
      </Box>
      <Box id="ContractDetails-Box" sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
      <Box id="ContractStatus-Box" sx={{ display: 'flex', flexDirection: 'column', ml: '1em' }}>
        <Skeleton
          id="ContractDuration"
          variant="text"
          animation="pulse"
          width={100}
          height={75}
          sx={{ bgcolor: 'primary.dark' }}
        />
        <Skeleton
          id="ContractStatus"
          variant="text"
          animation="pulse"
          width={100}
          height={75}
          sx={{ bgcolor: 'primary.dark'}}
        />
        <Skeleton
          id="ContractStartTime"
          variant="text"
          animation="pulse"
          width={100}
          height={75}
          sx={{ bgcolor: 'primary.dark' }}
        />
      </Box>
      <Box id="AcceptedContractor-Box" sx={{ mr: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', mt: '1em' }}>
        <Skeleton
          id="Contractors-Header"
          variant="text"
          animation="pulse"
          width={80}
          sx={{ bgcolor: 'primary.dark', mb: '.5em' }}
        />
        <Skeleton
          id="Contractor-Display-Block"
          variant="rounded"
          animation="pulse"
          width={150}
          height={30}
          sx={{ bgcolor: 'primary.dark' }}
        />
      </Box>
      <Box id="ShipQueue-Box" sx={{ display: 'flex', flexDirection: 'column', mr: '1em', justifyContent: 'center', alignItems: 'center' }}>
        <Skeleton
          id="ShipQueue-Header"
          variant="text"
          animation="pulse"
          width={60}
          sx={{ bgcolor: 'primary.dark' }}
        />
        <Skeleton
          id="Ship-Box"
          variant="text"
          animation="pulse"
          width={130}
          height={40}
          sx={{ bgcolor: 'primary.dark' }}
        />
                <Skeleton
          id="Ship-Box"
          variant="text"
          animation="pulse"
          width={130}
          height={40}
          sx={{ bgcolor: 'primary.dark' }}
        />
                <Skeleton
          id="Ship-Box"
          variant="text"
          animation="pulse"
          width={130}
          height={40}
          sx={{ bgcolor: 'primary.dark' }}
        />
      </Box>
      </Box>
      <Box id="ContractExpandedInfo-Box" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
      <Box id="ContractBriefing-Box" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60%', ml: '1em' }}>
        <Skeleton
          id="ContractBriefing-Header"
          variant="text"
          animation="pulse"
          width={70}
          height={40}
          sx={{ bgcolor: 'primary.dark' }}
        />
        <Skeleton
          id="Brief-Text"
          variant="text"
          animation="pulse"
          width={300}
          sx={{ bgcolor: 'primary.dark' }}
        />
        <Skeleton
          id="Brief-Text"
          variant="text"
          animation="pulse"
          width={300}
          sx={{ bgcolor: 'primary.dark' }}
        />
        <Skeleton
          id="Brief-Text"
          variant="text"
          animation="pulse"
          width={300}
          sx={{ bgcolor: 'primary.dark' }}
        />
        <Skeleton
          id="Brief-Text"
          variant="text"
          animation="pulse"
          width={300}
          sx={{ bgcolor: 'primary.dark' }}
        />
        <Skeleton
          id="Brief-Text"
          variant="text"
          animation="pulse"
          width={300}
          sx={{ bgcolor: 'primary.dark' }}
        />
        <Skeleton
          id="Brief-Text"
          variant="text"
          animation="pulse"
          width={300}
          sx={{ bgcolor: 'primary.dark' }}
        />
      </Box>
      <Box id="Bid-Button-Box" sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <Skeleton
          id="Bid-Button"
          variant="rounded"
          animation="pulse"
          width={100}
          height={30}
          sx={{ bgcolor: 'primary.dark', mb: '2em', mr: '1.5em' }}
        />
      </Box>
      </Box>
    </Box>
  );
};

