import './contractDetails.scss';

import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import {
  Autocomplete,
  Box,
  Chip,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';
import { POPUP_ARCHETYPE_INFO } from '@Popups/Info/Archetypes';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useHorizontalAdvancedScroll } from '@Utils/horizontalScroll';
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

  const scrollRef = useHorizontalAdvancedScroll();

  const archetypeOptions = contractArchetypes('');

  const handleArchetypeSelect = React.useCallback(
    (selectedArchetype: string) => {
      if (archetype === selectedArchetype) {
        setArchetype(null);
      } else {
        setArchetype(selectedArchetype);
      }
    },
    [archetype],
  );
  // React.useEffect(() => {
  //   const selectedOption = options.find((option) =>
  //     option.subTypes.some((subType) => subType.value === formData.subtype),
  //   );
  //   if (selectedOption) {
  //     setArchetype(selectedOption.archetype);
  //   } else {
  //     setArchetype(null);
  //   }
  // }, [formData.subtype]);

  const handleArchetypeOpen = () => {
    dispatch(openPopup(POPUP_ARCHETYPE_INFO, { option: archetype }));
  };

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
              formData.briefing?.length == 2048 ? 'Character Limit Reached' : ''
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
            <Box
              data-testid="ContractDetails-Form__ArchetypeSelect_Wrapper"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderLeft: '2px solid',
                borderRight: '2px solid',
                borderColor: 'rgb(0,30,100)',
                borderRadius: '5px',
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
                }}
              >
                Contract Archetype
              </Typography>
              {/* Icon Button when Archetype is selected to pull up Archetype Open Popup */}
              <Box
                data-testid="ContractDetails-Form-ArchetypeSelect__SelectScroll_Wrapper"
                component="div"
                ref={scrollRef}
                className="SelectScrollWrapper"
              >
                {archetypeOptions.map((option) => (
                  <Chip
                    key={option.archetype}
                    icon={option.archetypeIcon}
                    variant="filled"
                    label={option.archetype}
                    color="primary"
                    onClick={() => handleArchetypeSelect(option.archetype)}
                    sx={{
                      transition:
                        'transform 0.2s ease-in-out, backgroundImage 0.3s ease-in-out, boxShadow 0.3s ease, borderColor 0.3s ease',
                      transformStyle: 'preserve-3d',
                      transform: 'rotateY(0deg) scale(1)',
                      flexShrink: '0',
                      mb: '.5em',
                      backgroundImage:
                        archetype === option.archetype
                          ? 'linear-gradient(145deg, rgba(0,120,235,0.8), rgba(0,100,220,1))'
                          : 'linear-gradient(145deg, rgba(8,22,120,0.3), rgba(0,30,100,0.5))',
                      color:
                        archetype === option.archetype
                          ? 'rgba(24,252,252,.75)'
                          : 'rgba(33,150,243,.5)',
                      border: '1px solid',
                      borderColor:
                        archetype === option.archetype
                          ? 'rgba(25,150,200)'
                          : 'rgba(8,22,130,1)',
                      boxShadow:
                        archetype === option.archetype
                          ? '0 2px 5px 3px rgba(0,30,140)'
                          : '0 2px 4px rgba(0,0,0,0.2)',
                      '&:hover': {
                        backgroundImage:
                          archetype === option.archetype
                            ? 'linear-gradient(145deg, rgba(0,120,235,0.6), rgba(0,100,220,.8))'
                            : 'linear-gradient(145deg, rgba(8,22,120,0.6), rgba(0,30,100,0.9))',
                        color:
                          archetype === option.archetype
                            ? 'rgba(24,252,252,.88)'
                            : 'rgba(33,150,243)',
                        boxShadow:
                          archetype === option.archetype
                            ? '0 4px 8px 4px rgba(0,30,140)'
                            : '0 4px 8px rgba(0, 0, 0, 0.3)',
                      },
                      '&:active': {
                        backgroundImage:
                          archetype === option.archetype
                            ? 'linear-gradient(145deg, rgba(0,75,185,0.4), rgba(0,45,145,.5))'
                            : 'linear-gradient(145deg, rgba(8,22,120,0.7), rgba(0,30,100,1))',
                        boxShadow:
                          archetype === option.archetype
                            ? '0 4px 12px 8px rgba(0,30,140)'
                            : '0 6px 12px rgba(0, 0, 0, 0.4)',
                        color: archetype === option.archetype ? 'rgba(24,252,252)' : '',
                        textShadow:
                          archetype === option.archetype
                            ? '0 0px 5px rgba(145,250,255)'
                            : '',
                        transform: 'translateY(2px)',
                      },
                      '& .MuiTouchRipple-child': {
                        backgroundColor:
                          archetype === option.archetype
                            ? 'rgba(25,150,200)'
                            : 'rgba(6,86,145,0.8)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
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
