import { useSoundEffect } from '@Audio/AudioManager';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { MiniPlayerCard } from '@CommonLegacy/Components/App/MiniPlayerCard';
import { LocationChip } from '@CommonLegacy/Components/Chips/LocationChip';
import { PayDisplay } from '@CommonLegacy/Components/Custom/DigiField/PayDisplay';
import { EmergencyShare, ErrorTwoTone } from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardActionArea,
  Skeleton,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material';
import { POPUP_PLAYER_CARD } from '@Popups/PlayerCard/PlayerCard';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { selectUserById } from '@Redux/Slices/Users/users.selectors';
import { useNav } from '@Utils/Hooks/useNav';
import { useIsMobile } from '@Utils/isMobile';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { useParams } from 'react-router';
import type { ContractPayStructure } from 'vl-shared/src/schemas/contracts/ContractPayStructureSchema';
import type { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';

type LedgerCardProps = {
  contract: IContract;
  isSelected: boolean;
};

//TODO: ReMastering The Contract Card
export const LedgerCard: React.FC<LedgerCardProps> = ({ contract, isSelected }) => {
  const { selectedContractId } = useParams();
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();
  const isMobile = useIsMobile();
  const nav = useNav();
  const contractOwner = useAppSelector((state) =>
    selectUserById(state, contract.owner_id),
  );

  const handleAvatarClick = React.useCallback(() => {
    if (!contractOwner) {
      sound.playSound('denied');
      enqueueSnackbar('User Not Available', { variant: 'error' });
      return;
    }
    const userid = contractOwner.id;
    dispatch(openPopup(POPUP_PLAYER_CARD, { userid }));
  }, [dispatch, contractOwner, sound]);

  const startLocationId = contract?.Locations?.find(
    (location) => location.ContractLocation?.tag === 'start',
  )?.id;

  const contractArchetype = contractArchetypes.find((a) =>
    a.subtypes.some((s) => s.value === contract.subtype),
  );

  const handleSelectContract = React.useCallback(
    (e: React.MouseEvent) => {
      if (selectedContractId === contract.id) return sound.playSound('denied');
      if (isMobile) {
        const url = `/contract/${contract.id}`;
        nav(url, 'internal', true).onClick(e);
      } else {
        const { search } = window.location;
        const url = `/apps/ledger/${contract.id}${search}`;
        nav(url, 'internal', false).onClick(e);
      }
    },
    [selectedContractId, contract.id, sound, isMobile, nav],
  );
  const emergencyCard = isSelected
    ? {
        boxShadow:
          '0px 1px 3px 0px rgba(255,100,100,0.12), 0px 1px 1px 0px rgba(255,100,100,0.14), 0px 2px 1px -1px rgba(255,100,100,0.2), 0px 4px 6px -1px rgba(255,100,100,0.6), 0px 8px 10px 5px rgba(255,100,100,0.4), 0px 6px 20px 5px rgba(255,100,100,0.3)',
        '&:hover': {
          boxShadow:
            '0px 1px 3px 0px rgba(255,141,15,0.12), 0px 1px 1px 0px rgba(255,141,15,0.14), 0px 2px 1px -1px rgba(255,141,15,0.2), 0px 4px 6px -1px rgba(255,141,15,0.6), 0px 8px 10px 5px rgba(255,141,15,0.4), 6px 10px 25px 10px rgba(255,141,15,0.3)',
        },
      }
    : {
        boxShadow:
          '0px 1px 5px 0px rgba(80,0,0,0.12), 0px 1px 1px 0px rgba(140,0,0,0.14), 0px 2px 25px -1px rgba(140,0,0,0.2), 0px 4px 15px -1px rgba(140,0,0,0.6), 0px 8px 10px 0px rgba(140,0,0,0.4), 0px 10px 35px 0px rgba(140,0,0,0.3)',
        '&:hover': {
          boxShadow:
            '0px 1px 3px 0px rgba(255,0,0,0.12), 0px 1px 1px 0px rgba(255,0,0,0.14), 0px 2px 1px -1px rgba(255,0,0,0.2), 0px 4px 6px -1px rgba(255,0,0,0.6), 0px 8px 10px 0px rgba(255,0,0,0.4), 0px 10px 20px 0px rgba(255,0,0,0.3)',
        },
      };
  const normalCard = isSelected
    ? {
        boxShadow:
          '0px 1px 3px 0px rgba(24,252,252,0.12), 0px 1px 1px 0px rgba(24,252,252,0.14), 0px 2px 1px -1px rgba(24,252,252,0.2), 0px 4px 6px -1px rgba(24,252,252,0.6), 0px 8px 10px 5px rgba(24,252,252,0.4), 0px 6px 20px 5px rgba(24,252,252,0.3)',
        '&:hover': {
          boxShadow:
            '0px 1px 3px 0px rgba(121,192,244,0.12), 0px 1px 1px 0px rgba(121,192,244,0.14), 0px 2px 1px -1px rgba(121,192,244,0.2), 0px 4px 6px -1px rgba(121,192,244,0.6), 0px 8px 10px 5px rgba(121,192,244,0.4), 6px 10px 25px 10px rgba(121,192,244,0.3)',
        },
      }
    : {
        boxShadow:
          '0px 1px 3px 0px rgba(33,150,243,0.12), 0px 1px 1px 0px rgba(33,150,243,0.14), 0px 2px 1px -1px rgba(33,150,243,0.2), 0px 4px 6px -1px rgba(33,150,243,0.6), 0px 8px 10px 0px rgba(33,150,243,0.4), 0px 10px 20px 0px rgba(33,150,243,0.3)',
        '&:hover': {
          boxShadow:
            '0px 1px 3px 0px rgba(24,252,252,0.12), 0px 1px 1px 0px rgba(24,252,252,0.14), 0px 2px 1px -1px rgba(24,252,252,0.2), 0px 4px 6px -1px rgba(24,252,252,0.6), 0px 8px 10px 0px rgba(24,252,252,0.4), 0px 10px 20px 0px rgba(24,252,252,0.3)',
        },
      };
  const ArchetypeIcon = contractArchetype?.archetypeIcon ?? ErrorTwoTone;
  return (
    <Card
      data-testid={`ContractLedger__LedgerCard_${contract.id}`}
      onClick={(e) => handleSelectContract(e)}
      onAuxClick={(e) => handleSelectContract(e)}
      raised
      sx={[
        {
          height: '10em',
          width: '15em',
          background: 'linear-gradient(45deg, rgba(8,22,141), rgba(0,30,100))',
          overflow: 'visible',
          position: 'relative',
          transition: 'box-shadow 0.3s ease-in-out',
          borderRadius: '8px',
          border: '1px solid rgba(0, 30, 100, 0.4)',
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
        },
        contract.isEmergency ? { ...emergencyCard } : { ...normalCard },
      ]}
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
        <div
          style={{
            marginBottom: 'auto',
            display: 'flex',
            flexDirection: 'row',
            width: '90%',
            alignItems: 'center',
          }}
        >
          {contractOwner && <MiniPlayerCard user={contractOwner} />}
          {contractOwner ? (
            <Avatar
              src={contractOwner.pfp}
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
          ) : (
            <Skeleton variant="circular" />
          )}
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
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '80%',
            flexGrow: '1',
            margin: '.5em 0',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '1em',
          }}
        >
          <Tooltip title={contractArchetype?.archetype}>
            <SvgIcon component={ArchetypeIcon} color="secondary" fontSize="large" />
          </Tooltip>
          <Typography
            variant="body1"
            sx={{
              transform: 'scale(1.1)',
              color: 'secondary.light',
              textShadow: '0 0 3px rgb(0,0,0), 0 0 10px rgba(0,0,0,.7)',
            }}
          >
            {contractArchetype?.archetype}
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ margin: '0 auto' }}>
            <LocationChip
              locationId={startLocationId ?? ''}
              sx={{
                maxWidth: '100px',
              }}
            />
          </div>
          <PayDisplay
            label="Default Pay"
            pay={contract.defaultPay}
            structure={contract.payStructure as ContractPayStructure}
            maxWidth="120px"
          />
        </div>
      </CardActionArea>
    </Card>
  );
};
