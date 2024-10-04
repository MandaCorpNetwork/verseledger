import { TYPES } from '@Constant/types';
import { inject, injectable } from 'inversify';
import { ContractService } from '@V1/models/contract/contract.service';
import { UserService } from '@V1/models/user/user.service';
import { Logger } from '@/utils/Logger';

@injectable()
export class ResourceEditorService {
  constructor(
    @inject(TYPES.UserService) private readonly userService: UserService,
    @inject(TYPES.ContractService)
    private readonly contractService: ContractService,
  ) {
    Logger.init();
  }

  public getResourceConfig(resource: string) {
    throw new Error(
      `Method not Implemented. getResourceConfig("${resource}");`,
    );
  }

  public async canEdit(resourceId: string, userId: string) {
    throw new Error(
      `Method not Implemented. canEdit("${resourceId}", "${userId}");`,
    );
  }
}
