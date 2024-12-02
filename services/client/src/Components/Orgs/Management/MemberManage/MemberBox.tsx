import { UserChip } from '@Common/Components/Chips/UserChip';
import { Accordion, AccordionSummary, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectUserById } from '@Redux/Slices/Users/users.selectors';
import React from 'react';
import {
  IOrganizationMemberWithUser,
  IOrganizationRank,
} from 'vl-shared/src/schemas/orgs/OrganizationSchema';

type MemberBoxProps = {
  member: IOrganizationMemberWithUser;
  roles: IOrganizationRank[];
};

export const MemberBox: React.FC<MemberBoxProps> = ({ member, roles }) => {
  const user = useAppSelector((state) =>
    member.User ? member.User : selectUserById(state, member.user_id),
  );
  const getCurrentRoles = React.useCallback(() => {
    const currentRoles = roles.filter((role) => role.id === member.rank_id);
    return currentRoles;
  }, [member.rank_id, roles]);

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
