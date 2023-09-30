import { Box, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import EntryDetails from "./EntryDetails";

interface Props {
  entries: Entry[];
  diagnoses: Map<Diagnosis['code'], Diagnosis>
}

const Entries = ({ entries, diagnoses }: Props) => {
  if (entries.length === 0) {
    return (
      <Box sx={{marginTop: 3}}>
        <Typography variant="h6" fontWeight="bold">
          patient has no entries
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h6" fontWeight="bold">
        entries
      </Typography>
      {entries.map(entry => <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses}/>)}
    </Box>
  )
}

export default Entries;