import TransgenderIcon from '@mui/icons-material/Transgender';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Gender } from '../../../types';

interface Props {
  gender: Gender;
}

const GenderIcon = ({ gender }: Props) => {
  switch (gender) {
    case Gender.Female:
      return <FemaleIcon />;
    case Gender.Male:
      return <MaleIcon />;
    default:
      return <TransgenderIcon />;
  }
}

export default GenderIcon;