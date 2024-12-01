import React from 'react';

export const RankAndRoles: React.FC = () => {
  return (
    <div
      data-testid="OrgManager-PanelDisplay__Rank&Roles_Container"
      style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}
    >
      <div
        data-testid="OrgManager-PanelDisplay-Rank&Roles__Panel_Container"
        style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '1em' }}
      ></div>
    </div>
  );
};
