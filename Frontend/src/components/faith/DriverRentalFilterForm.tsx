import { Search } from "@mui/icons-material";
import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

type DriverRentalFilterFormProps = {
  handleFilterSubmit: (filters: { driverName: string }) => void,
  handleFilterClear: () => void,
}

const DriverRentalFilterForm = ({ handleFilterSubmit, handleFilterClear }: DriverRentalFilterFormProps) => {
  const [filters, setFilters] = useState({ driverName: "" });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleFilterSubmit(filters);
  }

  const handleClear = () => {
    setFilters({ driverName: "" });
    handleFilterClear();
  }

  return (
    <Grid container spacing={2} onSubmit={handleSubmit} component="form">
      <Grid item xs={12} md={9}>
        <TextField
          onChange={(event) => setFilters({ ...filters, driverName: event.target.value })}
          value={filters.driverName}
          label="Search by Driver's Name"
          size="small"
          fullWidth
          InputProps={{ startAdornment: (<InputAdornment position="start"> <Search /> </InputAdornment>) }}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Button type="submit" fullWidth variant="contained" color="secondary">Search</Button>
      </Grid>
      <Grid item xs={12} md={3}>
        <Button onClick={handleClear} color="error" size="small">Clear Filters</Button>
      </Grid>
    </Grid>
  );
}

export default DriverRentalFilterForm;