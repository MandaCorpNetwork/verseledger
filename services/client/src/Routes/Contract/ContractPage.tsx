import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { UserDisplay } from '@Common/Components/Users/UserDisplay';
import { LoadingScreen } from '@Common/LoadingObject/LoadingScreen';
import { Link } from '@mui/icons-material';
import { Box, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchContracts } from '@Redux/Slices/Contracts/actions/fetch/fetchContracts';
import { selectContract } from '@Redux/Slices/Contracts/selectors/contractSelectors';
import { useURLQuery } from '@Utils/Hooks/useURLQuery';
import { Logger } from '@Utils/Logger';
import { QueryNames } from '@Utils/QueryNames';
import React from 'react';

export const ContractPage: React.FC<unknown> = () => {
  const [searchParam] = useURLQuery();
  const dispatch = useAppDispatch();
  const contractId = searchParam.get(QueryNames.Contract);
  Logger.info(`Contract ID from URL: ${contractId}`);

  const contract = useAppSelector((root) => selectContract(root, contractId as string));
  const isLoading = useAppSelector((state) => state.contracts.isLoading);

  React.useEffect(() => {
    if (contractId) {
      Logger.info(`Fetching ContractId: ${contractId}`);
      dispatch(fetchContracts({ limit: 1, page: 0, contractId: [contractId] }));
    }
  }, [contractId, dispatch]);

  if (isLoading) {
    return (
      <>
        <LoadingScreen
          variant="wheel"
          controlType="indeterminate"
          testid="ContractPage"
        />
      </>
    );
  }

  return (
    <VLViewport
      data-testid="ContractPage__Container"
      sx={{ p: { xs: '1em', sm: '2em', md: '3em', lg: '4em', xl: '5em' } }}
    >
      <GlassBox data-testid="ContractPage__Wrapper">
        <DigiBox data-testid="ContractPage__Info_Container">
          <DigiDisplay data-testid="ContractPage-Info__TitleBar_Wrapper">
            <Tooltip
              title={contract.title}
              arrow
              data-testid="ContractPage-Info-TitleBar__Title_Tooltip"
            >
              <Typography data-testid="ContractPage-Info-TitleBar__Title_Text">
                {contract.title}
              </Typography>
            </Tooltip>
            <IconButton data-testid="ContractPage-Info-TitleBar__PageLink_Button">
              <Link />
            </IconButton>
          </DigiDisplay>
          <Box data-testid="ContractPage-Info__ContractInfo_Wrapper">
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
            <UserDisplay userid={contract.owner_id} />
          </Box>
        </DigiBox>
      </GlassBox>
    </VLViewport>
  );
};
