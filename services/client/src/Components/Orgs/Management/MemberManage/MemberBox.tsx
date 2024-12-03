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
  ranks: IOrganizationRank[];
};

export const MemberBox: React.FC<MemberBoxProps> = ({ member, ranks }) => {
  const user = useAppSelector((state) =>
    member.User ? member.User : selectUserById(state, member.user_id),
  );
  const getCurrentRank = React.useCallback(() => {
    const currentRank = ranks.find((rank) => rank.id === member.rank_id);
    return currentRank;
  }, [member.rank_id, ranks]);

  const currentRank = getCurrentRank();

  const joinDate = dayjs(member.joined).format('DD MMM, YYYY');

  const form = useForm({
    defaultValues: {
      rank: currentRank?.id,
      roles: 'Unavailable',
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
            variant="body1"
            sx={{
              display: 'inline-flex',
              gap: '.5em',
              fontWeight: 'bold',
              textShadow: '2px 4px 3px rgba(0,0,0)',
            }}
          >
            Rank:
            <Typography
              sx={{
                color: 'secondary.main',
                textShadow: '2px 3px 3px rgba(255,255,255,0.5)',
              }}
            >
              {currentRank?.rank_name ?? 'ERROR'}
            </Typography>
          </Typography>
          <Typography
            sx={{
              display: 'inline-flex',
              gap: '.5em',
              fontWeight: 'bold',
              textShadow: '2px 4px 3px rgba(0,0,0)',
              color: 'text.disabled',
            }}
          >
            Roles:
            <Typography
              sx={{
                color: 'secondary.main',
                textShadow: '2px 3px 3px rgba(255,255,255,0.5)',
              }}
            >
              ROLE_NAME
            </Typography>
            <Typography sx={{ color: 'info.light' }}>
              + 1{/* {currentRoles.length > 1 ? `+ ${currentRoles.length - 1}` : null} */}
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
                  <InputLabel color="secondary">User Rank</InputLabel>
                  <Select
                    size="small"
                    label="User Rank"
                    color="secondary"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  >
                    {ranks.map((rank) => (
                      <MenuItem
                        key={rank.id}
                        selected={field.state.value === rank.id}
                        value={rank.id}
                      >
                        {rank.rank_name}
                      </MenuItem>
                    ))}
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
                color: 'text.disabled',
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
                  <ListItem>
                    <ListItemIcon>
                      <Checkbox
                        checked={field.state.value === 'Unavailable'}
                        color="success"
                        disabled
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={field.state.value}
                      sx={{ color: 'text.disabled' }}
                    />
                  </ListItem>
                  {/* {ranks.map((rank) => (
                    <ListItem key={rank.id}>
                      <ListItemIcon>
                        <Checkbox
                          checked={field.state.value.includes(rank)}
                          onChange={() => {}}
                          color="success"
                        />
                      </ListItemIcon>
                      <ListItemText primary={rank.rank_name} />
                    </ListItem>
                  ))} */}
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
