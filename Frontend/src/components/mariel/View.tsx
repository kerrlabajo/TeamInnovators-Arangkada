import {  useEffect, useState } from "react";
import { Button, FormControl, Grid,  InputLabel, MenuItem, Select, Stack, TextField, } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import VehicleService from "../../api/VehicleService";


const ViewandUpdateVehicle  = () =>{
    
    const navigate = useNavigate();
    const para = useParams() as { id: string };

    const [vehicle, setVehicle]= useState({
        plateNumber: "",
        route: "",
        vehicleType: "",
        makeModel: "",
        vin: "",
        orStatus: "",
        vehicleCondition: "",
        rentalFee: "",
        rented: false,
    })
    const { plateNumber, route, vehicleType, makeModel,vin,orStatus,vehicleCondition,rentalFee, rented} = vehicle;
    
  useEffect(() => {
    VehicleService.getVehicleByVehicleId(para.id).then((response) => {
      setVehicle(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }, []);

    return ( 
        <>
        <Grid container spacing={4} component="form">
        <Grid item xs={12} md={4}>
           <TextField 
                value={plateNumber} 
                name="plateNumber"
                label="Plate Number" 
                size="small"
                fullWidth 
            >
            </TextField> 
        </Grid>
        <Grid item xs={12} md={4}>
           <TextField
                value={route} 
                name="route"
                label="Route" 
                size="small"
                fullWidth 
            > 
            </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
           <TextField 
                value={vehicleType}
                name="vehicleType"
                label="Vehicle Type" 
                size="small"
                fullWidth 
            >
           </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField 
                value={vin}
                label="VIN" 
                name="vin"
                size="small"
                variant="outlined" 
                fullWidth
            >
            </TextField>
            </Grid>
        <Grid item xs={12} md={6}>
            <TextField 
                value={rented===false?"Not Rented" : "Rented"}
                size="small"
                label="Rental Status" 
                name="rented"
                fullWidth
                variant="outlined" 
            >
            </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
                <InputLabel >OR, CR Status</InputLabel>
                    <Select
                        value={orStatus}
                        label="OR, CR Status"
                        required
                        name="orStatus"
                        size="small"
                    >
                        <MenuItem value={'Updated'}>Updated</MenuItem>
                        <MenuItem value={'Renewed'}>Renewed</MenuItem>
                        <MenuItem value={'Expired'}>Expired</MenuItem> 
                    </Select>  
            </FormControl> 
        </Grid>
        <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
                <InputLabel>Vehicle Condition</InputLabel>
                    <Select
                        value={vehicleCondition}
                        label="Vehicle Condition"
                        required
                        name="vehicleCondition"
                        size="small"
                    >
                        <MenuItem value={'Ready To Use'}>Ready To Use</MenuItem>
                        <MenuItem value={'Not Ready To Use'}>Not Ready To Use</MenuItem> 
                    </Select>  
            </FormControl> 
        </Grid>
            <Grid item xs={12} md={6}>
                <TextField 
                    value={makeModel}label="Make and Model" 
                    size="small"
                    variant="outlined" 
                    name="makeModel"
                    fullWidth
                >
                </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField 
                    value={rentalFee}
                    label="Rental Fee" 
                    size="small"
                    variant="outlined"
                    name="rentalFee"
                    required 
                    fullWidth
                >
                </TextField>
            </Grid>
            <Grid item xs={12} >
            <Stack spacing={3} direction={{ xs: "column-reverse", md: "row" }} sx={{ justifyContent: "end" }}>
              <Button  onClick={() => navigate("/operator/vehicles")} color="secondary" variant="contained" sx={{ width: "250px" }}>Go Back</Button>
            </Stack>
            </Grid>
        </Grid>
        </>
       );
    }
export default ViewandUpdateVehicle;