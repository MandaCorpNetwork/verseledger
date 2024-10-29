import { Mapper } from '@Infrastructure/Mapper';
import { Organization } from '../organization.model';
import { OrganizationDTO } from './OrganizationDTO';
import { IOrganization } from 'vl-shared/src/schemas/orgs/OrganizationSchema';

export class OrganizationToOrganizationDTO extends Mapper<
  Organization,
  OrganizationDTO
> {
  public static override map(artifact: Organization): OrganizationDTO {
    const org: IOrganization = artifact.get();
    return new OrganizationDTO(org);
  }
}
