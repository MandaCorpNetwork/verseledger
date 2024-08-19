import GlassBox from '@Common/Components/Boxes/GlassBox';
import { Button, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { POPUP_CREATE_TOKEN } from '@Popups/Tokens/CreateToken';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { deleteUserToken } from '@Redux/Slices/Tokens/Actions/deleteUserToken';
import { fetchUserTokens } from '@Redux/Slices/Tokens/Actions/fetchUserTokens';
import { selectTokensArray } from '@Redux/Slices/Tokens/tokenSelectors';
import ms from 'ms';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type DeveloperSettingsProps = {
  onClose: () => void;
};

export const DeveloperSettings: React.FC<DeveloperSettingsProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokensArray);
  useEffect(() => {
    dispatch(fetchUserTokens());
  }, []);
  const deleteToken = React.useCallback(
    (token_id: string) => {
      dispatch(deleteUserToken(token_id));
    },
    [dispatch],
  );
  return (
    <GlassBox sx={{ minHeight: '100%', minWidth: '100%' }}>
      <Typography>Developer Settings</Typography>
      <Button
        variant="contained"
        sx={{ maxWidth: '10em' }}
        onClick={() => {
          navigate('/api-docs');
          onClose();
        }}
      >
        View API Docs
      </Button>
      <Typography sx={{ mt: '1em' }}>Api Tokens</Typography>
      <GlassBox sx={{ maxHeight: '25em', maxWidth: '45em', overflow: 'auto' }}>
        <Table>
          <TableBody>
            {tokens.map((token) => {
              console.log(token);
              return (
                <TableRow key={token.id}>
                  <TableCell>{token.name}</TableCell>
                  <TableCell>
                    Expires in{' '}
                    {ms(new Date(token.expiresAt).getTime() - Date.now(), {
                      long: true,
                    })}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => deleteToken(token.token_id)}
                    >
                      Delete Token
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </GlassBox>
      <Button
        variant="popupButton"
        sx={{ maxWidth: '15em' }}
        onClick={() => {
          dispatch(openPopup(POPUP_CREATE_TOKEN));
        }}
      >
        Create API Token
      </Button>
    </GlassBox>
  );
};
