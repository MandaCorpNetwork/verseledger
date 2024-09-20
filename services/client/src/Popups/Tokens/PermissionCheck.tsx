import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { ApiPermission } from 'vl-shared/src/enum/ApiPermission';

type PermissionCheckProps = {
  label?: string;
  value: ApiPermission;
  roles: Set<ApiPermission>;
  child?: ApiPermission[];
  parent?: ApiPermission[];
  indent?: boolean;
  setRoles: React.Dispatch<React.SetStateAction<Set<ApiPermission>>>;
};
export const PermissionCheck: React.FC<PermissionCheckProps> = (props) => {
  const { label, roles, setRoles, value, child = [], parent, indent } = props;
  const isInteterminate = React.useMemo(() => {
    const setIndRoles = child.map((role) => roles.has(role)).filter((v) => v);
    if (setIndRoles.length === 0) return false;
    if (setIndRoles.length === child.length) return false;
    return true;
  }, [roles, child]);
  const hasParent = React.useMemo(() => {
    if (parent == null) return false;
    return parent.map((role) => roles.has(role)).filter((v) => v).length > 0;
  }, [parent, roles]);
  const onClick = React.useCallback(() => {
    if (roles.has(value)) {
      roles.delete(value);
    } else {
      roles.add(value);
    }
    setRoles(new Set(roles));
  }, [roles, setRoles, value]);
  return (
    <FormControlLabel
      sx={{ ml: indent ? 3 : 0 }}
      label={label ?? value.replace(/_/g, '::')}
      control={
        <Checkbox
          value={value}
          disabled={hasParent}
          checked={roles.has(value) || hasParent}
          indeterminate={isInteterminate}
          onClick={onClick}
        />
      }
    />
  );
};
