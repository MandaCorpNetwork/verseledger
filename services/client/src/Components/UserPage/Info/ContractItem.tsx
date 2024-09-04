import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

type ContractProps = {
  contract: IContract;
};

export const ContractItem: React.FC<ContractProps> = ({ contract }) => {
  return( 
  <DigiBox>
    Testing
  </DigiBox>
  );
};
