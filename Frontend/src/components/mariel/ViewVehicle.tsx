import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Button, FormControl, Grid,  InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import VehicleService from "../../api/VehicleService";
import axios from "axios";
import { SnackbarContext, SnackbarContextType } from "../../helpers/SnackbarContext";


const ViewandUpdateVehicle  = () =>{
    
    const navigate = useNavigate();
    const para = useParams() as { id: string };
    const { handleSetMessage } = useContext(SnackbarContext) as SnackbarContextType;
    
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
    const updateVehicle = async (e: { preventDefault: () => void; }) => {
        
        e.preventDefault();
        await axios.put(`http://localhost:8080/vehicle/putVehicle/${para.id}`,{
        route:vehicle.route,
        rentalFee:Number(vehicle.rentalFee),
        orStatus:vehicle.orStatus,
        vehicleCondition:vehicle.vehicleCondition
    })
    .then((res: any) => {
        console.log('Editing data.........')
        handleSetMessage("Edited Successfully.");
    }).catch((error) => {
        handleSetMessage(error.message + ". Failed to edit details.");
      })
    };

    useEffect(() => {
        VehicleService.getVehicleByVehicleId(para.id).then((response) => {
        setVehicle(response.data);
        }).catch((error) => {
        console.log(error);
        })
    }, []);
     
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    };
    const handleSelectChange = (event: SelectChangeEvent) => {
        setVehicle({ ...vehicle, [event.target.name]: event.target.value });
    }
    return ( 
        <>
        <Grid container spacing={4} onSubmit={updateVehicle}component="form">
        <Grid item xs={12} md={4}>
           <TextField 
                onChange={handleChange} 
                disabled
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
                onChange={handleChange} 
                value={route} 
                name="route"
                label="Route" 
                size="small" 
                fullWidth 
                required
            > 
            </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
           <TextField 
                onChange={handleChange} 
                value={vehicleType}
                name="vehicleType"
                disabled
                label="Vehicle Type" 
                size="small" 
                fullWidth 
            >
           </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField 
                onChange={handleChange} 
                value={vin}
                label="VIN" 
                name="vin"
                disabled
                size="small" 
                variant="outlined" 
                fullWidth
            >
            </TextField>
            </Grid>
        <Grid item xs={12} md={6}>
            <TextField 
                value={rented===false?"Not Rented" : "Rented"}
                disabled
                onChange={handleChange} 
                label="Rental Status" 
                size="small" 
                name="rented"
                fullWidth
                variant="outlined" 
            >
            </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
                <InputLabel >OR, CR Status</InputLabel>
                    <Select
                        value={orStatus}
                        label="OR, CR Status"
                        required
                        name="orStatus"
                        size="small" 
                        onChange={handleSelectChange}
                    >
                        <MenuItem value={'Updated'}>Updated</MenuItem>
                        <MenuItem value={'Renewed'}>Renewed</MenuItem>
                        <MenuItem value={'Expired'}>Expired</MenuItem> 
                    </Select>  
            </FormControl> 
        </Grid>
        <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
                <InputLabel >Vehicle Condition</InputLabel>
                    <Select
                        value={vehicleCondition}
                        label="Vehicle Condition"
                        required
                        name="vehicleCondition"
                        size="small" 
                        onChange={handleSelectChange}
                    >
                        <MenuItem value={'Ready To Use'}>Ready To Use</MenuItem>
                        <MenuItem value={'Not Ready To Use'}>Not Ready To Use</MenuItem> 
                    </Select>  
            </FormControl> 
        </Grid>
            <Grid item xs={12} md={6}>
                <TextField 
                    onChange={handleChange} 
                    value={makeModel}label="Make and Model" 
                    size="small" 
                    variant="outlined" 
                    disabled
                    name="makeModel"
                    fullWidth
                >
                </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField 
                    onChange={handleChange} 
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
              <Button  onClick={() => navigate(-1)} color="secondary" variant="contained" sx={{ width: "250px" }}>Cancel</Button>
              <Button  type="submit" variant="contained" sx={{ width: "250px"}}>Save Changes</Button> 
            </Stack>
            </Grid>
        </Grid>
        </>
       );
    }
export default ViewandUpdateVehicle;