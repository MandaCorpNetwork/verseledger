import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { UserChip } from '@Common/Components/Chips/UserChip';
import { AddComment } from '@mui/icons-material';
import { Box, Button, Grow, Rating, TextField } from '@mui/material';
import React from 'react';
import { ICreateUserRatingBody } from 'vl-shared/src/schemas/UserRatingsSchema';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

type UserRatingFieldProps = {
  user: IUser;
  contractId?: string;
  formData: ICreateUserRatingBody;
  setFormData: (data: ICreateUserRatingBody) => void;
};

export const UserRatingField: React.FC<UserRatingFieldProps> = ({
  user,
  contractId,
  formData,
  setFormData,
}) => {
  const [showComment, setShowComment] = React.useState(false);

  const handleShowComment = () => {
    setShowComment(true);
  };

  const updateFormData = React.useCallback(
    (field: keyof ICreateUserRatingBody, value: string | number | null) => {
      setFormData({
        ...formData,
        reciever_id: user.id,
        ...(contractId && { contract_id: contractId }),
        [field]: value,
      } as ICreateUserRatingBody);
    },
    [contractId, formData, setFormData, user.id],
  );

  return (
    <DigiDisplay
      data-testid="UserRatingForm__UserField_Wrapper"
      sx={{
        p: '.5em',
        flexDirection: 'column',
      }}
    >
      <Box
        data-testid="UserRatingForm-UserField__TopBox"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1em',
          mb: showComment ? '1em' : '.5em',
          transition: 'mb .2s ease-in-out',
        }}
      >
        <UserChip user={user} size="medium" />
        <Rating onChange={(_e, value) => updateFormData('rating_value', value)} />
      </Box>
      <Button
        variant="outlined"
        size="small"
        color="secondary"
        sx={{ display: showComment ? 'none' : '' }}
        onClick={handleShowComment}
        startIcon={<AddComment />}
      >
        Add Comment
      </Button>
      <Grow in={showComment}>
        <Box
          sx={{
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            display: showComment ? 'flex' : 'none',
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          <TextField
            size="small"
            label="Comments"
            multiline
            rows={2}
            color="secondary"
            onChange={(e) => updateFormData('comment', e.target.value)}
            inputProps={{
              maxLength: 300,
              sx: {
                '&::-webkit-scrollbar': {
                  width: '5px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(0,73,130,.8)',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '20px',
                  background: 'rgb(24,252,252)',
                },
              },
            }}
          />
        </Box>
      </Grow>
    </DigiDisplay>
  );
};
