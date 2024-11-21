import { Card, CardHeader } from '@mui/material';
import { IOrganization } from 'vl-shared/src/schemas/orgs/OrganizationSchema';

type OrgCardProps = {
  organization: IOrganization;
};

export const OrgCard: React.FC<OrgCardProps> = ({ organization }) => {
  return (
    <Card>
      <CardHeader>{organization.title}</CardHeader>
    </Card>
  );
};
