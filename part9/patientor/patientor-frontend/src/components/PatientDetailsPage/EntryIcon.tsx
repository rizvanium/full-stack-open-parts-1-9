import WorkIcon from '@mui/icons-material/Work';
import HospitalIcon from '@mui/icons-material/LocalHospital';
import HealthCheckIcon from '@mui/icons-material/MedicalServices';
import { Entry } from '../../types';

const assertNever = (object: never): never => {
  throw new Error("Unexpected entry type in EntryIcon: " + object);
}

interface Props {
  entry: Entry;
}

const EntryIcon = ({ entry }: Props) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalIcon />;
    case 'HealthCheck':
      return <HealthCheckIcon />;
    case 'OccupationalHealthcare':
      return <WorkIcon />;
    default:
      return assertNever(entry);
  }
}

export default EntryIcon;