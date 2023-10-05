import { Dayjs } from "dayjs";
import { EntryType, HealthCheckRating } from "../../types";
import HealthCheckEntryInfo from "./HealthCheckEntryInfo";
import HospitalEntryInfo from "./HospitalEntryInfo";
import OccupationalEntryInfo from "./OccupationalEntryInfo";

const assertNever = (object: never): never => {
  throw new Error("Unexpected object: " + object);
}

interface Props {
  type: EntryType
  employerName: string,
  healthCheckRating: HealthCheckRating,
  discharge: { date: Dayjs | null, criteria: string }
  sickLeave: { startDate: Dayjs | null, endDate: Dayjs | null }
  setEmployerName: React.Dispatch<React.SetStateAction<string>>
  setHealthCheckRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>,
  setDischarge: React.Dispatch<React.SetStateAction<{ date: Dayjs | null, criteria: string }>>,
  setSickLeave: React.Dispatch<React.SetStateAction<{ startDate: Dayjs | null, endDate: Dayjs | null }>>,
}

const AdditionalEntryInfo = (props: Props) => {
  switch (props.type) {
    case EntryType.HealthCheck:
      return (
        <HealthCheckEntryInfo 
          rating={props.healthCheckRating} 
          setRating={props.setHealthCheckRating}
        />
      );
    case EntryType.Hospital:
      return (
        <HospitalEntryInfo
          discharge={props.discharge}
          setDischarge={props.setDischarge}
        />
      );
    case EntryType.OccupationalHealthcare:
      return (
        <OccupationalEntryInfo 
          employerName={props.employerName}
          setEmployerName={props.setEmployerName}
          sickLeave={props.sickLeave}
          setSickLeave={props.setSickLeave}
        />
      );
    default:
      return assertNever(props.type);
  }
}

export default AdditionalEntryInfo;