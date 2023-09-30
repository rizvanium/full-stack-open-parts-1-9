import { Box, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";

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
      {entries.map(entry => 
        <div key={entry.id}>
          <Typography variant="subtitle2">
            {entry.date} {entry.description}
          </Typography>
          <ul>
            {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses.get(code)?.name}</li>)}
          </ul>
        </div>
      )}
    </Box>
  )
}

export default Entries;