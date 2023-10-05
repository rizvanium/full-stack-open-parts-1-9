import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { HealthCheckRating } from "../../types";

interface Props {
  rating: HealthCheckRating;
  setRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>
}

const HealthCheckEntryInfo = ({ rating, setRating }: Props) => {
  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel id="health-check-rating-label">HealthCheck Rating</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={rating}
        onChange={({ target: { value } }) => setRating(value as HealthCheckRating)}
      >
        <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
        <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
        <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
        <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk</MenuItem>
      </Select>
    </FormControl>
  );
};

export default HealthCheckEntryInfo;