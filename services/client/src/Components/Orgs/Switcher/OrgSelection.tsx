import MandaLogo from '@Assets/media/MandaLogo.png';
import { ButtonBase, Tooltip } from '@mui/material';
import { IOrganizationMemberWithOrg } from 'vl-shared/src/schemas/orgs/OrganizationSchema';

type OrgSelectButtonProps = {
  membership: IOrganizationMemberWithOrg;
};

export const OrgSelectButton: React.FC<OrgSelectButtonProps> = ({ membership }) => {
  const org = membership.Org;
  return (
    <Tooltip title={org?.title ?? 'unknown'}>
      <ButtonBase
        data-testid={`OrgSwitcher__OrgSelectButton_${membership.id}`}
        onClick={() => {}}
        onAuxClick={() => {}}
        sx={{
          width: '45px',
          height: '45px',
          borderRadius: '10px',
          backgroundImage: `url(${MandaLogo})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          p: '2px',
        }}
      />
    </Tooltip>
  );
};
