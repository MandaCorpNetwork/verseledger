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
const options = contractArchetypes;

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
                borderColor: 'secondary.main',
                borderRadius: '5px',
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
                }}
              >
                Contract Archetype
              </Typography>
              {/* Icon Button when Archetype is selected to pull up Archetype Open Popup */}
              <Box
                data-testid="ContractDetails-Form-ArchetypeSelect__SelectScroll_Wrapper"
                component="div"
                ref={scrollRef}
                sx={{
                  display: 'flex',
                  overflowX: 'auto',
                  width: '100%',
                  '&::-webkit-scrollbar': {
                    height: '6px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(0,73,130,0)',
                    borderRadius: '10px',
                    transition: 'background 0.3s ease',
                  },
                  '&::-webkit-scrollbar-track:active': {
                    background: 'rgba(0,73,130,.8)',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    borderRadius: '20px',
                    background: 'rgba(24,252,252,0)',
                    transition: 'background 0.3s ease',
                  },
                }}
              >
                {options.map((option) => (
                  <Chip
                    key={option.archetype}
                    icon={option.archetypeIcon}
                    variant="outlined"
                    label={option.archetype}
                    sx={{
                      mx: '.5em',
                      mb: '.5em',
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
};
