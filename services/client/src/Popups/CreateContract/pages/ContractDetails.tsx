import './contractDetails.scss';

import PopupFormSelection from '@Common/Components/Boxes/PopupFormSelection';
import ArchetypeListChip from '@Common/Components/Chips/ArchetypeListChip';
import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { HelpOutline } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { POPUP_ARCHETYPE_INFO } from '@Popups/Info/Archetypes';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useHorizontalAdvancedScroll } from '@Utils/horizontalScroll';
import { Logger } from '@Utils/Logger';
import React from 'react';
import { ICreateContractBody } from 'vl-shared/src/schemas/ContractSchema';
import { IContractSubType } from 'vl-shared/src/schemas/ContractSubTypeSchema';

//Set Options to Contract Archetypes Object
const options = contractArchetypes('secondary.main');

const optionsMap: Record<string, { label: string; group: string }> = {};
const flatOptions = options.flatMap((option) =>
  option.subTypes.map((subType) => {
    optionsMap[subType.value] = { group: option.archetype, label: subType.label };
    return subType.value;
  }),
);
export const ContractDetails: React.FC<{
  formData: ICreateContractBody;
  setFormData: React.Dispatch<React.SetStateAction<ICreateContractBody>>;
}> = (props) => {
  const dispatch = useAppDispatch();
  const { formData, setFormData } = props;
  const [archetype, setArchetype] = React.useState<string | null>(null);
  const [filteredSubtypes, setFilteredSubtypes] = React.useState<string[]>(flatOptions);
  const [selectedSubtype, setSelectedSubtype] = React.useState<string | null>(
    formData.subtype,
  );

  const scrollRef = useHorizontalAdvancedScroll();

  const archetypeOptions = contractArchetypes('');

  const handleArchetypeSelect = React.useCallback(
    (selectedArchetype: string) => {
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
    [archetype, flatOptions, optionsMap, setArchetype, setFilteredSubtypes],
  );

  const handleArchetypeOpen = () => {
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
    [setFormData, selectedSubtype, setSelectedSubtype, archetype, setArchetype, formData],
  );

  const toggleEmergencyMode = React.useCallback(() => {
    Logger.info(formData.isEmergency);
    if (formData.isEmergency) {
      setFormData({ ...formData, isEmergency: false });
    } else {
      setFormData({
        ...formData,
        isEmergency: true,
        bidDate: undefined,
        startDate: undefined,
        endDate: undefined,
      });
    }
  }, [formData, setFormData]);

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
        minWidth: '400px',
        my: '1em',
      }}
    >
      <FormControl
        data-testid="CreateContract-ContractDetails__FormWrapper"
        sx={{ display: 'flex', flexDirection: 'row', gap: '2em' }}
      >
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
            onChange={(e) => setFormData({ ...formData, title: e.currentTarget.value })}
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
            onChange={(e) =>
              setFormData({ ...formData, briefing: e.currentTarget.value })
            }
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
              formData.briefing?.length >= 2048 ? 'Character Limit Reached' : ''
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
          sx={{ display: 'flex', flexDirection: 'column' }}
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
                borderTop: '1px solid rgb(0,30,100)',
                borderBottom: '1px solid rgb(0,30,100)',
                pt: '.2em',
                boxShadow: '0 0 10px 3px rgb(0,30,100)',
                backgroundImage:
                  'linear-gradient(145deg, rgba(0,73,130,.3), rgba(8,22,80,0.77))',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  borderColor: 'secondary.main',
                  borderTop: '1px solid rgb(0,30,100)',
                  borderBottom: '1px solid rgb(0,30,100)',
                  boxShadow: '0 0 10px 5px rgb(0,30,100)',
                },
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
                {archetypeOptions.map((option) => (
                  <ArchetypeListChip
                    key={option.archetype}
                    icon={option.archetypeIcon}
                    variant="filled"
                    label={option.archetype}
                    color="primary"
                    onClick={() => handleArchetypeSelect(option.archetype)}
                    isSelected={option.archetype == archetype}
                    sx={{
                      mb: '.7em',
                    }}
                  />
                ))}
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
            onChange={(_, value) => updateSubtype(value)}
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
          <Autocomplete
            data-testid="CreateContract__Subtype-AutoComplete"
            options={flatOptions}
            value={formData.subtype}
            groupBy={(option) => optionsMap[option].group}
            getOptionLabel={(option) => optionsMap[option].label}
            renderInput={(params) => (
              <TextField {...params} label="SubType" size="small" />
            )}
            onChange={(_e, newValue) => {
              setFormData({
                ...formData,
                subtype: (newValue as IContractSubType) ?? '',
              });
            }}
            fullWidth
            sx={{ mt: 2, mb: '1em', maxWidth: '300px' }}
          />
        </Box>
      </FormControl>
    </Box>
  );
};
