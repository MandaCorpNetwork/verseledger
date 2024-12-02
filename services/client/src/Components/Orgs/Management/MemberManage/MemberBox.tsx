/* eslint-disable react/no-children-prop */
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import { UserChip } from '@Common/Components/Chips/UserChip';
import { ExpandMoreTwoTone } from '@mui/icons-material';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectUserById } from '@Redux/Slices/Users/users.selectors';
import { useForm } from '@tanstack/react-form';
import dayjs from 'dayjs';
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

  const joinDate = dayjs(member.joined).format('DD MMM, YYYY');

  const form = useForm({
    defaultValues: {
      rank: 'Unavailable',
      roles: currentRoles,
      awards: 'Unavailable',
    },
  });
  return (
    <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
      <AccordionSummary
        expandIcon={<ExpandMoreTwoTone color="secondary" />}
        sx={{
          display: 'flex',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <UserChip user={user} size="medium" />
          <Typography
            variant="body2"
            sx={{
              display: 'inline-flex',
              gap: '.5em',
              fontWeight: 'bold',
              textShadow: '2px 4px 3px rgba(0,0,0)',
            }}
          >
            This is where Ranks Would Go... IF I HAD ANY
          </Typography>
          <Typography
            sx={{
              display: 'inline-flex',
              gap: '.5em',
              fontWeight: 'bold',
              textShadow: '2px 4px 3px rgba(0,0,0)',
            }}
          >
            Roles:
            <Typography
              sx={{
                color: 'secondary.main',
                textShadow: '2px 3px 3px rgba(255,255,255,0.5)',
              }}
            >
              {currentRoles[0].rank_name}
            </Typography>
            <Typography sx={{ color: 'info.light' }}>
              {currentRoles.length > 1 ? `+ ${currentRoles.length - 1}` : null}
            </Typography>
          </Typography>
          <Typography
            sx={{
              display: 'inline-flex',
              gap: '.5em',
              fontWeight: 'bold',
              textShadow: '2px 4px 3px rgba(0,0,0)',
              mr: '1em',
            }}
          >
            Join Date:
            <Typography
              sx={{
                color: 'secondary.main',
                textShadow: '2px 3px 3px rgba(255,255,255,0.5)',
              }}
            >
              {joinDate}
            </Typography>
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
          }}
        >
          <DigiBox sx={{ p: '0.5em 1em', gap: '0.5em' }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
                color: 'text.disabled',
                textShadow: '2px 4px 3px rgba(0,0,0,0.5)',
                cursor: 'default',
              }}
            >
              Rank
            </Typography>
            <form.Field
              name="rank"
              children={(field) => (
                <FormControl>
                  <InputLabel color="secondary" disabled>
                    User Rank
                  </InputLabel>
                  <Select
                    size="small"
                    label="User Rank"
                    color="secondary"
                    value={field.state.value}
                    disabled
                  >
                    <MenuItem value="Unavailable">Unavailable</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </DigiBox>
          <DigiBox sx={{ p: '0.5em 1em' }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
                color: 'text.main',
                textShadow: '2px 4px 3px rgba(0,0,0,0.5)',
                cursor: 'default',
              }}
            >
              Roles
            </Typography>
            <form.Field
              name="roles"
              children={(field) => (
                <List>
                  {roles.map((role) => (
                    <ListItem key={role.id}>
                      <ListItemIcon>
                        <Checkbox
                          checked={field.state.value.includes(role)}
                          onChange={() => {}}
                          color="success"
                        />
                      </ListItemIcon>
                      <ListItemText primary={role.rank_name} />
                    </ListItem>
                  ))}
                </List>
              )}
            />
          </DigiBox>
          <DigiBox sx={{ p: '0.5em 1em' }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
                color: 'text.disabled',
                textShadow: '2px 4px 3px rgba(0,0,0,0.5)',
                cursor: 'default',
              }}
            >
              Awards
            </Typography>
            <Typography color="textDisabled">Unavailble</Typography>
          </DigiBox>
        </form>
        <AccordionActions>
          <Button color="error" variant="outlined">
            Expel
          </Button>
        </AccordionActions>
      </AccordionDetails>
    </Accordion>
  );
};
