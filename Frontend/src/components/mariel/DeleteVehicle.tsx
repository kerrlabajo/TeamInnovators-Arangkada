import {  useContext, useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, Grid,  MenuItem, Select, SelectChangeEvent, Stack, TextField,IconButton,InputAdornment, } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import VehicleService from "../../api/VehicleService";
import { SnackbarContext, SnackbarContextType } from "../../helpers/SnackbarContext";
import { UserContext, UserContextType } from "../../helpers/UserContext";

const MyVehicleDeleteForm  = () =>{
    const navigate = useNavigate();
    const para = useParams() as { id: string };
    const { user } = useContext(UserContext) as UserContextType;
    const { handleSetMessage } = useContext(SnackbarContext) as SnackbarContextType;
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);
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
    const [reason, setReason] = useState({
        deletionReason:""
    })
    const deleteVehicle = async(e: { preventDefault: () => void; })  => {
        e.preventDefault();
       if (password !== user?.password) {
            setPasswordError("Password is incorrect.")
        } 
        else{
        await axios.put(`http://localhost:8080/vehicle/putReason/${para.id}`,{
            deletionReason:reason.deletionReason
        })
        await axios.delete(`http://localhost:8080/vehicle/deleteVehicle/${para.id}`,{})
        .then((res: any) => {
            console.log('Deleting data....')
            handleSetMessage("Vehicle Successfully Deleted.");
            navigate('/operator/vehicles')
        })
        .catch((error) => {
            handleSetMessage(error.message + ". Failed to delete vehicle.");
        })
    }
    };
    useEffect(() => {
        VehicleService.getVehicleByVehicleId(para.id).then((response) => {
        setVehicle(response.data);
        })
        .catch((error) => {
        console.log(error);
        })
    }, []);

    const handleSelectChange = (event: SelectChangeEvent) => {
        setReason({ ...reason, [event.target.name]: event.target.value });
    }
    const handlePasswordShow = () => {
        setShowPassword(!showPassword);
    }
  return ( 
    <>
    <Grid container spacing={2} onSubmit={deleteVehicle} component="form" sx={{marginTop: 0, marginBottom: 5}}>
    <Grid item xs={12} md={6} sx={{marginLeft: 20, marginTop: 3}}>
      <FormControl fullWidth>
            <h2 style={{fontFamily:"sans-serif"}}> Reason for deletion: </h2>
                <Select
                    value={reason.deletionReason}
                    onChange={handleSelectChange}
                    sx={{margin: 1}}
                    name="deletionReason"
                    >
                    <MenuItem value={'Car Damaged'}>Car Damaged</MenuItem>
                    <MenuItem value={'Car Lost'}>Car Lost</MenuItem>
                    <MenuItem value={'Prefer not to say'}>Prefer not to say</MenuItem> 
                </Select>  
      </FormControl> 
    </Grid>
    <Grid item xs={12} md={6} sx={{marginLeft: 20, marginTop: 3}}>
        <h2 style={{fontFamily:"sans-serif"}}> Re-enter your password: </h2>
        <TextField 
                onChange={(event) => setPassword(event.target.value)}
                value={password} 
                type={showPassword ? "text" : "password"}
                fullWidth
                error={passwordError !== null}
                helperText={passwordError}
                name="password"
                id="filled-password-input"
                label="Password"
                required
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handlePasswordShow}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }} 
                autoComplete="current-password"
                variant="outlined"
                sx={{margin: 1, marginBottom: 3}}>
        </TextField> 
    </Grid>
    <Grid item xs={12} md={6} sx={{marginLeft: 21, marginTop: 2}}>
        <p style={{fontFamily:"sans-serif"}}> 
            If you choose to continue, this vehicle will be deleted and will not be visible in your account.
        </p>
    </Grid>
    <Grid item xs={12} md={12} sx={{marginLeft: 21, marginTop: 2}}>
        <h3 style={{fontFamily:"sans-serif"}}>
            Are you sure you want to delete this vehicle?
        </h3>
    </Grid>

        <Stack spacing={3} direction={{ xs: "column-reverse", md: "row" }} sx={{ marginTop:2, justifyContent: "end", marginLeft: "180px" }}>
          <Button type="submit" color="error" variant="contained" sx={{ width: "250px" }}>Delete</Button>
          <Button  onClick={() => navigate(-1)} color="primary"variant="contained" sx={{ width: "250px"}}>Cancel</Button>
        </Stack>
        
    </Grid>
    </>
    );
}
 
export default MyVehicleDeleteForm;