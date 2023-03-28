import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OperatorService from "../../api/OperatorService";


export default function OperatorInfo() {
    const navigate = useNavigate();

    const handleCancelClick = () => {
        navigate("/operator/operator-profile/");
    }

    const para = useParams() as { id: string };

    const [businessName, setBusinessName]=useState("");

    const [permitNumber, setPermitNumber]=useState("");


    useEffect(() => {
        OperatorService.getOperatorbyOperatorId(para.id).then((response) => {
            setBusinessName(response.data.businessName)
            setPermitNumber(response.data.permitNumber)
        }).catch((error) => {
          console.log(error);
        })
      }, []);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBusinessName(e.target.value);
    };

    const putBusinessInfo = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/operator/putOperator?operatorId=${para.id}`,{
            businessName: businessName,
        })
        .then((res:any)=> {console.log('Editing Data'); navigate("/operator/operator-profile/");})
        .catch((err:string) => console.log(err))
    };

    return (
        <Grid component="form" onSubmit={putBusinessInfo}>
            <div className="one">
                <div>
                    <h2 style={{textAlign: 'left', color: '#90794C'}}>Business Information</h2>
                    <hr className="line"></hr><br></br>
                </div>
                <TextField required id="outlined-required" label="Business Name" name="businessName" value={businessName} onChange={handleNameChange} sx={{margin: 2}}/>
                <TextField disabled id="outlined-disabled" label="Business Permit Number" name="permitNumber" value={permitNumber} sx={{margin: 2}}/>
            </div>
            
            <Stack direction="row" justifyContent="end" padding={3}>
                <Button variant="contained" onClick={handleCancelClick} style={{backgroundColor: '#828E99', marginTop: 25, paddingInline: 40}}>Cancel</Button>
                <Button variant="contained" type="submit" style={{backgroundColor: '#D2A857', marginTop: 25, paddingInline: 20, marginLeft: 15}}>Save Changes</Button>
            </Stack>
            
        </Grid>
          
            
    )
}