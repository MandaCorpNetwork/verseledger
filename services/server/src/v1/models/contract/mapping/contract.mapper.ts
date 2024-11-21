import { Mapper } from '@Infrastructure/Mapper';
import { Contract } from '@V1/models/contract/contract.model';
import { ContractDTO } from './ContractDTO';
import { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';

export class ContractToContractDTOMapper extends Mapper<Contract, ContractDTO> {
  public static override map(artifact: Contract): ContractDTO {
    const contract: IContract = artifact.get();
    return new ContractDTO(contract);
  }
}
