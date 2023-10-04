import { Alert, Box, Button, Checkbox, FormControl, Input, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, Slider, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { Diagnosis, Entry, EntryType, HealthCheckRating } from "../../types";
import { DateField } from "@mui/x-date-pickers";
import { Dayjs } from 'dayjs';
import patientService from '../../services/patients';

interface Props {
  patientId: string | undefined,
  diagnoses: Map<Diagnosis['code'], Diagnosis>;
  handleNewEntry: (addedEntry: Entry) => void;
}

const PatientEntryForm = ({ patientId, diagnoses, handleNewEntry }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>(Object.keys([]));
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
  
  if (!patientId) {
    return null;
  }

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const addNewEntry = async () => {
    if (!date) {
      return;
    }

    try {
      const newEntry = await patientService.addEntry(patientId, {
        date: date.format('YYYY-MM-DD'),
        description,
        specialist,
        diagnosisCodes,
        type: EntryType.HealthCheck,
        healthCheckRating
      });
      handleNewEntry(newEntry);
    } catch (error) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      setTimeout(() => setError(null), 3000)
    }
  }

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Box sx={{borderStyle: 'dashed', marginTop: 3, padding: 1}}>
        <Typography variant="h6" fontWeight="bold" marginTop={1}>
          New HealthCheck Entry
        </Typography>
        <TextField
            fullWidth
            id="description"
            label="Description"
            variant="standard"
            value={description}
            onChange={({target: { value }}) => setDescription(value)}
        />
        <DateField label="Date" fullWidth variant="standard" value={date} onChange={(value) => setDate(value)}/>
        <TextField
            fullWidth
            id="specialist"
            label="Specialist"
            variant="standard"
            value={specialist}
            onChange={({target: { value }}) => setSpecialist(value)}
        />
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-multiple-name"
            multiple
            displayEmpty
            value={diagnosisCodes}
            onChange={handleChange}
            input={<Input fullWidth />}
            renderValue={(selected) => selected.join(', ')}
          >
            {Array.from(diagnoses.keys()).map((code) => (
              <MenuItem
                key={code}
                value={code}
              >
                <Checkbox checked={diagnosisCodes.indexOf(code) > -1} />
                <ListItemText primary={code} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="health-check-rating-label">HealthCheck Rating</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={healthCheckRating}
            onChange={({target: {value}}) => setHealthCheckRating(value as HealthCheckRating)}
          >
            <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
            <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
            <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
            <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{display: "flex", alignItems: 'center', justifyContent: 'space-between', marginTop: 2}}>
          <Button variant="contained" color="error">cancel</Button>
          <Button onClick={addNewEntry} variant="contained" color="success">add</Button>
        </Box>
      </Box>
    </>
  )
};

export default PatientEntryForm;