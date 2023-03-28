import { Grid } from "@mui/material"
import MyVehicleCard from "./MyVehicleCard"
import { Vehicle } from "../../api/dataTypes";

type MyVehicleCardListProps = {
  myVehicle: Vehicle[],
}

const MyVehicleCardList = ({ myVehicle }: MyVehicleCardListProps) => {
  return ( 
    <Grid container spacing={2}>
      {myVehicle.map((myVehicle) => (
        <Grid xs={12} md={12} lg={12} item key={myVehicle.vehicleId}>
          <MyVehicleCard myVehicle={myVehicle} />
        </Grid>
      ))}
      
    </Grid>
    
   );
}
 
export default MyVehicleCardList;