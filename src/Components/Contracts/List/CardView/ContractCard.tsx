import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Chip,
  CircularProgress,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';

import type { IContract } from '@/../../verseledger-backend/src/interfaces/IContract';
import TestAttacheIcon from '@/Assets/media/GameplayIcons/TestAttacheIcon.svg?url';
import TestProfile from '@/Assets/media/TestProfile.png?url';

type ContractCardProps = {
  contract: IContract;
  onClick?: () => void;
};

export const ContractCard: React.FC<ContractCardProps> = ({ contract, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const SunChip = (props) => {
    return (
      <Chip
        {...props}
        label="Sun"
        size="small"
        sx={{
          width: '5em',
          backgroundColor: 'primary.light',
          margin: '.1em',
        }}
      />
    );
  };

  const PlanetChip = (props) => {
    return (
      <Chip
        {...props}
        label="Planet"
        size="small"
        sx={{
          width: '5em',
          backgroundColor: 'primary.light',
          margin: '.1em',
        }}
      />
    );
  };

  const MoonChip = (props) => {
    return (
      <Chip
        {...props}
        label="Moon"
        size="small"
        sx={{
          width: '5em',
          backgroundColor: 'primary.light',
          margin: '.1em',
        }}
      />
    );
  };

  const LocationChip = (props) => {
    return (
      <Chip
        {...props}
        label={contract.location}
        size="small"
        sx={{
          width: '5em',
          backgroundColor: 'primary.light',
          margin: '.1em',
        }}
      />
    );
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        height: '10em',
        width: '15em',
        backgroundColor: 'text.disabled',
        '&:hover': {
          boxShadow: '0 0 0 4px #0e318d',
        },
      }}
    >
      <CardActionArea
        sx={{
          display: 'flex',
          flexDirection: 'columns',
          height: '100%',
          width: '100%',
          padding: '.5em',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Tooltip title={`${contract.type} | ${contract.subtype}`}>
            <img src={TestAttacheIcon} alt="" width="30" />
          </Tooltip>
          <Tooltip title="Test Owner">
            <Avatar
              src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reddit.com%2Fuser%2Frandomasianmale%2Fcomments%2Fl9z6l7%2Fpop_cat_transparent_part_1%2F&psig=AOvVaw2X2w5SQZGST98_f2nCP9dp&ust=1708327805932000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDh-pKvtIQDFQAAAAAdAAAAABAE"
              sizes="small"
              sx={{ mt: 'auto', mb: 'auto' }}
            />
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
            {contract.title}
          </Typography>
          <Box sx={{ flexGrow: 1, pl: '15%', pt: '10%' }}>
            <SunChip />
            <PlanetChip />
            <MoonChip />
            <Tooltip title={contract.location}>
              <LocationChip />
            </Tooltip>
          </Box>
          <Box
            sx={{
              display: 'inline',
              marginLeft: 'auto',
              marginTop: 'auto',
              bgcolor: 'background.dafault',
              padding: '.3em',
              borderRadius: '.3em',
              border: '1px solid',
              borderColor: 'text.light',
            }}
          >
            <Tooltip title={contract.payStructure}>
              <Typography component="span">
                ¤
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                })
                  .format(contract.pay)
                  .substring(1)}
              </Typography>
            </Tooltip>
          </Box>
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
