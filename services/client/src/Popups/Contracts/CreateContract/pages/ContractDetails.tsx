import '@Assets/Css/contractDetails.css';

import { useSoundEffect } from '@Audio/AudioManager';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { PopupFormSelection } from '@CommonLegacy/Components/Boxes/PopupFormSelection';
import ArchetypeListChip from '@CommonLegacy/Components/Chips/ArchetypeListChip';
import { HelpOutline } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  SvgIcon,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { POPUP_ARCHETYPE_INFO } from '@Popups/Info/Archetypes';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useHorizontalAdvancedScroll } from '@Utils/horizontalScroll';
import { useIsMobile } from '@Utils/isMobile';
import { Logger } from '@Utils/Logger';
import React from 'react';
import type { ICreateContractBody } from 'vl-shared/src/schemas/contracts/ContractSchema';
import type { IContractSubType } from 'vl-shared/src/schemas/contracts/ContractSubTypeSchema';

const optionsMap: Record<string, { label: string; group: string }> = {};
const flatOptions = contractArchetypes.flatMap((option) =>
  option.subtypes.map((subtype) => {
    optionsMap[subtype.value] = { group: option.archetype, label: subtype.label };
    return subtype.value;
  }),
);
export const ContractDetails: React.FC<{
  formData: Partial<ICreateContractBody> | ICreateContractBody;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ICreateContractBody>>>;
}> = (props) => {
  const sound = useSoundEffect();
  const dispatch = useAppDispatch();
  const mobile = useIsMobile();
  const { formData, setFormData } = props;
  const [archetype, setArchetype] = React.useState<string | null>(null);
  const [filteredSubtypes, setFilteredSubtypes] = React.useState<string[]>(flatOptions);
  const [selectedSubtype, setSelectedSubtype] = React.useState<string | null>(
    formData.subtype ?? null,
  );

  const scrollRef = useHorizontalAdvancedScroll();

  const handleArchetypeSelect = React.useCallback(
    (selectedArchetype: string) => {
      sound.playSound('clickMain');
      if (archetype === selectedArchetype) {
        setArchetype(null);
        setFilteredSubtypes(flatOptions);
      } else {
        setArchetype(selectedArchetype);
        const filteredSubtypes = flatOptions.filter((subtype) => {
          const { group } = optionsMap[subtype];
          return group === selectedArchetype;
        });
        setFilteredSubtypes(filteredSubtypes);
      }
    },
    [archetype, sound],
  );

  const handleArchetypeOpen = () => {
    sound.playSound('open');
    dispatch(openPopup(POPUP_ARCHETYPE_INFO, { option: archetype }));
  };

  const updateSubtype = React.useCallback(
    (newValue: string | null) => {
      if (newValue !== null) {
        const subtypeArchetype = optionsMap[newValue].group;
        if (archetype !== subtypeArchetype) {
          setArchetype(subtypeArchetype);
        }
        setFormData((formData) => ({
          ...formData,
          subtype: newValue as IContractSubType,
        }));
        setSelectedSubtype(newValue);
      } else {
        setSelectedSubtype(newValue);
      }
    },
    [setFormData, setSelectedSubtype, archetype, setArchetype],
  );

  const toggleEmergencyMode = React.useCallback(() => {
    Logger.info(formData.isEmergency);
    if (formData.isEmergency) {
      sound.playSound('close');
      setFormData({ ...formData, isEmergency: false });
    } else {
      sound.playSound('warning');
      setFormData({
        ...formData,
        isEmergency: true,
        bidDate: undefined,
        startDate: undefined,
        endDate: undefined,
      });
    }
  }, [formData, sound, setFormData]);

  const checkEmergencyAvailable = () => {
    if (
      formData.subtype == 'Transport' ||
      formData.subtype == 'Trauma' ||
      formData.subtype == 'Escort' ||
      formData.subtype == 'QRF' ||
      formData.subtype == 'Refuel' ||
      formData.subtype == 'Rearm' ||
      formData.subtype == 'Repair' ||
      formData.subtype == 'Middleman' ||
      formData.subtype == 'Redacted'
    ) {
      return true;
    } else {
      return false;
    }
  };

  const emergencyAvailable = checkEmergencyAvailable();

  return (
    <Box
      data-testid="CreateContract__ContractDetails_Container"
      sx={{
        display: 'flex',
        minWidth: { xs: '100%', md: '400px' },
        my: '1em',
        justifyContent: { xs: 'center', md: 'flex-start' },
      }}
    >
      <FormControl
        data-testid="CreateContract-ContractDetails__FormWrapper"
        sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '2em' }}
      >
        {mobile && <FormLabel>Contract Details</FormLabel>}
        <Box
          data-testid="ContractDetails-Form__LeftBox"
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.8em' }}
        >
          <TextField
            data-testid="ContractDetails-Form__TitleField"
            label="Title"
            color={formData.title?.length == 32 ? 'error' : 'secondary'}
            inputProps={{ maxLength: 32 }}
            fullWidth
            onChange={(e) => {
              setFormData({ ...formData, title: e.currentTarget.value });
              if (e.currentTarget.value.length === 32) {
                sound.playSound('warning');
              }
            }}
            value={formData.title ?? ''}
            sx={{ width: '300px' }}
            helperText={formData.title?.length == 32 ? 'Character Limit Reached' : ''}
            FormHelperTextProps={{
              sx: {
                color: 'info.main',
              },
            }}
          />
          <TextField
            data-testid="ContractDetails-Form__BriefingField"
            multiline={true}
            rows={4}
            onChange={(e) => {
              setFormData({ ...formData, briefing: e.currentTarget.value });
              if (e.currentTarget.value.length === 2048) {
                sound.playSound('warning');
              }
            }}
            value={formData.briefing}
            label="Briefing"
            color={formData.briefing?.length == 2048 ? 'error' : 'secondary'}
            fullWidth
            size="small"
            inputProps={{
              maxLength: 2048,
              sx: {
                '&::-webkit-scrollbar': {
                  width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(0,73,130,.8)',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '20px',
                  background: 'rgb(24,252,252)',
                },
              },
            }}
            sx={{
              width: '300px',
            }}
            helperText={
              (formData.briefing?.length ?? 0) >= 2048 ? 'Character Limit Reached' : ''
            }
            FormHelperTextProps={{
              sx: {
                color: 'info.main',
              },
            }}
          />
        </Box>
        <Box
          data-testid="ContractDetails-Form__RightBox"
          sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          <Box
            data-testid="ContractDetails-Form__ArchetypeSelect_Container"
            sx={{ display: 'flex', flexDirection: 'row', width: '300px' }}
          >
            <PopupFormSelection
              data-testid="ContractDetails-Form__ArchetypeSelect_Wrapper"
              sx={{
                flexDirection: 'column',
                width: '100%',
                overflow: 'hidden',
              }}
            >
              <Typography
                data-testid="ContractDetails-Form__ArchetypeSelect_Label"
                align="center"
                sx={{
                  fontWeight: 'bold',
                  color: 'text.secondary',
                  mb: '.5em',
                  textShadow: '0 0 10px rgb(0,73,130)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                Contract Archetype
                {archetype && (
                  <Tooltip title="Details" arrow>
                    <IconButton
                      size="small"
                      color="info"
                      sx={{ position: 'absolute', right: '-1' }}
                      onClick={() => handleArchetypeOpen()}
                    >
                      <HelpOutline fontSize="small" color="info" />
                    </IconButton>
                  </Tooltip>
                )}
              </Typography>

              <Box
                data-testid="ContractDetails-Form-ArchetypeSelect__SelectScroll_Wrapper"
                component="div"
                ref={scrollRef}
                className="SelectScrollWrapper"
              >
                {contractArchetypes.map((option) => {
                  const ArchetypeIcon = option.archetypeIcon;

                  return (
                    <ArchetypeListChip
                      key={option.archetype}
                      icon={<SvgIcon component={ArchetypeIcon} />}
                      variant="filled"
                      label={option.archetype}
                      color="primary"
                      onClick={() => handleArchetypeSelect(option.archetype)}
                      isSelected={option.archetype == archetype}
                      sx={{
                        mb: '.7em',
                      }}
                    />
                  );
                })}
              </Box>
            </PopupFormSelection>
          </Box>
          <Autocomplete
            data-testid="CreateContract__Subtype-AutoComplete"
            options={filteredSubtypes}
            freeSolo
            value={selectedSubtype}
            groupBy={(option) => optionsMap[option].group}
            getOptionLabel={(option) => optionsMap[option].label}
            renderInput={(params) => (
              <TextField {...params} color="secondary" label="SubType" size="small" />
            )}
            onChange={(_, value) => {
              updateSubtype(value);
              sound.playSound('clickMain');
            }}
            fullWidth
            sx={{ mt: 2, mb: '1em', maxWidth: '300px' }}
          />
          <Box
            data-testid="EmergencyButton-Wrapper"
            sx={{
              my: 'auto',
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={toggleEmergencyMode}
              disabled={!emergencyAvailable}
              sx={{ mb: '.5em' }}
            >
              Emergency
            </Button>
            {formData.isEmergency && (
              <Typography align="center" variant="tip" sx={{ px: '1em' }}>
                Emergency Mode disables some features.
              </Typography>
            )}
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
};
