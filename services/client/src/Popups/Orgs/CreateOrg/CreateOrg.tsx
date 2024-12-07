/* eslint-disable react/no-children-prop */
import { useSoundEffect } from '@Audio/AudioManager';
import { FormLoadingButton } from '@CommonLegacy/Components/Buttons/FormLoadingButton';
import { Alert, TextField, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { postCreateOrg } from '@Redux/Slices/Orgs/actions/post/postCreateOrg.action';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import { useForm } from '@tanstack/react-form';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { IOrganization } from 'vl-shared/src/schemas/orgs/OrganizationSchema';

//TODO: ERROR UI FEEDBACK

export const POPUP_CREATE_ORG = 'createOrg';

export const CreateOrgPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();

  const form = useForm({
    defaultValues: {
      title: '',
      rsi_handle: '',
    },
    onSubmit: async ({ value }) => {
      sound.playSound('loading');
      dispatch(postCreateOrg(value)).then((res) => {
        if ((res.payload as IOrganization).id.length > 1) {
          dispatch(closePopup(POPUP_CREATE_ORG));
          sound.playSound('success');
          enqueueSnackbar('Organization Created', { variant: 'success' });
        } else {
          sound.playSound('error');
        }
      });
    },
  });

  const submitButton = (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting]}
      children={([canSubmit, isSubmitting]) => (
        <FormLoadingButton
          label="Create Org"
          loading={isSubmitting}
          disabled={!canSubmit}
          onClick={form.handleSubmit}
        />
      )}
    />
  );

  const alertBox = (
    <form.Subscribe
      selector={(state) => [state.errors, state.isFormValid]}
      children={([_errors, isFormValid]) => (
        <Alert
          variant="outlined"
          severity={isFormValid ? 'success' : 'error'}
          sx={{ display: 'none' }}
        >
          Testing
        </Alert>
      )}
    />
  );
  return (
    <VLPopup
      name={POPUP_CREATE_ORG}
      title="Create Organization"
      submitButton={submitButton}
      alertBox={alertBox}
    >
      <form
        style={{ display: 'flex', padding: '1em', flexDirection: 'column', gap: '1em' }}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Typography>0/3 Orgs Created</Typography>
        <form.Field
          name="title"
          validators={{
            onChange: ({ value }) =>
              (value?.length ?? 0) > 0 ? undefined : 'Enter an Org Name',
            onBlur: ({ value }) =>
              (value?.length ?? 0) > 0 ? undefined : 'Enter an Org Name',
          }}
          children={(field) => (
            <TextField
              data-testid="CreateOrg-Form__OrgName_Input"
              label="Organization Name"
              color="secondary"
              required
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          )}
        />
        <form.Field
          name="rsi_handle"
          validators={{
            onChange: ({ value }) =>
              (value?.length ?? 0) > 0 ? undefined : 'Enter an Org Handle',
            onBlur: ({ value }) =>
              (value?.length ?? 0) > 0 ? undefined : 'Enter an Org Handle',
          }}
          children={(field) => (
            <TextField
              data-testid="CreateOrg-Form__OrgHandle_Input"
              label="Organization Handle"
              color="secondary"
              required
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          )}
        />
      </form>
    </VLPopup>
  );
};
