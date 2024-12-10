import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { RatingDisplay } from '@CommonLegacy/Components/App/RatingDisplay';
import { Divider, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/auth.selectors';

type ContractorInfoProps = {
  willChange: boolean;
};

export const ContractorInfo: React.FC<ContractorInfoProps> = ({ willChange }) => {
  const currentUser = useAppSelector(selectCurrentUser);

  const overallRating = currentUser?.display_rating ?? -1;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: '1em',
      }}
    >
      {!willChange && (
        <>
          <Typography variant="h4" sx={{ color: 'text.secondary' }}>
            Select A Contract
          </Typography>
          <Divider sx={{ width: '20%', my: '2em' }} />
        </>
      )}

      <FeatureDisplay sx={{ p: '1em' }}>
        <Typography variant="h4" sx={{ color: 'text.secondary' }}>
          {currentUser?.displayName}
        </Typography>
        <Divider sx={{ borderBottomColor: 'primary.light', opacity: '0.5' }} />
        <div
          style={{ gap: '1em', display: 'flex', flexDirection: 'column', width: '100%' }}
        >
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', fontWeight: 'bold', mt: '.5em' }}
          >
            Ratings Breakdown:
          </Typography>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-around',
            }}
          >
            <Typography variant="body2" sx={{ color: 'secondary.light' }}>
              Overall Rating:
            </Typography>
            <RatingDisplay value={overallRating} variant="defined" size="small" />
          </div>
        </div>
      </FeatureDisplay>
    </div>
  );
};
