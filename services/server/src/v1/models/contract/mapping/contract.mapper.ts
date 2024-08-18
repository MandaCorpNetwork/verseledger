import { Mapper } from '@/infrastructure/Mapper';
import { Contract } from '../contract.model';
import { ContractDTO } from './ContractDTO';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

export class ContractMapper extends Mapper<Contract, ContractDTO> {
  public static toDTO(artifact: Contract): ContractDTO {
    const contract: IContract = artifact.get();
    return new ContractDTO(contract);
  }
}
