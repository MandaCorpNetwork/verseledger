import { RatingDisplay } from '@Common/Components/App/RatingDisplay';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { CopyString } from '@Common/Components/Buttons/CopyString';
import { GeneralNav } from '@Common/Components/Buttons/GeneralNavIcon';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { ErrorOutline, HighlightOffTwoTone } from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { useNav } from '@Utils/Hooks/useNav';
import React from 'react';
import { IContractWithOwner } from 'vl-shared/src/schemas/ContractSchema';

import { ContractDetailsCollapse } from './DetailsCollapse';

type DetailsDisplayProps = {
  contract: IContractWithOwner;
};

export const DetailsDisplay: React.FC<DetailsDisplayProps> = ({ contract }) => {
  const contractInactive =
    contract.status === 'COMPLETED' || contract.status === 'CANCELED';
  const nav = useNav();

  const getOwnerRating = React.useCallback(() => {
    const userRatings = contract.Ratings?.filter(
      (rating) => rating.reciever_id === contract.owner_id,
    );
    if (!userRatings || userRatings.length === 0) return 0;
    const ratingSum = userRatings.reduce((acc, rating) => acc + rating.rating_value, 0);
    return ratingSum / userRatings.length;
  }, [contract.Ratings, contract.owner_id]);
  const ownerRating = getOwnerRating();

  const selectedArchetype =
    contractArchetypes.find((option) =>
      option.subTypes.some((subtype) => subtype.value === contract.subtype),
    ) || null;

  const closeContract = React.useCallback(
    (e: React.MouseEvent) => {
      const { search } = window.location;
      const url = `/apps/contracts/${search}`;
      nav(url, 'internal', false).onClick(e);
    },
    [nav],
  );

  return (
    <DigiBox
      content="section"
      data-testid="SelectedContract__DetailsDisplay_Container"
      sx={{
        width: '100%',
        padding: '1em',
        mb: '.5em',
        height: 'auto',
      }}
    >
      <Tooltip title="Close Contract">
        <IconButton
          data-testid="SelectedContract-DetailsDisplay__CloseContract_Button"
          onClick={closeContract}
          sx={{
            position: 'absolute',
            top: -5,
            left: -5,
            zIndex: 10,
          }}
        >
          <HighlightOffTwoTone
            data-testid="SelectedContract-DetailsDisplay__CloseContract_Icon"
            color="warning"
            fontSize="medium"
            sx={{
              opacity: '0.6',
              filter:
                'drop-shadow(0 0 0 rgba(255,193,0,0.4)) drop-shadow(0 0 5px rgba(255,193,0,0.6)) drop-shadow(0 0 10px rgba(255,193,0,0.5))',
              transition: 'opacity 0.3s ease-in-out',
              '&:hover': {
                opacity: '1',
              },
            }}
          />
        </IconButton>
      </Tooltip>

      <div
        data-testid="SelectedContract-DetailsDisplay__Title_Container"
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <DigiDisplay
          data-testid="SelectedContract-DetailsDisplay__HeaderWrapper"
          sx={{
            flexDirection: 'row',
            px: '1em',
            py: '.2em',
            alignItems: 'strech',
            justifyContent: 'space-between',
            flexGrow: 1,
          }}
        >
          <Typography
            data-testid="SelectedContract-DetailsDisplay-Header__ContractTitle"
            content="header"
            variant="h4"
            noWrap
            sx={{
              maxWidth: '100%',
              cursor: 'default',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {contract.title}
            {contractInactive && (
              <RatingDisplay
                value={ownerRating}
                variant="defined"
                size="small"
                sx={{ ml: '.5em' }}
              />
            )}
          </Typography>
          <div
            data-testid="SelectedContract-DetailsDisplay-Header__ContractTypeContainer"
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Tooltip title={selectedArchetype ? selectedArchetype.archetype : 'Error'}>
              {selectedArchetype ? (
                React.cloneElement(selectedArchetype.archetypeIcon, {
                  fontSize: 'large',
                  color: 'secondary',
                })
              ) : (
                <ErrorOutline fontSize="medium" color="error" />
              )}
            </Tooltip>
          </div>
        </DigiDisplay>
        <CopyString
          data-testid="SelectedContract-DetailsDisplay-Header__ContractPageURL"
          variant="VLurl"
          string={`/ledger/contracts/${contract.id}`}
          successText="Contract Added to Clipboard"
        />
        <GeneralNav
          data-testid="SelectedContract-DetailsDisplay-Header__ContractPageURL"
          variant="internal"
          url={`/contract/${contract.id}`}
        />
      </div>
      <ContractDetailsCollapse contract={contract} />
    </DigiBox>
  );
};
