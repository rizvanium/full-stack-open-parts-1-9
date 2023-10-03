import { Box, Button, Checkbox, Container, FormControl, Input, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, Slider, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { Diagnosis, HealthCheckRating } from "../../types";
import { DateField } from "@mui/x-date-pickers";
import { Dayjs } from 'dayjs';

interface Props {
  diagnoses: Map<Diagnosis['code'], Diagnosis>;
}

const PatientEntryForm = ({ diagnoses }: Props) => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>(Object.keys([]));
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
  console.log('healthcheck rating', healthCheckRating);
  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
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
        <Button variant="contained" color="success">add</Button>
      </Box>
    </Box>
  )
};

export default PatientEntryForm;