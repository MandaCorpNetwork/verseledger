import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { ArchetypeChip } from '@Common/Components/Chips/ArchetypeChip';
import { SubtypeChip } from '@Common/Components/Chips/SubtypeChip';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { UserDisplay } from '@Common/Components/Users/UserDisplay';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { LoadingScreen } from '@Common/LoadingObject/LoadingScreen';
import { Link } from '@mui/icons-material';
import { Box, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import { POPUP_ARCHETYPE_INFO } from '@Popups/Info/Archetypes';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchContracts } from '@Redux/Slices/Contracts/actions/fetch/fetchContracts';
import { selectContract } from '@Redux/Slices/Contracts/selectors/contractSelectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { isMobile } from '@Utils/isMobile';
import { isTablet } from '@Utils/isTablet';
import { QueryNames } from '@Utils/QueryNames';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSoundEffect } from '@/AudioManager';

export const ContractPage: React.FC<unknown> = () => {
  const [searchParam] = useURLQuery();
  const dispatch = useAppDispatch();
  const contractId = searchParam.get(QueryNames.Contract);
  const mobile = isMobile();
  const tablet = isTablet();
  const { playSound } = useSoundEffect();
  const navigate = useNavigate();

  const [archetype, setArchetype] = React.useState<string | null>(null);

  const archetypeOptions = contractArchetypes('secondary.main', 'inherit');

  const contract = useAppSelector((root) => selectContract(root, contractId as string));
  const isLoading = useAppSelector((state) => state.contracts.isLoading);

  React.useEffect(() => {
    if (contractId) {
      dispatch(fetchContracts({ limit: 1, page: 0, contractId: [contractId] }));
    }
  }, [contractId, dispatch]);

  React.useEffect(() => {
    if (!isLoading && !contract) {
      navigate('/contract/ledger');
    }
  }, [contract, isLoading, navigate]);

  React.useEffect(() => {
    if (!contract) return;
    const selectedArchetype = archetypeOptions.find((option) =>
      option.subTypes.some((subType) => subType.value === contract.subtype),
    );
    if (selectedArchetype) {
      setArchetype(selectedArchetype.archetype);
    } else {
      setArchetype(null);
    }
  }, [contract, archetypeOptions]);

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

  const statusChipColor = React.useCallback(() => {
    if (contract?.status == 'BIDDING') {
      return 'secondary';
    } else if (contract?.status == 'STARTED') {
      return 'info';
    } else if (contract?.status == 'COMPLETE') {
      return 'success';
    } else if (contract?.status == 'CANCELED') {
      return 'error';
    } else {
      return 'primary';
    }
  }, [contract]);

  const statusColor = statusChipColor();

  return (
    <VLViewport
      data-testid="ContractPage__Container"
      sx={{ p: { xs: '1em', sm: '2em', md: '3em', lg: '4em', xl: '5em' } }}
    >
      {isLoading && <LoadingScreen variant="wheel" controlType="indeterminate" />}
      <GlassBox
        data-testid="ContractPage__Wrapper"
        sx={{
          py: { xs: '.5em', md: '1em', lg: '2em', xl: '3em' },
          px: { xs: '.5em', md: '2em', lg: '10em', xl: '15em' },
        }}
      >
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
                  fontWeight: 'bold',
                  maxWidth: '80%',
                  color: 'text.primary',
                  textShadow: '0 0 2px #fff, 0 0 10px #000',
                  cursor: 'default',
                }}
              >
                {contract?.title}
              </Typography>
            </Tooltip>
            <IconButton
              data-testid="ContractPage-Info-TitleBar__PageLink_Button"
              size={mobile ? 'medium' : 'large'}
              onClick={() => {
                handleCopyURL(window.location.href);
              }}
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
            }}
          >
            {mobile && (
              <Box
                data-testid="ContractPage-Info-ContractInfo__Mobile_Wrapper"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: '.5em',
                }}
              >
                <Box
                  data-testid="ContractPage-Info-ContractInfo-Mobile__Status&Type_Wrapper"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  <DigiField
                    data-testid="ContractPage-Info-ContractInfo-Type__Subtype_Field"
                    label="Contract Subtype"
                  >
                    {contract && <SubtypeChip subtype={contract.subtype} />}
                  </DigiField>
                  <DigiField
                    data-testid="ContractPage-Info-ContractInfo-Type__Archetype_Field"
                    label="Contract Archetype"
                  >
                    {archetype && <ArchetypeChip archetype={archetype} />}
                  </DigiField>
                </Box>
                <Box
                  data-testid="ContractPage-Info-ContractInfo-Mobile__UserDisplay_Wrapper"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  <DigiDisplay
                    data-testid="ContractPage-Info-ContractInfo__Status_Wrapper"
                    sx={{ px: '.5em' }}
                  >
                    <Typography
                      data-testid="ContractPage-Info-ContractInfo__Status_Title"
                      align="center"
                      variant="body2"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Status
                    </Typography>
                    <Chip
                      data-testid="ContractPage-Info-ContractInfo__Status_Chip"
                      variant="filled"
                      color={statusColor}
                      size="small"
                      label={
                        contract?.status === 'INPROGRESS'
                          ? 'In Progress'
                          : contract?.status.charAt(0).toUpperCase() +
                            contract?.status.slice(1).toLowerCase()
                      }
                      sx={{ my: 'auto' }}
                    />
                  </DigiDisplay>
                  <UserDisplay userid={contract?.owner_id} />
                </Box>
              </Box>
            )}
            {!mobile && (
              <>
                <DigiDisplay data-testid="ContractPage-Info-ContractInfo__Status_Wrapper">
                  <Typography data-testid="ContractPage-Info-ContractInfo__Status_Title"></Typography>
                  <Chip data-testid="ContractPage-Info-ContractInfo__Status_Chip" />
                </DigiDisplay>
                <DigiDisplay data-testid="ContractPage-Info-ContractInfo__Type_Container">
                  <DigiField
                    data-testid="ContractPage-Info-ContractInfo-Type__Subtype_Field"
                    label="Contract Subtype"
                  ></DigiField>
                  <DigiField
                    data-testid="ContractPage-Info-ContractInfo-Type__Archetype_Field"
                    label="Contract Archetype"
                  ></DigiField>
                </DigiDisplay>
                <UserDisplay userid={contract?.owner_id} />
              </>
            )}
          </Box>
        </DigiBox>
      </GlassBox>
    </VLViewport>
  );
};
