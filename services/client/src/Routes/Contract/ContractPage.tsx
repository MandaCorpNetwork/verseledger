import { ControlPanelBox } from '@Common/Components/Boxes/ControlPanelBox';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { PopupFormSelection } from '@Common/Components/Boxes/PopupFormSelection';
import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { ArchetypeChip } from '@Common/Components/Chips/ArchetypeChip';
import { ContractStatusChip } from '@Common/Components/Chips/ContractStatusChip';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { SubtypeChip } from '@Common/Components/Chips/SubtypeChip';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { PayDisplay } from '@Common/Components/Custom/DigiField/PayDisplay';
import { PayStructure } from '@Common/Components/Custom/DigiField/PayStructure';
import { SmallTabHolo, SmallTabsHolo } from '@Common/Components/Tabs/SmallTabsHolo';
import { UserDisplay } from '@Common/Components/Users/UserDisplay';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { LoadingScreen } from '@Common/LoadingObject/LoadingScreen';
import { ArrowBackIosNew, Link } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { POPUP_SUBMIT_CONTRACT_BID } from '@Popups/Contracts/ContractBids/ContractBid';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchContracts } from '@Redux/Slices/Contracts/actions/fetch/fetchContracts';
import { selectContract } from '@Redux/Slices/Contracts/selectors/contractSelectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { useHorizontalAdvancedScroll } from '@Utils/horizontalScroll';
import { isMobile } from '@Utils/isMobile';
import { isTablet } from '@Utils/isTablet';
import { QueryNames } from '@Utils/QueryNames';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSoundEffect } from '@/AudioManager';
import { ContractorsPanel } from '@/Components/Contracts/Ledger/Details/ActiveDataPanel';
import { BiddingTimePanel } from '@/Components/Contracts/Ledger/Details/TimePanel';

export const ContractPage: React.FC<unknown> = () => {
  const [searchParam] = useURLQuery();
  const dispatch = useAppDispatch();
  const contractId = searchParam.get(QueryNames.Contract);
  const mobile = isMobile();
  const tablet = isTablet();
  const { playSound } = useSoundEffect();
  const navigate = useNavigate();
  const scrollRef = useHorizontalAdvancedScroll();

  const [archetype, setArchetype] = React.useState<string | null>(null);
  const [timeTab, setTimeTab] = React.useState<string>('bid');
  const [activeDataTab, setActiveDataTab] = React.useState<string>('contractors');
  const [opacity, setOpacity] = React.useState(0.5);

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

  const getStartLocationId = () => {
    if (!contract) return null;
    if (contract.Locations) {
      const startLocationPull = contract?.Locations?.find(
        (location) => location.ContractLocation?.tag === 'start',
      )?.id;
      return startLocationPull || null;
    }
    return null;
  };

  const startLocationId = getStartLocationId();

  const getEndLocationId = () => {
    if (!contract) return null;
    if (contract.Locations) {
      const endLocationPull = contract?.Locations?.find(
        (location) => location.ContractLocation?.tag === 'end',
      )?.id;
      return endLocationPull || null;
    }
    return null;
  };

  const endLocationId = getEndLocationId();

  const getOtherLocationIds = () => {
    if (!contract) return null;
    if (contract.Locations) {
      const otherLocationsPull = contract?.Locations?.filter(
        (location) => location.ContractLocation?.tag === 'other',
      );
      return otherLocationsPull.map((location) => location.id);
    }
    return [];
  };

  const otherLocationIds = getOtherLocationIds();

  const handleTimeTabChange = React.useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      playSound('clickMain');
      setTimeTab(value);
    },
    [timeTab],
  );

  const contractTimePanel = React.useCallback(
    (panel: string) => {
      switch (panel) {
        case 'bid':
          return <BiddingTimePanel contract={contract} />;
        case 'start':
          return <BiddingTimePanel contract={contract} />;
        default:
          return;
      }
    },
    [timeTab, contract],
  );

  const handleActiveTabChange = React.useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      playSound('clickMain');
      setActiveDataTab(value);
    },
    [activeDataTab],
  );

  const activeDataPanel = React.useCallback(
    (panel: string) => {
      switch (panel) {
        case 'contractors':
          return (
            <ContractorsPanel
              contractId={contract.id}
              contractorLimit={contract.contractorLimit}
            />
          );
        case 'ships':
          return;
        default:
          return;
      }
    },
    [activeDataTab, contract],
  );

  const handleSubmitBidPopup = () => {
    playSound('open');
    dispatch(openPopup(POPUP_SUBMIT_CONTRACT_BID, { contract }));
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setOpacity(1);
      const timeoutId = setTimeout(() => setOpacity(0.5), 2000);
      return () => clearTimeout(timeoutId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgb(0,73,130)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '20px',
            background: 'rgb(24,252,252)',
          },
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
              height: '100%',
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
                    {contract && (
                      <SubtypeChip
                        data-testid="ContractPage-Info-ContractInfo-Mobile__Subtype_Chip"
                        subtype={contract.subtype}
                        iconSize="small"
                      />
                    )}
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
                    {contract && (
                      <ContractStatusChip
                        data-testid="ContractPage-Info-ContractInfo__Status_Chip"
                        status={contract.status}
                        sx={{ my: 'auto' }}
                      />
                    )}
                  </DigiDisplay>
                  <UserDisplay userid={contract?.owner_id} />
                </Box>
              </Box>
            )}
            {!mobile && (
              <>
                <DigiDisplay
                  data-testid="ContractPage-Info-ContractInfo__Status_Wrapper"
                  sx={{
                    py: { s: '.8em' },
                    px: { s: '1em', md: '1.5em' },
                  }}
                >
                  <Typography
                    data-testid="ContractPage-Info-ContractInfo__Status_Title"
                    sx={{
                      fontWeight: 'bold',
                      cursor: 'default',
                    }}
                  >
                    Status
                  </Typography>
                  {contract && (
                    <ContractStatusChip
                      data-testid="ContractPage-Info-ContractInfo__Status_Chip"
                      status={contract.status}
                      sx={{ my: 'auto' }}
                      size="medium"
                    />
                  )}
                </DigiDisplay>
                <DigiDisplay
                  data-testid="ContractPage-Info-ContractInfo__Type_Container"
                  sx={{
                    flexDirection: 'row',
                    gap: { s: '1em', md: '2em', lg: '3em', xl: '4em' },
                    px: { s: '1em', md: '1.5em' },
                  }}
                >
                  <DigiField
                    data-testid="ContractPage-Info-ContractInfo-Type__Subtype_Field"
                    label="Contract Subtype"
                    sx={{ py: '.5em' }}
                    slots={{
                      label: {
                        sx: {
                          fontSize: { s: '.7em', md: '.8em', lg: '.9em', xl: '1em' },
                          mb: { s: '.5em', md: '.6em' },
                        },
                      },
                    }}
                  >
                    {contract && (
                      <SubtypeChip
                        data-testid="ContractPage-Info-ContractInfo-Type__Subtype_Chip"
                        subtype={contract.subtype}
                        size="medium"
                      />
                    )}
                  </DigiField>
                  <DigiField
                    data-testid="ContractPage-Info-ContractInfo-Type__Archetype_Field"
                    label="Contract Archetype"
                    sx={{ py: '.5em' }}
                    slots={{
                      label: {
                        sx: {
                          fontSize: { s: '.7em', md: '.8em', lg: '.9em', xl: '1em' },
                          mb: { s: '.5em', md: '.6em' },
                        },
                      },
                    }}
                  >
                    {archetype && (
                      <ArchetypeChip
                        data-testid="ContractPage-Info-ContractInfo-Type__Archetype_Chip"
                        archetype={archetype}
                        size="medium"
                        iconSize="medium"
                      />
                    )}
                  </DigiField>
                </DigiDisplay>
                {!tablet && (
                  <DigiDisplay data-testid="ContractPage-Info-ContractInfo__Pay_Wrapper">
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        cursor: 'default',
                      }}
                    >
                      Pay Info
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: { lg: '3em', xl: '4em' },
                        px: '1.5em',
                        my: 'auto',
                      }}
                    >
                      {contract && (
                        <PayStructure
                          payStructure={contract.payStructure}
                          testid="ContractPage-Info-ContractInfo__PayStructure_Field"
                          slots={{
                            label: {
                              sx: {
                                fontSize: {
                                  s: '.7em',
                                  md: '.8em',
                                  lg: '.9em',
                                  xl: '1em',
                                },
                                mb: { s: '.5em', md: '.6em' },
                              },
                            },
                          }}
                        />
                      )}
                      {contract && (
                        <PayDisplay
                          testid="ContractPage-Info-ContractInfo__DefaultPay_Field"
                          label="Default Pay"
                          pay={contract.defaultPay}
                          slots={{
                            label: {
                              sx: {
                                fontSize: {
                                  s: '.7em',
                                  md: '.8em',
                                  lg: '.9em',
                                  xl: '1em',
                                },
                                mb: { s: '.5em', md: '.6em' },
                              },
                            },
                          }}
                        />
                      )}
                    </Box>
                  </DigiDisplay>
                )}
                <UserDisplay userid={contract?.owner_id} />
              </>
            )}
          </Box>
        </DigiBox>
        {mobile && (
          <DigiBox
            data-testid="ContractPage__Pay&Breifing_Mobile_Wrapper"
            sx={{ my: '1em', p: '.5em' }}
          >
            <DigiDisplay
              data-testid="ContractPage-Pay&Briefing-Mobile__Pay_Wrapper"
              sx={{ mx: 'auto', px: '5%' }}
            >
              <Typography
                data-testid="ContractPage-Pay&Briefing-Mobile__Pay_Title"
                variant="body2"
                sx={{ fontWeight: 'bold' }}
              >
                Pay Info
              </Typography>
              <Box
                daya-testid="ContractPage-Pay&Briefing-Mobile__Fields_Wrapper"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1em',
                  mb: '.5em',
                  mt: '.2em',
                }}
              >
                {contract && (
                  <PayStructure
                    testid="ContractPage-Pay&Briefing-Mobile__PayStructure_Field"
                    payStructure={contract.payStructure}
                  />
                )}
                {contract && (
                  <PayDisplay
                    testid="ContractPage-Pay&Briefing-Mobile__DefaultPay_Field"
                    label="Default Pay"
                    pay={contract.defaultPay}
                    sx={{ minWidth: '90px' }}
                  />
                )}
              </Box>
            </DigiDisplay>
            <DigiDisplay
              data-testid="ContractPage-Pay&Briefing-Mobile__Briefing_Wrapper"
              sx={{
                my: '.5em',
                width: '90%',
                alignSelf: 'center',
                py: '.2em',
                px: '.5em',
              }}
            >
              <Typography
                data-testid="ContractPage-PayBriefing-Mobile__Briefing_Title"
                variant="body2"
                sx={{ fontWeight: 'bold' }}
              >
                Briefing
              </Typography>
              {contract && (
                <Typography
                  data-testid="ContractPage-PayBriefing-Mobile__Briefing_Content"
                  variant="body2"
                  sx={{ color: 'text.primary' }}
                >
                  {contract.briefing}
                </Typography>
              )}
            </DigiDisplay>
          </DigiBox>
        )}
        {!mobile && tablet && (
          <Box
            data-testid="ContractPage__Pay&Briefing&Location_Tablet_Wrapper"
            sx={{
              mt: '1.5em',
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
            }}
          >
            <DigiBox
              data-testid="ContractPage__Pay&Briefing_Tablet_Wrapper"
              sx={{ p: '2em', width: '45%' }}
            >
              <DigiDisplay
                data-testid="ContractPage-Pay&Briefing__Pay_Tablet_Wrapper"
                sx={{ px: '1em', py: '.5em' }}
              >
                <Typography
                  data-testid="ContractPage-Pay&Briefing-Pay-Tablet__Title"
                  sx={{ fontWeight: 'bold' }}
                >
                  Pay Info
                </Typography>
                {contract && (
                  <Box
                    data-testid="ContractPage-Pay&Briefing-Pay-Tablet__Fields_Wrapper"
                    sx={{ display: 'flex', flexDirection: 'row', gap: '2em', my: '.5em' }}
                  >
                    <PayStructure
                      testid="ContractPage-Pay&Briefing-Pay-Tablet-Fields__PayStructure_Field"
                      payStructure={contract.payStructure}
                      slots={{
                        content: {
                          sx: {
                            minWidth: '90px',
                          },
                        },
                        label: {
                          sx: {
                            fontSize: '.9em',
                          },
                        },
                      }}
                    />
                    <PayDisplay
                      testid="ContractPage-Pay&Briefing-Pay-Tablet-Fields__DefaultPay_Field"
                      label="Default Pay"
                      pay={contract.defaultPay}
                      slots={{
                        content: {
                          sx: {
                            minWidth: '90px',
                          },
                        },
                        label: {
                          sx: {
                            fontSize: '.9em',
                          },
                        },
                      }}
                    />
                  </Box>
                )}
              </DigiDisplay>
              <DigiDisplay
                data-testid="ContractPage-Pay&Briefing__Briefing_Tablet_Wrapper"
                sx={{ mt: '2em', px: '1em', py: '.5em' }}
              >
                <Typography
                  data-testid="ContractPage-Pay&Briefing-Briefing"
                  sx={{ fontWeight: 'bold' }}
                >
                  Briefing
                </Typography>
                {contract && (
                  <Typography sx={{ color: 'text.primary' }}>
                    {contract.briefing}
                  </Typography>
                )}
              </DigiDisplay>
            </DigiBox>
            <DigiBox
              data-testid="ContractPage__Location_Tablet_Wrapper"
              sx={{
                p: '2em',
                maxWidth: '40%',
                justifyContent: 'flex-start',
                flexGrow: 1,
              }}
            >
              <DigiDisplay data-testid="ContractPage-Location-Tablet__Title_Wrapper">
                <Typography
                  data-testid="ContractPage-Location-Tablet__Title_Text"
                  sx={{ fontWeight: 'bold' }}
                >
                  Locations
                </Typography>
              </DigiDisplay>
              {contract && contract.Locations && (
                <Box
                  data-testid="ContractPage-Location-Tablet__LocationList_Wrapper"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexGrow: 1,
                    width: '100%',
                  }}
                >
                  <DigiField
                    data-testid="ContractPage-Location-Tablet-LocationList__StartLocation_Wrapper"
                    label="Start Location"
                    sx={{
                      width: '60%',
                      px: '.5em',
                    }}
                    slots={{
                      content: {
                        sx: {
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          my: '.2em',
                        },
                      },
                      typography: {
                        sx: {
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                      },
                      label: {
                        sx: {
                          fontSize: '.8em',
                          fontWeight: 'bold',
                        },
                      },
                    }}
                  >
                    <LocationChip locationId={startLocationId ?? ''} />
                  </DigiField>
                  <DigiField
                    data-testid="ContractPage-Location-Tablet-LocationList__EndLocation_Wrapper"
                    label="End Location"
                    sx={{
                      width: '60%',
                      px: '.5em',
                    }}
                    slots={{
                      content: {
                        sx: {
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          my: '.2em',
                        },
                      },
                      typography: {
                        sx: {
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                      },
                      label: {
                        sx: {
                          fontSize: '.8em',
                          fontWeight: 'bold',
                        },
                      },
                    }}
                  >
                    {endLocationId ? (
                      <LocationChip locationId={endLocationId ?? ''} />
                    ) : (
                      <Typography
                        data-testid="ContractPage-Location-Tablet-LocationList-EndLocation__Missing_Text"
                        variant="body2"
                        sx={{ color: 'info.main' }}
                      >
                        No End Location
                      </Typography>
                    )}
                  </DigiField>
                  <PopupFormSelection
                    data-testid="ContractPage-Location-Tablet-LocationList__OtherLocations_Wrapper"
                    sx={{
                      justifyContent: 'center',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      p: '.5em',
                      width: '60%',
                      alignItems: 'space-around',
                    }}
                  >
                    <Typography
                      data-testid="ContractPage-Location-Tablet-LocationList-OtherLocations__Title"
                      variant="body2"
                      sx={{ fontWeight: 'bold', mb: '.2em' }}
                    >
                      Other Locations
                    </Typography>
                    <Box
                      data-testid="ContractPage-Location-Tablet-LocationList-OtherLocaions__List_Wrapper"
                      ref={scrollRef}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        overflowX: 'auto',
                        gap: '.2em',
                      }}
                    >
                      {otherLocationIds && otherLocationIds.length > 0 ? (
                        <>
                          {otherLocationIds.map((loc) => (
                            <LocationChip key={loc} locationId={loc} />
                          ))}
                        </>
                      ) : (
                        <Typography>No Other Locations</Typography>
                      )}
                    </Box>
                  </PopupFormSelection>
                </Box>
              )}
              {contract && (!contract.Locations || contract.Locations.length === 0) && (
                <Typography variant="error">
                  Contract Missing Start Location. Please report error.
                </Typography>
              )}
            </DigiBox>
          </Box>
        )}
        {mobile && (
          <DigiBox
            data-testid="ContractPage__Location_Mobile_Wrapper"
            sx={{
              p: '.5em',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <DigiDisplay
              data-testid="ContractPage-Location-Mobile__Title_Wrapper"
              sx={{ width: '80%', mb: '.5em' }}
            >
              <Typography
                data-testid="ContractPage-Location-Mobile__Title_Text"
                variant="body2"
                sx={{ fontWeight: 'bold' }}
              >
                Locations
              </Typography>
            </DigiDisplay>
            {contract && contract.Locations && (
              <Box
                data-testid="ContractPage-Location-Mobile__LocationList_Wrapper"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                  gap: '.5em',
                  my: '.5em',
                }}
              >
                <DigiField
                  data-testid="ContractPage-Location-Mobile-LocationList__StartLocation_Wrapper"
                  label="Start Location"
                  sx={{
                    width: '60%',
                    px: '.5em',
                  }}
                  slots={{
                    content: {
                      sx: {
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        my: '.2em',
                      },
                    },
                    typography: {
                      sx: {
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    },
                    label: {
                      sx: {
                        fontSize: '.8em',
                        fontWeight: 'bold',
                      },
                    },
                  }}
                >
                  <LocationChip locationId={startLocationId ?? ''} />
                </DigiField>
                <DigiField
                  data-testid="ContractPage-Location-Mobile-LocationList__EndLocation_Wrapper"
                  label="End Location"
                  sx={{
                    width: '60%',
                    px: '.5em',
                  }}
                  slots={{
                    content: {
                      sx: {
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        my: '.2em',
                      },
                    },
                    typography: {
                      sx: {
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    },
                    label: {
                      sx: {
                        fontSize: '.8em',
                        fontWeight: 'bold',
                      },
                    },
                  }}
                >
                  {endLocationId ? (
                    <LocationChip locationId={endLocationId ?? ''} />
                  ) : (
                    <Typography
                      data-testid="ContractPage-Location-Mobile-LocationList-EndLocation__Missing_Text"
                      variant="body2"
                      sx={{ color: 'info.main' }}
                    >
                      No End Location
                    </Typography>
                  )}
                </DigiField>
                <PopupFormSelection
                  data-testid="ContractPage-Location-Mobile-LocationList__OtherLocations_Wrapper"
                  sx={{
                    justifyContent: 'center',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    p: '.5em',
                    width: '60%',
                    alignItems: 'space-around',
                  }}
                >
                  <Typography
                    data-testid="ContractPage-Location-Mobile-LocationList-OtherLocations__Title"
                    variant="body2"
                    sx={{ fontWeight: 'bold', mb: '.2em' }}
                  >
                    Other Locations
                  </Typography>
                  <Box
                    data-testid="ContractPage-Location-Mobile-LocationList-OtherLocaions__List_Wrapper"
                    ref={scrollRef}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                      overflowX: 'auto',
                      gap: '.2em',
                    }}
                  >
                    {otherLocationIds && otherLocationIds.length > 0 ? (
                      <>
                        {otherLocationIds.map((loc) => (
                          <LocationChip key={loc} locationId={loc} />
                        ))}
                      </>
                    ) : (
                      <Typography variant="body2">No Other Locations</Typography>
                    )}
                  </Box>
                </PopupFormSelection>
              </Box>
            )}
            {contract && (!contract.Locations || contract.Locations.length === 0) && (
              <Typography variant="error">
                Contract Missing Start Location. Please report error.
              </Typography>
            )}
          </DigiBox>
        )}
        {(mobile || tablet) && contract && (
          <Box
            data-testid="ContractPage__TimePanel_Small_Wrapper"
            sx={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              my: { xs: '1em', sm: '1.5em', md: '2em' },
            }}
          >
            <ControlPanelBox
              data-testid="ContractPage-TimePanel-Small__Tab_Wrapper"
              sx={{
                width: { xs: '100%', sm: '90%', md: '75%' },
                mx: 'auto',
                display: 'block',
                mb: { xs: '.5em', sm: '1em', md: '1.5em' },
              }}
            >
              <SmallTabsHolo
                data-testid="ContractPage-TimePanel-Small__Tab_List"
                variant="fullWidth"
                value={timeTab}
                onChange={handleTimeTabChange}
                textColor="secondary"
                indicatorColor="secondary"
              >
                <SmallTabHolo label="Bidding Time" value="bid" />
                <SmallTabHolo label="Contract Duration" value="start" />
              </SmallTabsHolo>
            </ControlPanelBox>
            <DigiBox data-testid="ContractPage-TimePanel-Small__Tab_List">
              {contractTimePanel(timeTab)}
            </DigiBox>
          </Box>
        )}
        {(mobile || tablet) && contract && (
          <Box
            data-testid="ContractPage__ActiveData_Small_Wrapper"
            sx={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              my: { xs: '1em', sm: '1.5em', md: '2em' },
            }}
          >
            <ControlPanelBox
              data-testid="ContractPage-ActiveData-Small__Tab_Wrapper"
              sx={{
                width: { xs: '100%', sm: '90%', md: '75%' },
                mx: 'auto',
                display: 'block',
                mb: { xs: '.5em', sm: '1em', md: '1.5em' },
              }}
            >
              <SmallTabsHolo
                data-testid="ContractPage-ActiveData-Small__Tab_List"
                variant="fullWidth"
                value={activeDataTab}
                onChange={handleActiveTabChange}
                textColor="secondary"
                indicatorColor="secondary"
              >
                <SmallTabHolo label="Contractors" value="contractors" />
                <SmallTabHolo label="Ships" value="ships" />
              </SmallTabsHolo>
            </ControlPanelBox>
            <DigiBox data-testid="ContractPage-ActiveData-Small__Panel_Container">
              {activeDataPanel(activeDataTab)}
            </DigiBox>
          </Box>
        )}
        {(mobile || tablet) && contract && (
          <Box data-testid="ContractPage__ContractController_Small_Wrapper">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              onClick={handleSubmitBidPopup}
            >
              Submit Bid
            </Button>
          </Box>
        )}
        {mobile && (
          <Box
            data-testid="ContractPage__Mobile_ReturnButton_Wrapper"
            sx={{
              position: 'sticky',
              bottom: 0,
              left: 0,
              opacity: opacity,
              transition: 'opacity 0.5s ease-in-out',
              zIndex: '50',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                playSound('navigate');
                navigate(-1);
              }}
              startIcon={<ArrowBackIosNew />}
            >
              Return
            </Button>
          </Box>
        )}
      </GlassBox>
    </VLViewport>
  );
};
