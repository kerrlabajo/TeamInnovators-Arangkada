import { Grid } from "@mui/material";
import { Vehicle } from "../../api/dataTypes";
import VehicleCard from "./VehicleCard";

type VehicleCardListProps = {
  vehicles: Vehicle[],
}

const VehicleCardList = ({ vehicles }: VehicleCardListProps) => {
  return (
    <Grid container spacing={2}>
      {vehicles.map((vehicle) => (
        <Grid xs={12} item key={vehicle.vehicleId}>
          <VehicleCard vehicle={vehicle} />
        </Grid>
      ))}
    </Grid>
  );
}

export default VehicleCardList;