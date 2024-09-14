import { FormGroup, FormLabel } from '@mui/material';
import React from 'react';
import { ApiPermission } from 'vl-shared/src/enum/ApiPermission';

import { PermissionCheck } from './PermissionCheck';

type PermissionCheckProps = {
  label: string;
  value: ApiPermission;
  roles: Set<ApiPermission>;
  child: ApiPermission[];
  parent?: ApiPermission[];
  setRoles: React.Dispatch<React.SetStateAction<Set<ApiPermission>>>;
};
export const PermissionCheckGroup: React.FC<PermissionCheckProps> = (props) => {
  const { label, roles, setRoles, value, child = [], parent = [] } = props;
  const childParents = React.useMemo(() => {
    return [...parent, value];
  }, [parent, value]);
  return (
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      <PermissionCheck
        roles={roles}
        setRoles={setRoles}
        value={value}
        child={child}
        parent={parent}
      />
      {child?.map((role) => {
        return (
          <PermissionCheck
            key={role}
            indent
            roles={roles}
            setRoles={setRoles}
            parent={childParents}
            value={role}
          />
        );
      })}
    </FormGroup>
  );
};
