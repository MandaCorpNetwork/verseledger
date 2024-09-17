import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { Link } from '@mui/icons-material';
import { Box, IconButton, Rating, Tooltip, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { IContractWithOwner } from 'vl-shared/src/schemas/ContractSchema';

import { useSoundEffect } from '@/AudioManager';

import { InfoNonMobile } from './InfoNonMobile';
import { MobileInfo } from './MobileInfo';

type TitleBoxProps = {
  /** @prop {IContract} contract - The contract to display information for */
  contract: IContractWithOwner;
  /** @prop {boolean} mobile - Whether the screen is mobile or not */
  mobile: boolean;
  /** @prop {boolean} tablet - Whether the screen is tablet or not */
  tablet: boolean;
  /** @prop {string} archetype - The archetype of the contract */
  archetype: string;
};

/**
 * ### TitleBox
 * @description
 * Displays Overview information for a Contract.
 * @version 0.1.2
 * @memberof {@link ContractPage}
 * @prop {IContract} contract - The contract to display information for
 * @prop {boolean} mobile - Whether the screen is mobile or not
 * @prop {boolean} tablet - Whether the screen is tablet or not
 * @prop {string} archetype - The archetype of the contract
 * @returns {React.FC}
 * #### Functional Components
 * @component {@link InfoNonMobile}
 * @component {@link MobileInfo}
 * #### Styled Components
 * @component {@link DigiBox}
 * @component {@link DigiDisplay}
 * @author ThreeCrown
 */
export const TitleBox: React.FC<TitleBoxProps> = ({
  contract,
  mobile,
  tablet,
  archetype,
}) => {
  // HOOKS
  const { playSound } = useSoundEffect();
  // LOGIC
  /**
   * @function handleCopyURL - Handles the copy URL button click
   * @param {string} url - The URL to copy
   * @returns {void} - Copies the URL to the clipboard
   */
  const handleCopyURL = (url: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          playSound('clickMain');
          enqueueSnackbar('Copied Contract to Clipboard', { variant: 'success' });
        })
        .catch((err) => {
          playSound('error');
          enqueueSnackbar(`Failed to Copy Contract: ${err}`, { variant: 'error' });
        });
    } else {
      playSound('denied');
      enqueueSnackbar('Clipboard API not supported', { variant: 'warning' });
    }
  };

  const getContractorRating = React.useCallback(() => {
    const userRatings = contract.Ratings?.filter(
      (rating) => rating.reciever_id === contract.owner_id,
    );
    if (!userRatings || userRatings.length === 0) return 0;
    const ratingSum = userRatings.reduce((acc, rating) => acc + rating.rating_value, 0);
    return ratingSum / userRatings.length;
  }, [contract]);

  const ownerRating = getContractorRating();
  return (
    <DigiBox
      data-testid="ContractPage__Info_Container"
      sx={{
        py: { xs: '.5em', md: '1em', lg: '2em' },
        px: { xs: '.5em', md: '3em', lg: '10em' },
      }}
    >
      <DigiDisplay
        data-testid="ContractPage-Info__TitleBar_Wrapper"
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          px: { xs: '.5em', md: '2em', lg: '5em', xl: '10em' },
          mb: 'auto',
          py: { xs: '', lg: '.5em' },
        }}
      >
        <Tooltip
          title={contract?.title}
          arrow
          data-testid="ContractPage-Info-TitleBar__Title_Tooltip"
        >
          <Typography
            data-testid="ContractPage-Info-TitleBar__Title_Text"
            variant={mobile ? 'h6' : 'h5'}
            noWrap
            sx={{
              maxWidth: '80%',
              color: 'text.primary',
              textShadow: '0 0 2px #fff, 0 0 10px #000',
              cursor: 'default',
            }}
          >
            {contract?.title}
          </Typography>
        </Tooltip>
        {(contract.status === 'COMPLETED' || contract.status === 'CANCELED') && (
          <Rating readOnly value={ownerRating} disabled={ownerRating === 0} />
        )}
        <IconButton
          data-testid="ContractPage-Info-TitleBar__PageLink_Button"
          size={mobile ? 'medium' : 'large'}
          onClick={() => handleCopyURL(window.location.href)}
        >
          <Link fontSize={mobile ? 'medium' : 'large'} />
        </IconButton>
      </DigiDisplay>
      <Box
        data-testid="ContractPage-Info__ContractInfo_Wrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          mt: { xs: '.5em', md: '1em', lg: '2em' },
          width: '100%',
          justifyContent: 'space-between',
          px: { xs: '0', md: '2%', lg: '5%' },
          height: '100%',
        }}
      >
        {mobile && <MobileInfo contract={contract} archetype={archetype} />}
        {!mobile && (
          <InfoNonMobile contract={contract} archetype={archetype} tablet={tablet} />
        )}
      </Box>
    </DigiBox>
  );
};
