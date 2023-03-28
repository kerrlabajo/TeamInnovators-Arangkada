import { AccountBalance } from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AccountService from "../../api/AccountService";
import { Account } from "../../api/dataTypes";
import DriverService from "../../api/DriverService";
import driver from '../../images/driver.png';


export default function RegistrationDriver() {

    const navigate = useNavigate();
    const location = useLocation();

    const [data, setData]= useState({
        licenseNumber: "",
        licenseCode: "",
    })


    const postDriver = async (event: { preventDefault: () => void; }) =>{
        event.preventDefault();
        
        
        AccountService.getAccountById (
            location.state.accountId
        )
        .then((res)=> {
            console.log(res.data)
            DriverService.postDriver(  {
                driverId:-1,
                licenseNumber: data.licenseNumber,
                licenseCode:data.licenseCode,
                account:{
                    accountId: Number(res.data.accountId),
                    firstname: res.data.firstname,
                    middlename: res.data.middlename,
                    lastname: res.data.lastname,
                    birthdate: res.data.birthdate,
                    age: res.data.age,
                    contactNumber: res.data.contactNumber,
                    address: res.data.address,
                    gender: res.data.gender,
                    username: res.data.username,
                    password: res.data.password,
                    accountType: res.data.accountType,
                }   
            })
            .then((res:any)=> console.log('Posting Data'))
            .catch((err:string) => console.log(err))

        })
        .catch((err:string) => console.log(err))


    
        navigate("/landing"); 
        
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });

    };

    const handleSubmitClick = () => {
        navigate("/landing/");
    }

    return (
        <Grid onSubmit={postDriver} component="form">
        <div className="contain2">
           <h3>You are a Driver!</h3>
           <img src={driver} style={{width: 210, height: 210, marginLeft:'150px', marginRight:'150px'}}/>
           <i><p style={{fontSize: '15px'}}>Please fill further information</p></i>
           <TextField required id="outlined-basic" label="License Number" name="licenseNumber" variant="outlined" value={data.licenseNumber} onChange={handleChange} sx={{margin: 1, width: { sm: 400, md: 400 }}}/><br></br>
           <TextField required id="outlined-basic" label="License Code" name="licenseCode" variant="outlined" value={data.licenseCode} onChange={handleChange} sx={{margin: 1, width: { sm: 400, md: 400 }}}/><br></br>
           <Button variant="contained" type="submit" style={{backgroundColor: '#D2A857', marginTop: 25, paddingInline: 40, marginBottom: '45px'}}>SUBMIT</Button><br></br>
        </div>
        </Grid>
    )
}