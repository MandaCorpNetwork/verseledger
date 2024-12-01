import { UserChip } from '@Common/Components/Chips/UserChip';
import { Accordion, AccordionSummary, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectUserById } from '@Redux/Slices/Users/users.selectors';
import React from 'react';
import {
  IOrganizationMemberWithUser,
  IOrganizationRole,
} from 'vl-shared/src/schemas/orgs/OrganizationSchema';

type MemberBoxProps = {
  member: IOrganizationMemberWithUser;
  roles: IOrganizationRole[];
};

export const MemberBox: React.FC<MemberBoxProps> = ({ member, roles }) => {
  const user = useAppSelector((state) =>
    member.User ? member.User : selectUserById(state, member.user_id),
  );
  const getCurrentRoles = React.useCallback(() => {
    const currentRoles = roles.filter((role) => role.id === member.role_id);
    return currentRoles;
  }, [member.role_id, roles]);

  const currentRoles = getCurrentRoles();
  return (
    <Accordion>
      <AccordionSummary>
        <UserChip user={user} size="medium" />
        <Typography>{currentRoles[0].role_name}</Typography>
        <Typography>Join Date: {member.joined.toLocaleString()}</Typography>
      </AccordionSummary>
    </Accordion>
  );
};
