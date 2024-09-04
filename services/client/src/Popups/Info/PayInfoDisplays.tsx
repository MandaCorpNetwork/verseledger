import { Box, Typography } from '@mui/material';
import React from 'react';

export const FlatRateTab: React.FC<unknown> = () => {
  return (
    <Box
      data-testid="FlatRate__Panel"
      sx={{ display: 'flex', flexDirection: 'column', p: '.5em', height: '100%' }}
    >
      <Typography
        data-testid="FlatRate__Title"
        variant="h6"
        align="center"
        sx={{ color: 'secondary.main', fontWeight: 'bold', mb: '1em' }}
      >
        Flat Rate
      </Typography>
      <Typography
        data-testid="FlatRate__PurposeTitle"
        variant="body1"
        sx={{ color: 'text.secondary', fontWeight: 'bold' }}
      >
        Purpose:
      </Typography>
      <Typography data-testid="FlatRate__PurposeContent" variant="body2">
        This Pay Structure allows users to pay a flat fee to their contractors.
      </Typography>
      <Typography
        data-testid="FlatRate__MechanicsTitle"
        variant="body1"
        sx={{ color: 'text.secondary', fontWeight: 'bold', my: '.5em' }}
      >
        Mechanics:
      </Typography>
      <Typography
        data-testid="FlatRate-Mechanics__DefaultHeader"
        variant="body2"
        sx={{ color: 'secondary.light', fontWeight: 'bold', display: 'inline-flex' }}
      >
        Default Pay -
      </Typography>
      <Typography
        data-testid="FlatRate-Mechanics__DefaultContent"
        variant="body2"
        sx={{ color: 'text.main' }}
      >
        The Standard Payout upon Contract Completion*
      </Typography>
      <Typography
        data-testid="FlatRate__NegotiationTitle"
        variant="body1"
        sx={{ color: 'text.secondary', fontWeight: 'bold', my: '.5em' }}
      >
        Negotiation:
      </Typography>
      <Typography
        data-testid="FlatRate-Negotiation__DefaultTitle"
        variant="body2"
        sx={{ color: 'secondary.light', fontWeight: 'bold', display: 'inline-flex' }}
      >
        Default Pay -
      </Typography>
      <Typography
        data-testid="FlatRate-Negotiation__DefaultContent"
        variant="body2"
        sx={{ color: 'text.main' }}
      >
        Can be negotiated on by the contractor if Bargianing is turned on for the
        contract.
      </Typography>
      <Typography
        data-testid="FlatRate__ChangeDisclaimer"
        variant="body2"
        sx={{ color: 'info.main', fontSize: '.8em', my: 'auto' }}
      >
        * Can be changed on a per-contractor basis in Contract Manager: Payroll
      </Typography>
    </Box>
  );
};

export const PoolTab: React.FC<unknown> = () => {
  return (
    <Box
      data-testid="FlatRate__Panel"
      sx={{ display: 'flex', flexDirection: 'column', p: '.2em', height: '100%' }}
    >
      <Typography
        data-testid="FlatRate__Title"
        variant="h6"
        align="center"
        sx={{ color: 'secondary.main', fontWeight: 'bold', mb: '1em' }}
      >
        Pool Percentage
      </Typography>
      <Typography
        data-testid="FlatRate__PurposeTitle"
        variant="body1"
        sx={{ color: 'text.secondary', fontWeight: 'bold' }}
      >
        Purpose:
      </Typography>
      <Typography data-testid="FlatRate__PurposeContent" variant="body2">
        This Pay Structure allows users to pay a percentage of the total earnings
      </Typography>
      <Typography
        data-testid="FlatRate__MechanicsTitle"
        variant="body1"
        sx={{ color: 'text.secondary', fontWeight: 'bold', my: '.5em' }}
      >
        Mechanics:
      </Typography>
      <Typography
        data-testid="FlatRate-Mechanics__DefaultHeader"
        variant="body2"
        sx={{ color: 'secondary.light', fontWeight: 'bold', display: 'inline-flex' }}
      >
        Default Pay -
      </Typography>
      <Typography
        data-testid="FlatRate-Mechanics__DefaultContent"
        variant="body2"
        sx={{ color: 'text.main' }}
      >
        The Standard Percentage Per each contractor. Cannot be more than even split for
        the Contractor Limit by default.*
      </Typography>
      <Typography
        data-testid="FlatRate-Mechanics__DefaultHeader"
        variant="body2"
        sx={{ color: 'secondary.light', fontWeight: 'bold', display: 'inline-flex' }}
      >
        Even Split -
      </Typography>
      <Typography
        data-testid="FlatRate-Mechanics__DefaultContent"
        variant="body2"
        sx={{ color: 'text.main' }}
      >
        This setting allows Employers to evenly split all earnings among their
        contractors. It will automatically determine an even percentage based on the
        number of contractors.
      </Typography>
      <Typography
        data-testid="FlatRate__NegotiationTitle"
        variant="body1"
        sx={{ color: 'text.secondary', fontWeight: 'bold', my: '.5em' }}
      >
        Negotiation:
      </Typography>
      <Typography
        data-testid="FlatRate-Negotiation__DefaultTitle"
        variant="body2"
        sx={{ color: 'secondary.light', fontWeight: 'bold', display: 'inline-flex' }}
      >
        Default Pay -
      </Typography>
      <Typography
        data-testid="FlatRate-Negotiation__DefaultContent"
        variant="body2"
        sx={{ color: 'text.main' }}
      >
        ercentage can be negotiated by the contractor (within the limits of even share) if
        Bargianing is turned on for the contract.
      </Typography>
      <Typography
        data-testid="FlatRate__ChangeDisclaimer"
        variant="body2"
        sx={{ color: 'info.main', fontSize: '.8em', my: '.5em' }}
      >
        * Can be changed on a per-contractor basis in Contract Manager: Payroll
      </Typography>
    </Box>
  );
};

export const TimedRateTab: React.FC<unknown> = () => {
  return (
    <Box
      data-testid="FlatRate__Panel"
      sx={{ display: 'flex', flexDirection: 'column', p: '.2em', height: '100%' }}
    >
      <Typography
        data-testid="FlatRate__Title"
        variant="h6"
        align="center"
        sx={{ color: 'secondary.main', fontWeight: 'bold', mb: '1em' }}
      >
        Timed Rate
      </Typography>
      <Typography
        data-testid="FlatRate__PurposeTitle"
        variant="body1"
        sx={{ color: 'text.secondary', fontWeight: 'bold' }}
      >
        Purpose:
      </Typography>
      <Typography data-testid="FlatRate__PurposeContent" variant="body2">
        This Pay Structure allows users to pay a specified amount at a timed interval
      </Typography>
      <Typography
        data-testid="FlatRate__MechanicsTitle"
        variant="body1"
        sx={{ color: 'text.secondary', fontWeight: 'bold', my: '.5em' }}
      >
        Mechanics:
      </Typography>
      <Typography
        data-testid="FlatRate-Mechanics__DefaultHeader"
        variant="body2"
        sx={{ color: 'secondary.light', fontWeight: 'bold', display: 'inline-flex' }}
      >
        Default Pay -
      </Typography>
      <Typography
        data-testid="FlatRate-Mechanics__DefaultContent"
        variant="body2"
        sx={{ color: 'text.main' }}
      >
        The Standard amount Per each Contractor*
      </Typography>
      <Typography
        data-testid="FlatRate-Mechanics__DefaultHeader"
        variant="body2"
        sx={{ color: 'secondary.light', fontWeight: 'bold', display: 'inline-flex' }}
      >
        Time Interval -
      </Typography>
      <Typography
        data-testid="FlatRate-Mechanics__DefaultContent"
        variant="body2"
        sx={{ color: 'text.main' }}
      >
        This setting allows you to specify at what rate you would like to pay out the
        default pay.
      </Typography>
      <Typography
        data-testid="FlatRate__NegotiationTitle"
        variant="body1"
        sx={{ color: 'text.secondary', fontWeight: 'bold', my: '.5em' }}
      >
        Negotiation:
      </Typography>
      <Typography
        data-testid="FlatRate-Negotiation__DefaultTitle"
        variant="body2"
        sx={{ color: 'secondary.light', fontWeight: 'bold', display: 'inline-flex' }}
      >
        Default Pay -
      </Typography>
      <Typography
        data-testid="FlatRate-Negotiation__DefaultContent"
        variant="body2"
        sx={{ color: 'text.main' }}
      >
        Can be negotiated by the contractor if Bargianing is turned on.
      </Typography>
      <Typography
        data-testid="FlatRate__ChangeDisclaimer"
        variant="body2"
        sx={{ color: 'info.main', fontSize: '.8em', my: '.5em' }}
      >
        * Can be changed on a per-contractor basis in Contract Manager: Payroll
      </Typography>
    </Box>
  );
};
