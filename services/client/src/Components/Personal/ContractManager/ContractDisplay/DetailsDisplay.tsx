import { RatingDisplay } from '@Common/Components/App/RatingDisplay';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { CopyString } from '@Common/Components/Buttons/CopyString';
import { GeneralNav } from '@Common/Components/Buttons/GeneralNavIcon';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { ErrorOutline } from '@mui/icons-material';
import { Tooltip, Typography } from '@mui/material';
import React from 'react';
import { IContractWithOwner } from 'vl-shared/src/schemas/ContractSchema';

import { ContractDetailsCollapse } from './DetailsCollapse';

type DetailsDisplayProps = {
  contract: IContractWithOwner;
};

export const DetailsDisplay: React.FC<DetailsDisplayProps> = ({ contract }) => {
  const contractInactive =
    contract.status === 'COMPLETED' || contract.status === 'CANCELED';

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
