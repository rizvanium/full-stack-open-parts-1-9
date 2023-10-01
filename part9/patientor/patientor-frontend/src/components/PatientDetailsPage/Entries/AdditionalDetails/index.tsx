import { Entry, EntryType } from "../../../../types";
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
    case EntryType.Hospital :
      return <HospitalEntryDetails entry={entry}/>
    case EntryType.HealthCheck:
      return <HealthcheckEntryDetails entry={entry} />
    case EntryType.OccupationalHealthcare:
      return <OccupationalEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
}

export default AdditionalDetails;
