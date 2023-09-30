import { Box, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../../../types";
import AdditionalDetails from "../AdditionalDetails";

interface Props {
  entry: Entry;
  diagnoses: Map<Diagnosis['code'], Diagnosis>
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