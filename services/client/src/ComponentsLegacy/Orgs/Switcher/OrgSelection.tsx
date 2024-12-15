import MandaLogo from '@Assets/media/MandaLogo.png';
import { useSoundEffect } from '@Audio/AudioManager';
import { ButtonBase, Tooltip } from '@mui/material';
import { useNav } from '@Utils/Hooks/useNav';
import React from 'react';
import { useLocation, useParams } from 'react-router';
import type { IOrganizationMemberWithOrg } from 'vl-shared/src/schemas/orgs/OrganizationSchema';

type OrgSelectButtonProps = {
  membership: IOrganizationMemberWithOrg;
};

export const OrgSelectButton: React.FC<OrgSelectButtonProps> = ({ membership }) => {
  const { selectedOrgId } = useParams();
  const navigate = useNav();
  const location = useLocation();
  const sound = useSoundEffect();
  const org = membership.Org;
  const isSelected = selectedOrgId === membership.org_id;

  const handleSelect = React.useCallback(
    (e: React.MouseEvent) => {
      if (isSelected) {
        return sound.playSound('denied');
      }
      const url = `${location.pathname.replace(
        `/${selectedOrgId}`,
        `/${membership.org_id}`,
      )}`;
      navigate(url, 'internal', true).onClick(e);
    },
    [isSelected, location.pathname, membership.org_id, navigate, selectedOrgId, sound],
  );
  return (
    <Tooltip title={org?.title ?? 'unknown'}>
      <ButtonBase
        data-testid={`OrgSwitcher__OrgSelectButton_${membership.id}`}
        onClick={(e) => handleSelect(e)}
        onAuxClick={(e) => handleSelect(e)}
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
