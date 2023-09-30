import { Typography } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../../../types";
import EntryIcon from "../../Icons/EntryIcon";

interface Props {
  entry: OccupationalHealthcareEntry;
}

const OccupationalEntryDetails = ({ entry }: Props) => {
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

export default OccupationalEntryDetails;