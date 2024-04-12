import { GroupAddOutlined } from '@mui/icons-material';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Popover,
  Rating,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

import { UserSearch } from '@/Common/UserSearch';

type InviteeProps = {
  name: string;
  avatar: string;
};

type ContractorSettingProps = {
  formData: {
    minRating: number;
    maxContractors: number | null;
    contractorInvitees: InviteeProps[];
    allowBiddingAfterDeadline: boolean;
  };
  onFormChange: (
    field: string,
    value: string | number | null | boolean | InviteeProps[],
  ) => void;
};

export const ContractorsForm: React.FC<ContractorSettingProps> = ({
  formData,
  onFormChange,
}) => {
  const [isRatingDisabled, setIsRatingDisabled] = React.useState(true);
  const [isMaxContractorsDisabled, setIsMaxContractorsDisabled] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [inviteListAnchorEl, setInviteListAnchorEl] = React.useState<HTMLElement | null>(
    null,
  );

  const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
    if (isRatingDisabled) {
      onFormChange('minRating', 0);
    }
    onFormChange('minRating', newValue);
  };

  const handleMaxContractorsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (isMaxContractorsDisabled) {
      onFormChange('maxContractors', null);
    }
    onFormChange('maxContractors', isNaN(newValue) ? null : newValue);
  };

  const handleAllowAfterBidSwitch = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean,
  ) => {
    onFormChange('allowBiddingAfterDeadline', checked);
  };

  const handleInviteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleInviteClose = () => {
    setAnchorEl(null);
  };

  const handleUserSelect = (selectedUser: InviteeProps | null) => {
    if (!selectedUser) return;

    const updatedInvitees = [...formData.contractorInvitees, selectedUser];
    onFormChange('contractorInvitees', updatedInvitees);
  };

  const handleDeleteInvitee = (inviteeToRemove: InviteeProps) => {
    const updatedInvitees = formData.contractorInvitees.filter(
      (invitee) => invitee.name !== inviteeToRemove.name,
    );
    onFormChange('contractorInvitees', updatedInvitees);
  };

  const handleInviteListClick = (event: React.MouseEvent<HTMLElement>) => {
    setInviteListAnchorEl(event.currentTarget);
  };

  const handleInviteListClose = () => {
    setInviteListAnchorEl(null);
  };

  return (
    <Box
      data-testid="ContractorSettings-Form"
      sx={{ display: 'flex', flexDirection: 'column', ml: '1em', mr: '1em' }}
    >
      <FormLabel color="secondary" sx={{ fontWeight: 'bold', mb: '.5em' }}>
        Contractor Settings
      </FormLabel>
      <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <FormControlLabel
          data-testid="contractorRating-switch"
          control={
            <Switch
              color="secondary"
              size="small"
              checked={!isRatingDisabled}
              onChange={() => setIsRatingDisabled(!isRatingDisabled)}
            />
          }
          label="Limit Rating"
          componentsProps={{
            typography: {
              variant: 'body2',
              color: 'text.secondary',
            },
          }}
        />
        <Rating disabled={isRatingDisabled} onChange={handleRatingChange} />
      </FormControl>
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          mt: '.5em',
          mb: '.5em',
        }}
      >
        <FormControlLabel
          control={
            <Switch
              color="secondary"
              size="small"
              checked={!isMaxContractorsDisabled}
              onChange={() => setIsMaxContractorsDisabled(!isMaxContractorsDisabled)}
            />
          }
          label="Limit Contractors"
          componentsProps={{
            typography: {
              variant: 'body2',
              color: 'text.secondary',
            },
          }}
        />
        <TextField
          variant="filled"
          label="Max Contractors"
          color="secondary"
          disabled={isMaxContractorsDisabled}
          size="small"
          onChange={handleMaxContractorsChange}
          sx={{
            width: '150px',
            '& .MuiFilledInput-root': {
              backgroundColor: 'primary.dark',
              '&.Mui-disabled': {
                backgroundColor: 'rgba(0, 30, 100, 0.2)',
              },
            },
          }}
        />
      </FormControl>
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          mt: '.5em',
          mb: '.5em',
        }}
      >
        <FormControlLabel
          control={<Switch color="secondary" size="small" />}
          label="Allow Bidding After Deadline"
          onChange={handleAllowAfterBidSwitch}
          componentsProps={{
            typography: {
              variant: 'body2',
              color: 'text.secondary',
            },
          }}
        />
      </FormControl>
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: '.5em',
          mb: '.5em',
        }}
      >
        <Box>
          <Button
            color="secondary"
            variant="outlined"
            startIcon={<GroupAddOutlined />}
            size="small"
            onClick={handleInviteClick}
          >
            Invite Contractors
          </Button>
        </Box>
        <Box
          sx={{
            mt: '.5em',
            height: '50px',
            width: '150px',
            borderLeft: '2px solid',
            borderRight: '2px solid',
            borderRadius: '5px',
            borderColor: 'secondary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AvatarGroup
            max={5}
            slotProps={{
              additionalAvatar: {
                sx: {
                  width: '25px',
                  height: '25px',
                  fontSize: '1em',
                  cursor: 'pointer',
                },
                onClick: handleInviteListClick,
              },
            }}
          >
            {formData.contractorInvitees.length === 0 && (
              <Typography
                variant="body2"
                sx={{ textAlign: 'center', fontWeight: 'bold' }}
              >
                No Invites Queued
              </Typography>
            )}
            {formData.contractorInvitees.map((invitee, index) => (
              <Avatar
                key={index}
                alt={invitee.name}
                src={invitee.avatar}
                sx={{ width: '25px', height: '25px' }}
              />
            ))}
          </AvatarGroup>
        </Box>
        <Popover
          open={Boolean(inviteListAnchorEl)}
          anchorEl={inviteListAnchorEl}
          onClose={handleInviteListClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          sx={{ mt: '.5em' }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 1,
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: 'secondary.main',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                m: '.5em',
                height: '100px',
                width: '220px',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgb(8, 29, 68)',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '20px',
                  background: 'rgb(121, 192, 244, .5)',
                },
              }}
            >
              {formData.contractorInvitees.map((invitee, index) => (
                <Chip
                  key={index}
                  label={invitee.name}
                  avatar={<Avatar alt={invitee.name} src={invitee.avatar} />}
                  onDelete={() => handleDeleteInvitee(invitee)}
                  size="medium"
                  color="secondary"
                  variant="outlined"
                  sx={{ mb: '.2em' }}
                />
              ))}
            </Box>
          </Paper>
        </Popover>
        <Popover
          data-testid="invite-user-popover"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleInviteClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          sx={{ mt: '.5em' }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 1,
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '5px',
              borderColor: 'secondary.main',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{ textAlign: 'center', fontWeight: 'bold', mb: '1em' }}
            >
              Invite Users
            </Typography>
            <UserSearch
              color={'secondary'}
              size="small"
              variant="outlined"
              width="200px"
              onUserSelect={handleUserSelect}
            />
            <Box
              data-id="Invitee-ScrollBox_Wrapper"
              sx={{
                m: '.5em',
                borderTop: '2px solid',
                borderBottom: '3px solid',
                borderRadius: '10px',
                borderColor: 'secondary.main',
              }}
            >
              <Box
                sx={{
                  m: '.5em',
                  height: '100px',
                  width: '220px',
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '10px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgb(8, 29, 68)',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    borderRadius: '20px',
                    background: 'rgb(121, 192, 244, .5)',
                  },
                }}
              >
                {formData.contractorInvitees.length === 0 && (
                  <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        display: 'flex',
                        textAlign: 'center',
                        m: 'auto',
                      }}
                    >
                      Search Users to Invite
                    </Typography>
                  </Box>
                )}
                {formData.contractorInvitees.map((invitee, index) => (
                  <Chip
                    key={index}
                    label={invitee.name}
                    avatar={<Avatar alt={invitee.name} src={invitee.avatar} />}
                    onDelete={() => handleDeleteInvitee(invitee)}
                    size="small"
                    color="secondary"
                    variant="outlined"
                    sx={{ mr: '.2em', mb: '.2em' }}
                  />
                ))}
              </Box>
            </Box>
          </Paper>
        </Popover>
      </FormControl>
    </Box>
  );
};
