import { Typography } from "@mui/material";
import EntryIcon from "../../Icons/EntryIcon";
import { HospitalEntry } from "../../../../types";

interface Props {
  entry: HospitalEntry;
}

const HospitalEntryDetails = ({ entry }: Props) => {
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

export default HospitalEntryDetails;