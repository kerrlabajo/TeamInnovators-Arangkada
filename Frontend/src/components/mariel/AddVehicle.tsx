import { ChangeEvent, useContext, useState } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VehicleService from "../../api/VehicleService";
import { UserContext, UserContextType } from "../../helpers/UserContext";
import { SnackbarContext, SnackbarContextType } from "../../helpers/SnackbarContext";

const MyVehicleForm = () => {
    const { user } = useContext(UserContext) as UserContextType;
    const navigate = useNavigate();
    const { handleSetMessage } = useContext(SnackbarContext) as SnackbarContextType;

    const [data, setData] = useState({
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

    const onSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if(user !== null) {
            VehicleService.postVehicle({
                vehicleId: -1,
                plateNumber: data.plateNumber,
                route: data.route,
                vehicleType: data.vehicleType,
                vin: Number(data.vin),
                makeModel: data.makeModel,
                rentalFee: Number(data.rentalFee),
                operator: {
                    operatorId: +user.userId, businessName: "", permitNumber: "", account: {
                        accountId: -1,
                        firstname: "",
                        middlename: "",
                        lastname: "",
                        birthdate: "",
                        age: 0,
                        contactNumber: "",
                        address: "",
                        gender: "",
                        username: "",
                        password: "",
                        accountType: "",
                    }
                },
                orStatus: data.orStatus,
                vehicleCondition: data.vehicleCondition,
                rented: data.rented,
            })
            .then((res: any) => {
                console.log('Posting Data')
                handleSetMessage("Vehicle Successfully Added.");
                navigate('/operator/vehicles')
            })
            .catch((error) => {
                handleSetMessage("Failed to add vehicle. Please check the correct details.");
            })
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleSelectChange = (event: SelectChangeEvent) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }
    return (
        <Grid container spacing={4} onSubmit={onSubmit} component="form">
           
            <Grid item xs={12} md={4}>
                <TextField
                    onChange={handleChange}
                    value={data.plateNumber}
                    name="plateNumber"
                    label="Plate Number"
                    size="small"
                    fullWidth
                    required
                >
                </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField
                    onChange={handleChange}
                    value={data.route}
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
                    value={data.vehicleType}
                    name="vehicleType"
                    label="Vehicle Type"
                    size="small"
                    required
                    fullWidth
                >
                </TextField>
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField
                    onChange={handleChange}
                    value={data.vin}
                    label="VIN"
                    name="vin"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                >
                </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small">
                    <InputLabel>OR, CR Status</InputLabel>
                    <Select
                        value={data.orStatus}
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
                        value={data.vehicleCondition}
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
                    value={data.makeModel} label="Make and Model"
                    size="small"
                    variant="outlined"
                    name="makeModel"
                    required
                    fullWidth
                >
                </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    onChange={handleChange}
                    value={data.rentalFee}
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
                    <Button onClick={() => navigate(-1)} color="secondary" variant="contained" sx={{ width: "250px" }}>Cancel</Button>
                    <Button type="submit" variant="contained" sx={{ width: "250px" }}>Add Vehicle</Button>
                </Stack>
            </Grid>
        </Grid>
    );
}
export default MyVehicleForm;