import WorkIcon from '@mui/icons-material/Work';
import HospitalIcon from '@mui/icons-material/LocalHospital';
import HealthCheckIcon from '@mui/icons-material/MedicalServices';
import { Entry, EntryType } from '../../../types';

const assertNever = (object: never): never => {
  throw new Error("Unexpected entry type in EntryIcon: " + object);
}

interface Props {
  entry: Entry;
}

const EntryIcon = ({ entry }: Props) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <HospitalIcon />;
    case EntryType.HealthCheck:
      return <HealthCheckIcon />;
    case EntryType.OccupationalHealthcare:
      return <WorkIcon />;
    default:
      return assertNever(entry);
  }
}

export default EntryIcon;