import { useAppSelector } from '@Redux/hooks';
import { selectUserMembershipByOrgId } from '@Redux/Slices/Orgs/orgs.selectors';
import { useParams } from 'react-router-dom';

export const OrgManager: React.FC = () => {
  const { selectedOrgId } = useParams();
  const membership = useAppSelector((state) =>
    selectedOrgId ? selectUserMembershipByOrgId(state, selectedOrgId) : null,
  );
  const org = membership ? membership.Org : null;
  return (
    <div
      data-testid="OrgManage__Container"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}
    >
      {membership && org && <></>}
    </div>
  );
};
