import { useState } from "react";
import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { Search, Person, LocationOn } from "@mui/icons-material";

type VehicleFilterFormProps = {
  handleFilterSubmit: (filters: { businessName: string, operatorName: string, route: string }) => void,
  handleFilterClear: () => void,
}

const VehicleFilterForm = ({ handleFilterSubmit, handleFilterClear }: VehicleFilterFormProps) => {
  const [filters, setFilters] = useState({ businessName: "", operatorName: "", route: "" });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleFilterSubmit(filters);
  }

  const handleClear = () => {
    setFilters({ businessName: "", operatorName: "", route: "" });
    handleFilterClear();
  }

  return (
    <Grid container spacing={2} onSubmit={handleSubmit} component="form">
      <Grid item xs={12} md={3}>
        <TextField
          onChange={(event) => setFilters({ ...filters, businessName: event.target.value })}
          value={filters.businessName}
          label="Search by Business Name"
          size="small"
          fullWidth
          InputProps={{ startAdornment: (<InputAdornment position="start"> <Search /> </InputAdornment>) }}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          onChange={(event) => setFilters({ ...filters, operatorName: event.target.value })}
          value={filters.operatorName}
          label="Operator Name"
          size="small"
          fullWidth
          InputProps={{ startAdornment: (<InputAdornment position="start"> <Person /> </InputAdornment>) }}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          onChange={(event) => setFilters({ ...filters, route: event.target.value })}
          value={filters.route}
          label="Route"
          size="small"
          fullWidth InputProps={{ startAdornment: (<InputAdornment position="start"> <LocationOn /> </InputAdornment>) }}
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

export default VehicleFilterForm;