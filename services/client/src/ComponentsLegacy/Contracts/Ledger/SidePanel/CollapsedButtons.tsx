import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';
import { AddCircle, ErrorTwoTone, Search } from '@mui/icons-material';
import { IconButton, Slide, SvgIcon, Tooltip } from '@mui/material';
import type React from 'react';

type CollapsedButtonsProps = {
  isExpanded: boolean;
  isMobile: boolean;
  isTablet: boolean;
  searchClick: () => void;
  setFilter: (value: ContractArchetype) => void;
  currentFilters: ContractArchetype[];
  openCreate: () => void;
};
export const CollapsedButtons: React.FC<CollapsedButtonsProps> = ({
  isExpanded,
  isMobile,
  isTablet,
  searchClick,
  setFilter,
  currentFilters,
  openCreate,
}) => {
  return (
    <Slide
      data-testid="ContractLedger-SidePanel__CollapsedButtons_Slide"
      direction="right"
      in={!isExpanded}
      timeout={{ enter: 800, exit: 300 }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {(isMobile || isTablet) && (
          <IconButton
            data-testid="ContractLedger-SidePanel-CollapsedButtons__MobileSearchToggle_Button"
            size="small"
            onClick={searchClick}
          >
            <Search fontSize="large" />
          </IconButton>
        )}
        <Tooltip
          title="Create Contract"
          placement="right"
          disableInteractive
          enterDelay={500}
          enterNextDelay={2000}
          leaveDelay={300}
        >
          <IconButton
            data-testid="ContractLedger-SidePanel-CollapsedButtons__CreateContract_Button"
            onClick={openCreate}
            size="small"
          >
            <AddCircle fontSize="large" />
          </IconButton>
        </Tooltip>
        {contractArchetypes.map((archetype) => {
          const ArchetypeIcon = archetype.archetypeIcon ?? ErrorTwoTone;
          return (
            <Tooltip
              key={archetype.archetype}
              title={archetype.archetype}
              placement="right"
              disableInteractive
              enterDelay={300}
            >
              <IconButton
                data-testid={`ContractLedger-ColumnOne-ArchetypeButton__${archetype.archetype}_Button`}
                onClick={() => setFilter(archetype.archetype)}
                sx={{
                  color: currentFilters.includes(archetype.archetype)
                    ? 'secondary.main'
                    : 'primary.light',
                }}
              >
                <SvgIcon component={ArchetypeIcon} />
              </IconButton>
            </Tooltip>
          );
        })}
      </div>
    </Slide>
  );
};
