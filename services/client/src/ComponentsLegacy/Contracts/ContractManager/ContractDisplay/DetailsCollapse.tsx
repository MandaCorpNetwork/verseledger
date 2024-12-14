import { useSoundEffect } from '@Audio/AudioManager';
import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import { ContractStatusChip } from '@CommonLegacy/Components/Chips/ContractStatusChip';
import { SubtypeChip } from '@CommonLegacy/Components/Chips/SubtypeChip';
import { PayDisplay } from '@CommonLegacy/Components/Custom/DigiField/PayDisplay';
import { PayStructure } from '@CommonLegacy/Components/Custom/DigiField/PayStructure';
import { UserDisplay } from '@CommonLegacy/Components/Users/UserDisplay';
import { DoubleArrow } from '@mui/icons-material';
import { Collapse, IconButton, Typography } from '@mui/material';
import React from 'react';
import type { ContractPayStructure } from 'vl-shared/src/schemas/contracts/ContractPayStructureSchema';
import type { IContractWithOwner } from 'vl-shared/src/schemas/contracts/ContractSchema';

import { ContractTimeDisplay } from './ContractTimeDisplay';

type DetailsDisplayProps = {
  contract: IContractWithOwner;
};

export const ContractDetailsCollapse: React.FC<DetailsDisplayProps> = ({ contract }) => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(true);
  const sound = useSoundEffect();
  const handleExpand = React.useCallback(() => {
    setIsExpanded((prev) => {
      if (prev) {
        sound.playSound('close');
      } else {
        sound.playSound('open');
      }
      return !prev;
    });
  }, [sound, setIsExpanded]);
  return (
    <div
      data-testid="SelectedContract-DetailsDisplay__Details_Collapse"
      style={{ display: 'flex', width: '100%', position: 'relative' }}
    >
      <IconButton
        data-testid="AppDockCollapse__Collapse_Button"
        sx={{ position: 'absolute', left: -10, top: 0 }}
        onClick={handleExpand}
      >
        <DoubleArrow
          fontSize="medium"
          sx={{
            transform: `rotate(${isExpanded ? '-90' : '90'}deg) scale(0.9)`,
            opacity: '0.4',
            filter:
              'drop-shadow(0 0 0 rgba(14,255,255,0.4)) drop-shadow(0 0 5px rgba(14,255,255,0.6)) drop-shadow(0 0 10px rgba(14,255,255,0.5))',
            transition: 'opacity 0.3s ease-in-out, transform 0.2s ease-in-out',
            '&:hover': {
              transform: `rotate(${isExpanded ? '-90' : '90'}deg) scale(1)`,
              opacity: '1',
            },
          }}
        />
      </IconButton>
      <Collapse in={isExpanded} sx={{ width: '100%' }} unmountOnExit>
        <div
          data-testid="SelectedContract-DetailsDisplay__BottomWrapper"
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            marginTop: '.5em',
            justifyContent: 'space-around',
          }}
        >
          <div
            data-testid="SelectedContract-OverviewInfo-Bottom__Status&SubtypeWrapper"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'space-around',
              justifyContent: 'space-around',
            }}
          >
            <ComponentDisplay
              data-testid="SelectedContract-OverviewInfo-Bottom__StatusChipWrapper"
              sx={{
                width: '100%',
                p: '.2em',
              }}
            >
              <Typography
                variant="body2"
                sx={{ mb: 'auto', fontWeight: 'bold', cursor: 'default' }}
              >
                Status
              </Typography>
              <ContractStatusChip status={contract.status} />
            </ComponentDisplay>
            <ComponentDisplay
              data-testid="SelectedContract-OverviewInfo-Bottom__SubtypeChipWrapper"
              sx={{
                width: '100%',
                p: '.2em',
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 'bold', mb: 'auto', cursor: 'default' }}
              >
                Contract Subtypes
              </Typography>
              <SubtypeChip
                data-testid="ContractManager__SelectedContract"
                subtype={contract.subtype}
                size="medium"
              />
            </ComponentDisplay>
          </div>
          <ComponentDisplay
            data-testid="SelectedContract-OverviewInfo-Bottom__DetailsContainer"
            sx={{ py: '.2em', px: '1em', gap: '.2em', alignItems: 'space-between' }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold', cursor: 'default' }}>
              Pay Defaults
            </Typography>
            <PayStructure payStructure={contract.payStructure} width="100%" />
            <PayDisplay
              label="Default Pay"
              pay={contract.defaultPay}
              structure={(contract.payStructure as ContractPayStructure) ?? undefined}
              sx={{
                minWidth: '120px',
              }}
            />
          </ComponentDisplay>
          <ContractTimeDisplay
            data-testid="SelectedContract-OverviewInfo-Bottom__DetailsContainer"
            contract={contract}
          />
          <UserDisplay user={contract.Owner} />
        </div>
      </Collapse>
    </div>
  );
};
