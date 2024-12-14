import { Warning } from '@mui/icons-material';
import {
  Box,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import type { ApiPermission } from 'vl-shared/src/enum/ApiPermission';

type PermissionGroupProps = {
  readwrite?: ApiPermission;
  disableNone?: boolean;
  read?: ApiPermission;
  write?: ApiPermission;
  writePrivilaged?: boolean;
  title: string;
  description: string;
  privilaged?: boolean;
  rolesState: [
    Set<ApiPermission>,
    React.Dispatch<React.SetStateAction<Set<ApiPermission>>>,
  ];
};
export const PermissionGroup: React.FC<PermissionGroupProps> = (props) => {
  const {
    description,
    title,
    read,
    write,
    disableNone,
    rolesState,
    privilaged,
    writePrivilaged,
  } = props;
  const [roles, setRoles] = rolesState;
  const currentValue =
    read && roles.has(read) ? read : write && roles.has(write) ? write : '$NONE';
  const onChange = React.useCallback(
    (event: SelectChangeEvent<ApiPermission | '$NONE'>) => {
      const newValue = event.target.value as ApiPermission | '$NONE';
      if (currentValue != '$NONE') roles.delete(currentValue);
      if (newValue != '$NONE') roles.add(newValue);
      const newRoles = new Set(roles); // Break refs and force re-render
      setRoles(newRoles); // Dispatch new ref
    },
    [roles, setRoles, currentValue],
  );
  return (
    <Box display="flex" width="100%" border={1} padding={1}>
      <Box>
        <Typography color={privilaged ? 'red' : 'white'} margin="auto">
          {title}
          {privilaged && (
            <Tooltip title="This permission is Privilaged. Be CAREFUL giving this out.">
              <Warning fontSize="small" sx={{ color: 'red', ml: 1 }} />
            </Tooltip>
          )}
        </Typography>
        <Typography color="darkgray">{description}</Typography>
      </Box>
      <Box marginLeft="auto" marginTop="auto" marginBottom="auto">
        <Select value={currentValue} variant="standard" onChange={onChange}>
          {!disableNone && <MenuItem value={'$NONE'}>No access</MenuItem>}
          {read && <MenuItem value={read}>Read-only</MenuItem>}
          {write && (
            <MenuItem value={write}>
              <Typography color={writePrivilaged ? 'red' : 'white'}>
                Read and Write
              </Typography>
              {writePrivilaged && (
                <Tooltip title="This permission is Privilaged. Be CAREFUL giving this out.">
                  <Warning fontSize="small" sx={{ color: 'red', ml: 1 }} />
                </Tooltip>
              )}
            </MenuItem>
          )}
        </Select>
      </Box>
    </Box>
  );
};
