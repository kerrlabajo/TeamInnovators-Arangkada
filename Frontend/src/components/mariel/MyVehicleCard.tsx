import { Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, Typography } from "@mui/material";
import { Vehicle } from "../../api/dataTypes";
import RouteIcon from '@mui/icons-material/Route';
import { Link, } from "react-router-dom";


type MyVehicleCardProps = {
  myVehicle: Vehicle,
}

const MyVehicleCard = ({ myVehicle }: MyVehicleCardProps) => {
  return (
    <>
      <Card>
        <CardHeader
          title={myVehicle.plateNumber}
          subheader={<Stack spacing={0.5} direction="row" alignItems="center">
            <RouteIcon /> <Typography variant="body1">{myVehicle.route}</Typography>
          </Stack>}
          action={
            <Link to={"/operator/vehicles/view/" + myVehicle.vehicleId} style={{ textDecoration: 'none' }}>
              <Button
                variant="text"
                fullWidth
                size="small"
                sx={{ color: "gray", marginTop: 5, }} >
                Vehicle ID: {myVehicle.vehicleId}
              </Button>
            </Link>
          }
        />
        <Divider />
        <CardContent>
          <Typography
            variant="body1">Type: <b>{myVehicle.vehicleType}</b>
          </Typography>
          <Typography
            variant="body1">Make and Model: <b>{myVehicle.makeModel}</b>
          </Typography>
          <Typography
            variant="body1">VIN: <b>{myVehicle.vin}</b>
          </Typography>
          <Typography
            variant="body1">OR, CR Status: <b>{myVehicle.orStatus}</b>
          </Typography>
          <Typography
            variant="body1">Vehicle Condition: <b>{myVehicle.vehicleCondition}</b>
          </Typography>
        </CardContent>
        <CardActions>
          <Stack direction={{ xs: "column-reverse", md: "row" }} width="100%" spacing={{ xs: 2, md: 3 }} justifyContent="end" padding={1}>
            <Link to={"/operator/vehicles/delete/" + myVehicle.vehicleId} style={{ textDecoration: 'none' }}>
              <Button
                size="small"
                variant="contained"
                className='remove'
                color="error"
                sx={{ width: "150px" }}>
                Remove
              </Button>
            </Link>
            <Link to={"/operator/vehicles/update/" + myVehicle.vehicleId} style={{ textDecoration: 'none' }}>
              <Button
                size="small"
                variant="contained"
                sx={{ width: "150px" }}>
                Update
              </Button>
            </Link>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
}
export default MyVehicleCard;