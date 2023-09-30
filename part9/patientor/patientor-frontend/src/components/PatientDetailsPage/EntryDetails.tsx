import { Diagnosis, Entry } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Map<Diagnosis['code'], Diagnosis>
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  
}

export default EntryDetails;