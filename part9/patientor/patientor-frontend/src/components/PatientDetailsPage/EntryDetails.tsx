import { Box, Typography } from "@mui/material";
import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import EntryIcon from "./EntryIcon";
import HealthRatingIcon from "./HealthRatingIcon";

interface Props {
  entry: Entry;
  diagnoses: Map<Diagnosis['code'], Diagnosis>
}

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

interface OccupationalDetailsProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalEntryDetails = ({ entry }: OccupationalDetailsProps) => {
  return (
    <>
      <Typography variant="subtitle2">
        {entry.date}{' '}
        <EntryIcon entry={entry}/>{' '}
        {entry.employerName}
      </Typography>
      {entry.sickLeave && (
        <Typography variant="subtitle2">
          <b>Sick leave: </b>{entry.sickLeave.startDate}{' - '}{entry.sickLeave.endDate}
        </Typography>
      )}
    </>
  )
}

interface HealthcheckDetailsProps {
  entry: HealthCheckEntry;
}

const HealthcheckEntryDetails = ({ entry }: HealthcheckDetailsProps) => {
  return (
    <>    
      <Typography variant="subtitle2">
        {entry.date}{' '}
        <EntryIcon entry={entry}/>{' '}
        <HealthRatingIcon rating={entry.healthCheckRating}/>
      </Typography>
    </>
  )
}

interface HospitalDetailsProps {
  entry: HospitalEntry;
}

const HospitalEntryDetails = ({ entry }: HospitalDetailsProps) => {
  return (
    <>
      <Typography variant="subtitle2">
        {entry.date}{' '}
        <EntryIcon entry={entry}/>{' '}
      </Typography>
      <Typography variant="subtitle2" sx={{marginTop: 1, marginBottom: 1}}>
        <b>Discharged on:</b> {entry.discharge.date}<b>{'. Reason: '}</b>
        {entry.discharge.criteria}
      </Typography>
    </>
  )
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  return (
    <Box sx={{borderStyle: "solid", borderRadius: 1, padding: 1, marginTop: 2 }}>
      <AdditionalDetails entry={entry} />
      <Typography variant="subtitle2" fontStyle="italic">
        <b>Descrpition:</b> {entry.description}
      </Typography>
      <Typography variant="subtitle2" fontStyle="italic">
        <b>Diagnosis</b> by {entry.specialist}:
      </Typography>
      <ul>
        {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses.get(code)?.name}</li>)}
      </ul>
    </Box>
  );
}

export default EntryDetails;