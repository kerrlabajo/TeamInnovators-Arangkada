import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, InputAdornment, IconButton, Grid } from "@mui/material"
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountService from "../../api/AccountService";


export default function RegistrationForm() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [data, setData]= useState({
        firstname: "",
        middlename: "",
        lastname: "",
        birthdate: "",
        age: "",
        contactNumber: "",
        address: "",
        gender: "",
        username: "",
        password: "",
        accountType: "",
    })

    const postAccount = async (event: { preventDefault: () => void; }) =>{
        event.preventDefault();
        
        if(data.accountType==='Operator'){
            AccountService.postAccount(  {
                accountId:-1,
                firstname: data.firstname,
                middlename:data.middlename,
                lastname: data.lastname,
                birthdate:data.birthdate,
                age:Number(data.age),
                contactNumber:data.contactNumber,
                address:data.address,
                gender: data.gender,
                username: data.username,
                password: data.password,
                accountType: data.accountType,
            })
            .then((res)=> {console.log(res.data); navigate("/registration/register-operator/", {
                state: {
                   accountId: res.data.accountId
                }
            });} )
            .catch((err:string) => console.log(err))
    
            
        }else{
            //insert driver post here
            AccountService.postAccount(  {
                accountId:-1,
                firstname: data.firstname,
                middlename:data.middlename,
                lastname: data.lastname,
                birthdate:data.birthdate,
                age:Number(data.age),
                contactNumber:data.contactNumber,
                address:data.address,
                gender: data.gender,
                username: data.username,
                password: data.password,
                accountType: data.accountType,
            })
            .then((res)=> {console.log(res.data); navigate("/registration/registerdriver/", {
                state: {
                   accountId: res.data.accountId
                }
            });} )
            .catch((err:string) => console.log(err))
        }
        
    }

    const handlePasswordShow = () => {
        setShowPassword(!showPassword);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
        //console.log(e.target.name)
    };

    const handleLoginClick = () => {
        navigate("/login");
    }

    const handleSelectChange = (event: SelectChangeEvent) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }


    return (
        <Grid onSubmit={postAccount} component="form">
        <div className="regform">
            <strong><p style={{color: '#646464', textAlign: 'left', lineHeight: '.2em'}}>Registration</p></strong>
            <hr className="line"></hr>
                <div className="check">
                    <FormControl>
                    <InputLabel id="demo-simple-select-label" sx={{margin: 1}}>Account Type</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    required
                    value={data.accountType}
                    name="accountType"
                    label="Account Type"
                    onChange={handleSelectChange}
                    sx={{margin: 1, width:{sm: 700, md: 700}}}
                    >
                    <MenuItem value={'Operator'}>Operator</MenuItem>
                    <MenuItem value={'Driver'}>Driver</MenuItem>
                    </Select>
                    </FormControl>
                </div>
                
                <div className="three">
                    <TextField required id="outlined-basic" label="Firstname" variant="outlined" value={data.firstname} onChange={handleChange} name="firstname" sx={{margin: 1}}/>
                    <TextField id="outlined-basic" label="Middlename" variant="outlined" value={data.middlename} onChange={handleChange} name="middlename" sx={{margin: 1}}/>
                    <TextField required id="outlined-basic" label="Lastname" variant="outlined" value={data.lastname} onChange={handleChange} name="lastname" sx={{margin: 1}}/>
                </div>
                <div className="two">
                    <TextField required id="outlined-basic" label="Contact Number" variant="outlined" value={data.contactNumber} onChange={handleChange} name="contactNumber" sx={{margin: 1}}/>
                    <TextField required id="outlined-basic" label="Birthdate" variant="outlined" value={data.birthdate} onChange={handleChange} name="birthdate" sx={{margin: 1}}/>
                    <TextField required id="outlined-basic" label="Age" variant="outlined" value={data.age} onChange={handleChange} name="age" sx={{margin: 1}}/>
                    <FormControl>
                    <InputLabel id="demo-simple-select-label" sx={{margin: 1}}>Gender</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    required
                    value={data.gender}
                    label="Gender"
                    onChange={handleSelectChange}
                    name="gender"
                    sx={{margin: 1}}
                    >
                    <MenuItem value={'Male'}>Male</MenuItem>
                    <MenuItem value={'Female'}>Female</MenuItem>
                    </Select>
                    </FormControl>
                </div>

                <TextField id="outlined-basic" required label="Address" variant="outlined" value={data.address} onChange={handleChange} name="address" sx={{margin: 1, width:{sd: 700, md: 700}}}/><br></br>
                <TextField id="outlined-basic" required label="Username" variant="outlined" value={data.username} onChange={handleChange} name="username" sx={{margin: 1, width:{sd: 700, md: 700}}}/><br></br>
                <TextField 
                    onChange={handleChange}
                    type={showPassword? "text": "password"} 
                    value={data.password} 
                    label="Password"
                    name="password"
                    required
                    sx={{margin: 1, width:{sd: 700, md: 700}}} 
                    InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton onClick={handlePasswordShow}>{showPassword? <VisibilityOff />: <Visibility /> }</IconButton> </InputAdornment>) }} 
                />
            <Button variant="contained" type="submit" style={{backgroundColor: '#D2A857', marginTop: 25, paddingInline: 40}}>Continue</Button><br></br>
            <p style={{color: 'gray', fontSize: '15px'}}>By continuing, you agree to Arangkadas's <a href="https://www.lipsum.com/"  className="links">Terms of Service</a> and acknowledge you've read our <a href="https://www.lipsum.com/" className="links">Privacy Policy</a></p>

            <Button className="links" onClick={handleLoginClick} style={{fontSize: '18px'}} variant="text">Have an account? Log in</Button>
        
        </div>
        </Grid>
    )
}