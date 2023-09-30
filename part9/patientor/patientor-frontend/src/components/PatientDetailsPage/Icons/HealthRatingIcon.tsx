import HeartIcon from '@mui/icons-material/Favorite';
import { HealthCheckRating } from '../../../types';

interface Props {
  rating: HealthCheckRating;
}

const assertNever = (object: never): never => {
  throw new Error("Unexpected entry type in HealthRatingIcon: " + object);
}

const HealthRatingIcon = ({ rating }: Props) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <HeartIcon sx={{color: 'green'}} />;
    case HealthCheckRating.LowRisk:
      return <HeartIcon sx={{color: 'orange'}}/>;
    case HealthCheckRating.HighRisk:
      return <HeartIcon sx={{color: 'red'}}/>;
    case HealthCheckRating.CriticalRisk:
      return (
        <>
          <HeartIcon sx={{color: 'red'}}/>
          <HeartIcon sx={{color: 'red'}}/>
        </>
      );
    default:
      return assertNever(rating);
  }
}

export default HealthRatingIcon;