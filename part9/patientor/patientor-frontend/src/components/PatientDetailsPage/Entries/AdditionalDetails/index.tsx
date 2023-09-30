import { Entry } from "../../../../types";
import OccupationalEntryDetails from "./OccupationalEntryDetails";
import HealthcheckEntryDetails from "./HealthCheckDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";

const assertNever = (object: never): never => {
  throw new Error("Unexpected object: " + object);
}

interface AdditionalDetailsProps {
  entry: Entry;
}

const AdditionalDetails = ({ entry }: AdditionalDetailsProps) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry}/>
    case 'HealthCheck':
      return <HealthcheckEntryDetails entry={entry} />
    case 'OccupationalHealthcare':
      return <OccupationalEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
}

export default AdditionalDetails;
