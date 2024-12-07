import { DigiBox } from '@CommonLegacy/Components/Boxes/DigiBox';
import DigiDisplay from '@CommonLegacy/Components/Boxes/DigiDisplay';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { Box, Button, TextField, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

import { PowerConfig, TuningConfig, TuningOption } from './TuningEditor';

type TuningSetupProps = {
  tuningSetup: TuningConfig;
  setConfig: React.Dispatch<React.SetStateAction<TuningConfig>>;
};

type TuningTypes =
  | 'Power'
  | 'Weapons'
  | 'Thrusters'
  | 'Shields'
  | 'LifeSupport'
  | 'Scanner'
  | 'Cooler'
  | 'QuantumDrive';

export const TuningSetup: React.FC<TuningSetupProps> = ({ tuningSetup, setConfig }) => {
  const getCurrentComponentTypes = React.useCallback(
    (tuningOptions: TuningOption[]): string[] => {
      const uniqueTypes = new Set<string>();
      tuningOptions.forEach((option) => uniqueTypes.add(option.type));
      return Array.from(uniqueTypes);
    },
    [],
  );
  const currentComponentTypes = getCurrentComponentTypes(tuningSetup.tuningOptions);
  const handleAddOption = React.useCallback(
    (type: TuningTypes) => {
      setConfig((prevConfig) => {
        if (type === 'Power') {
          const newPowerConfig: PowerConfig = {
            active: false,
            totalPips: 5,
            assignedPips: 0,
            id: prevConfig.powerConfig.length + 1,
          };
          return {
            ...prevConfig,
            powerConnfig: [...prevConfig.powerConfig, newPowerConfig],
          };
        } else {
          const optionsOfType = prevConfig.tuningOptions.filter(
            (option) => option.type === type,
          );
          const newTuningOption: TuningOption = {
            active: false,
            totalPips: 5,
            assignedPips: 0,
            minimumPips: 0,
            id: optionsOfType.length + 1,
            type,
          };
          return {
            ...prevConfig,
            tuningOptions: [...prevConfig.tuningOptions, newTuningOption],
          };
        }
      });
    },
    [setConfig],
  );

  const numericFilter = React.useCallback((value: string) => {
    const filteredValue = value.replace(/[^0-9]/g, ''); // Allow only digits
    if (value !== filteredValue) {
      enqueueSnackbar('Please only use Numbers', { variant: 'error' });
    }
    return filteredValue; // Return filtered value
  }, []);

  const handleEditPipOutliers = React.useCallback(
    (outlier: 'max' | 'min', value: string, type: TuningTypes, id: number) => {
      const filteredValue = numericFilter(value);
      const numericValue = filteredValue ? Number(filteredValue) : 0;
      if (outlier === 'min' && type === 'Power')
        return enqueueSnackbar(`Minimum can't be set for Power`, { variant: 'error' });
      setConfig((prevConfig) => {
        if (type === 'Power') {
          const updatedPowerConfig = prevConfig.powerConfig.map(
            (configItem: PowerConfig) => {
              if (configItem.id === id) {
                return {
                  ...configItem,
                  totalPips: outlier === 'max' ? numericValue : configItem.totalPips,
                };
              }
              return configItem;
            },
          );
          return {
            ...prevConfig,
            powerConfig: updatedPowerConfig,
          };
        } else {
          const updatedTuningOption = prevConfig.tuningOptions.map((option) => {
            if (option.id === id && option.type === type) {
              return {
                ...option,
                totalPips: outlier === 'max' ? numericValue : option.totalPips,
                minimumPips: outlier === 'min' ? numericValue : option.minimumPips,
              };
            }
            return option;
          });
          return {
            ...prevConfig,
            tuningOptions: updatedTuningOption,
          };
        }
      });
    },
    [numericFilter, setConfig],
  );
  const handleRemoveOption = React.useCallback(
    (type: TuningTypes, id: number) => {
      setConfig((prevConfig) => {
        if (type === 'Power') {
          const updatedPowerConfig = prevConfig.powerConfig.filter(
            (config) => config.id !== id,
          );
          return {
            ...prevConfig,
            powerConfig: updatedPowerConfig,
          };
        } else {
          const updatedTuningOptions = prevConfig.tuningOptions.filter(
            (option) => option.id !== id || option.type !== type,
          );
          return {
            ...prevConfig,
            tuningOptions: updatedTuningOptions,
          };
        }
      });
    },
    [setConfig],
  );
  return (
    <FeatureDisplay
      data-testid="ShipTuning-TuningEditor__ConfigSetup_Wrapper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: '1em',
        background: 'linear-gradient(135deg, rgba(14,35,141,.5), rgba(0,1,19,.5))',
        gap: '.5em',
        overflow: 'auto',
        width: '100%',
        mt: 'auto',
      }}
    >
      <DigiBox
        data-testid="ShipTuning-TuningEditor-ConfigSetup__PowerSetup_Wrapper"
        sx={{ p: '.5em', display: 'flex', flexDirection: 'column', gap: '.2em' }}
      >
        <DigiDisplay
          data-testid="ShipTuning-TuningEditor-ConfigSetup-ComponentsSetup__TitleBar_Wrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            py: '.2em',
          }}
        >
          <Typography data-testid="ShipTuning-TuningEditor-ConfigSetup-PowerSetup-TitleBar__Title">
            Power Setup
          </Typography>
          <Button
            data-testid="ShipTuning-TuningEditor-ConfigSetup-PowerSetup-TitleBar__AddSupply_Button"
            color="secondary"
            size="small"
            variant="outlined"
            onClick={() => handleAddOption('Power')}
          >
            Add Supply
          </Button>
        </DigiDisplay>
        <DigiDisplay
          data-testid="ShipTuning-TuningEditor-ConfigSetup-ComponentsSetup__SetupList_Wrapper"
          sx={{ display: 'flex', flexDirection: 'column', gap: '.5em', p: '.5em' }}
        >
          {tuningSetup.powerConfig?.map((config) => (
            <Box
              key={config.id}
              data-testid={`ShipTuning-TuningEditor-ConfigSetup-PowerSetup__ComponentOption_Power${config.id}_Wrapper`}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                px: '.5em',
              }}
            >
              <Typography
                data-testid={`ShipTuning-TuningEditor-ConfigSetup-PowerSetup-ComponentOption-Power${config.id}_ID`}
              >
                {config.id}.
              </Typography>
              <TextField
                data-testid={`ShipTuning-TuningEditor-ConfigSetup-PowerSetup-ComponentOption-Power${config.id}__MaxField`}
                label="Max Pips"
                size="small"
                color="secondary"
                value={config.totalPips}
                onChange={(e) =>
                  handleEditPipOutliers('max', e.target.value, 'Power', config.id)
                }
              />
              <Button
                data-testid={`ShipTuning-TuningEditor-ConfigSetup-PowerSetup-ComponentOption-Power${config.id}__RemoveOption_Button`}
                variant="outlined"
                size="small"
                color="error"
                onClick={() => handleRemoveOption('Power', config.id)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </DigiDisplay>
      </DigiBox>
      <DigiBox
        data-testid="ShipTuning-TuningEditor-ConfigSetup__ComponentsSetup_Wrapper"
        sx={{ p: '.5em', display: 'flex', flexDirection: 'column', gap: '.2em' }}
      >
        <DigiDisplay
          data-testid="ShipTuning-TuningEditor-ConfigSetup-ComponentsSetup__TitleBar_Wrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            py: '.2em',
          }}
        >
          <Typography data-testid="ShipTuning-TuningEditor-ConfigSetup-ComponentsSetup__Title">
            Components Setup
          </Typography>
          <Button
            data-testid="ShipTuning-TuningEditor-ConfigSetup-ComponentsSetup__ComponentAdd_Button"
            color="secondary"
            size="small"
            variant="outlined"
          >
            Add Component
          </Button>
        </DigiDisplay>
        <DigiDisplay
          data-testid="ShipTuning-TuningEditor-ConfigSetup-ComponentsSetup__ComponentList_Wrapper"
          sx={{ display: 'flex', flexDirection: 'column', gap: '.5em', p: '.5em' }}
        >
          {currentComponentTypes.map((value) => (
            <Box
              key={value}
              data-testid={`ShipTuning-TuningEditor-ConfigSetup-ComponentsSetup-ComponentList__${value}_Wrapper`}
            >
              <Typography
                data-testid={`ShipTuning-TuningEditor-ConfigSetup-ComponentsSetup-ComponentList-${value}_Title`}
                sx={{
                  mb: '.2em',
                }}
              >
                {value}
              </Typography>
              <Box
                data-testid={`ShipTuning-TuningEditor-ConfigSetup-ComponentsSetup-ComponentList-${value}__ComponentList_Wrapper`}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.2em',
                }}
              >
                {tuningSetup.tuningOptions
                  .filter((option) => option.type === value)
                  .map((option) => (
                    <Box
                      key={option.id}
                      data-testid={`ShipTuning-TuningEditor-ConfigSetup-ComponentsSetup-ComponentList-${value}-ComponentList__${value}${option.id}_Config_Wrapper`}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <Typography
                        data-testid={`ShipTuning-TuningEditor-ConfigSetup-ComponentsSetup-ComponentList-${value}-ComponentList-${value}${option.id}-Config__Id`}
                      >
                        {option.id}.
                      </Typography>
                      <TextField
                        data-testid={`ShipTuning-TuningEditor-ConfigSetup-ComponentsSetup-ComponentList-${value}-ComponentList-${value}${option.id}-Config__MaxPips_Field`}
                        size="small"
                        color="secondary"
                        variant="outlined"
                        onChange={(e) =>
                          handleEditPipOutliers(
                            'max',
                            e.target.value,
                            option.type,
                            option.id,
                          )
                        }
                        value={option.totalPips}
                        label="Max Pips"
                        sx={{}}
                      />
                      <TextField
                        data-testid={`ShipTuning-TuningEditor-ConfigSetup-ComponentsSetup-ComponentList-${value}-ComponentList-${value}${option.id}-Config__MinPips_Field`}
                        size="small"
                        color="secondary"
                        variant="outlined"
                        onChange={(e) =>
                          handleEditPipOutliers(
                            'min',
                            e.target.value,
                            option.type,
                            option.id,
                          )
                        }
                        value={option.minimumPips}
                        label="Min Pips"
                        sx={{}}
                      />
                      <Button
                        data-testid={`ShipTuning-TuningEditor-ConfigSetup-ComponentsSetup-ComponentList-${value}-ComponentList-${value}${option.id}-Config__Remove_Button`}
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleRemoveOption(option.type, option.id)}
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}
              </Box>
            </Box>
          ))}
        </DigiDisplay>
      </DigiBox>
    </FeatureDisplay>
  );
};
