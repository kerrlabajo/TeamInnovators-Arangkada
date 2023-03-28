import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DriverService from "../../api/DriverService";


export default function EditLicense() {
    const navigate = useNavigate();

    const handleCancelClick = () => {
        navigate("/driver/driverprofile/");
    }

    const para = useParams() as { id: string };

    const [licenseNumber, setLicenseNumber] = useState("");

    const [licenseCode, setLicenseCode ] = useState("");

    useEffect(() => {
        DriverService.getDriverbyDriverId(para.id).then((response) => {
            setLicenseNumber(response.data.licenseNumber)
            setLicenseCode(response.data.licenseCode)
        }).catch((error) => {
          console.log(error);
        })
      }, []);

    const handleLicenseCodeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLicenseCode(e.target.value);
    };


    const putLicenseCode = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/driver/putDriver?driverId=${para.id}`,{
            licenseCode: licenseCode,
        })
        .then((res:any)=> {console.log('Editing Data'); navigate("/driver/driverprofile/");})
        .catch((err:string) => console.log(err))
    };

    
    return (
        <Grid component="form" onSubmit={putLicenseCode}>
        <div className="one">
            <div>
                <h2 style={{textAlign: 'left', color: '#90794C'}}>License Information</h2>
                <hr className="line"></hr><br></br>
            </div>
            <TextField disabled id="outlined-disabled" label="License Number" name="licenseNumber" value={licenseNumber} sx={{margin: 2}}/>
            <TextField required id="outlined-required" label="License Code" name="licenseCode" value={licenseCode} onChange={handleLicenseCodeChange} sx={{margin: 2}}/>
        </div>
        <Stack direction="row" justifyContent="end" padding={3}>
            <Button variant="contained" onClick={handleCancelClick} style={{backgroundColor: '#828E99', marginTop: 25, paddingInline: 40}}>Cancel</Button>
            <Button variant="contained" type="submit" style={{backgroundColor: '#D2A857', marginTop: 25, paddingInline: 20, marginLeft: 15}}>Save Changes</Button>
        </Stack>
        
    </Grid>
          
            
    )
}