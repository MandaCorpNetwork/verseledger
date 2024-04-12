import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

import type { IContract } from '@/../../verseledger-backend/src/interfaces/IContract';
import { LocationSelection } from '@/Common/LocationSelection';
import { PlayerDisplay } from '@/Common/PlayerDisplay';

interface ContractBidProps {
  open: boolean;
  onClose: () => void;
  contract: IContract;
}

export const ContractBid: React.FC = ({ contract, open, onClose }) => {
  // State for managing Negotiations
  const [isPayNegotiationOn, setIsPayNegotiationOn] = React.useState(false);
  const [isLocationNegotiationOn, setIsLocationNegotiationOn] = React.useState(false);
  const [isTimeNegotiationOn, setIsTimeNegotiationOn] = React.useState(false);

  // Notes Field Handler
  const [notes, setNotes] = React.useState('');

  const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    if (inputText.length <= 300) {
      setNotes(inputText);
    } else {
      // If character count exceeds 300, truncate the input
      const limitedText = inputText.slice(0, 300);
      setNotes(limitedText);
    }
  };

  return (
    <Dialog
      data-testid="ContractBid-Form_Dialog"
      open={true}
      onClose={onClose}
      sx={{
        backdropFilter: 'blur(5px)',
      }}
    >
      <DialogTitle>Submit Bid</DialogTitle>
      <DialogContent>
        <Box>
          <Typography>{contract.Title}</Typography>
        </Box>
        <Box>
          <PlayerDisplay />
        </Box>
        <Box>{contract.subType}</Box>
        <Box>{contract.locations}</Box>
      </DialogContent>
      <DialogActions>
        <Box
          data-id="ContractBid_Form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            data-id="ContractBid-Pay_Form"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              mt: '1em',
              mb: '1em',
            }}
          >
            <TextField
              data-testid="ContractBid-Pay-Amount-Set"
              color="secondary"
              label="Pay Amount"
              InputProps={{
                readOnly: true,
              }}
              sx={{
                mr: 'auto',
                width: '200px',
              }}
              value={contract.payAmount}
            />
            <FormControlLabel
              data-testid="ContractBid-Pay-Negotiation_Switch"
              control={<Switch color="secondary" size="small" />}
              label="Negotiate"
              checked={isPayNegotiationOn}
              onChange={() => setIsPayNegotiationOn(!isPayNegotiationOn)}
            />
            <TextField
              data-testid="ContractBid-Pay-Negotiation-Set"
              color="secondary"
              label="Negotiated Pay"
              disabled={!isPayNegotiationOn}
              sx={{
                ml: 'auto',
                width: '200px',
              }}
            />
          </Box>
          <Box
            data-id="ContractBid-Location_Form"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              mb: '1em',
            }}
          >
            <TextField
              data-testid="ContractBid-Location-Set"
              color="secondary"
              InputProps={{
                readOnly: true,
              }}
              label="Start Location"
              sx={{
                mr: 'auto',
                width: '200px',
              }}
              value={contract.startLocation}
            />
            <FormControlLabel
              data-id="ContractBid-Location-Negotiation_Switch"
              control={<Switch color="secondary" size="small" />}
              label="Negotiate"
              checked={isLocationNegotiationOn}
              onChange={() => setIsLocationNegotiationOn(!isLocationNegotiationOn)}
            />
            <LocationSelection
              disabled={!isLocationNegotiationOn}
              sx={{
                ml: 'auto',
                width: '200px',
              }}
            />
          </Box>
          <Box
            data-id="ContractBid-Time_Form"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              mr: 'auto',
              mb: '1em',
            }}
          >
            <Box
              data-id="ContractBid-Time-Set_Form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                ml: 'auto',
              }}
            >
              <TextField
                data-testid="ContractBid-StartTime_Set"
                label="Start Time"
                color="secondary"
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  mb: '1em',
                  width: '200px',
                }}
                value={contract.startTime}
              />
              <TextField
                data-testid="ContractBid-EndTime_Set"
                label="End Time"
                color="secondary"
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  width: '200px',
                }}
                value={contract.endTime}
              />
            </Box>
            <FormControlLabel
              control={<Switch color="secondary" size="small" />}
              label="Negotiate"
              checked={isTimeNegotiationOn}
              onChange={() => setIsTimeNegotiationOn(!isTimeNegotiationOn)}
            />
            <Box
              data-id="ContractBid-Time-Negotiation_Form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <TextField
                data-testid="ContractBid-StartTime_Negotiation"
                label="Negotiated Start Time"
                color="secondary"
                disabled={!isTimeNegotiationOn}
                sx={{
                  mb: '1em',
                  width: '200px',
                }}
              />
              <TextField
                data-testid="ContractBid-EndTime_Negotiation"
                label="Negotiated End Time"
                color="secondary"
                disabled={!isTimeNegotiationOn}
                sx={{
                  width: '200px',
                }}
              />
            </Box>
          </Box>
          <Box
            data-id="ContractBid-Notes_Form"
            sx={{
              mb: '1em',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextField
              data-testid="ContractBid-Notes_Set"
              label="Notes"
              color="secondary"
              multiline
              rows={3}
              onChange={handleNotesChange}
              helperText={`${notes.length}/300 characters`}
              inputProps={{
                maxLength: 300,
              }}
              sx={{
                width: '300px',
              }}
            />
          </Box>
          <Box>
            <Button>Cancel</Button>
            <Button>Submit</Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
