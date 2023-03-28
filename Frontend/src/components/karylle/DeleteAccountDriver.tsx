import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Grid, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import axios from "axios";
import { ChangeEvent, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {UserContext, UserContextType } from "../../helpers/UserContext";


export default function DeleteAccountDriver() {

    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const navigate = useNavigate();
    const para = useParams() as { id: string };
    const { user, handleSetUser } = useContext(UserContext) as UserContextType;

    const [account, setAccount]= useState({
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
    
    const handlePasswordShow = () => {
        setShowPassword(!showPassword);
    }

    const handleCancelClick = () => {
        navigate("/driver/driverprofile/");
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const [data, setData]= useState({
        password:"",
     })
     const {password} = data;

     const deleteAccount = async(e: { preventDefault: () => void; })  => {
        e.preventDefault();
        if(password !== user?.password){
            setPasswordError("Password is incorrect.")
        }else{
            await axios.delete(`http://localhost:8080/driver/deleteDriver/${para.id}`)
            .then((res:any)=> {
                console.log('Deleting Data');
                console.log(res.data)
                handleSetUser(null);
                navigate('/')
            })
            .catch((err:string) => console.log(err))
            console.log(para.id)
            alert("Account successfully deleted.")
        }
        
    };

    return (
        
            <Stack component="form" onSubmit={deleteAccount}>
            <h1 style={{textAlign: 'left', color: '#90794C'}}>Delete your account</h1>
            <hr className="line"></hr>
            <p style={{textAlign: 'left', fontSize: '20px', paddingTop: 40}}>We're sorry to hear you'd like to delete your account. </p>
            <h5 style={{textAlign: 'left', color: '#90794C', fontSize: 20}}>Re-enter your password:</h5>

            <Stack direction="row" justifyContent="start">
                <TextField 
                    onChange={handleChange}
                    type={showPassword? "text": "password"} 
                    value={password} 
                    label="Password" 
                    name="password"
                    id="filled-password-input"
                    required
                    autoComplete="current-password"
                    variant="outlined"
                    error={passwordError !== null}
                    helperText={passwordError}
                    sx={{margin: 1, width: {sm: 300, md: 300}}}
                    InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton onClick={handlePasswordShow}>{showPassword? <VisibilityOff />: <Visibility />}</IconButton> </InputAdornment>) }} 
                />
            </Stack>
            
            <p style={{textAlign: 'left', fontSize: '20px'}}>If you choose to continue, your profile, account details, and other related data will be <br></br> permanently deleted. You won't be visible on Arangkada between now and then.  </p>
            <p style={{textAlign: 'left', fontSize: '20px', paddingTop: 50}}>Do you still want to delete your account?</p>
            <Stack direction="row" justifyContent="start" paddingBottom={7}>
                <Button variant="contained" type="submit" style={{backgroundColor: '#D76666', marginTop: 25, paddingInline: 40}}>Delete</Button>
                <Button variant="contained" onClick={handleCancelClick} style={{backgroundColor: '#D2A857', marginTop: 25, paddingInline: 40, marginLeft: 15}}>Cancel</Button>
            </Stack>
            </Stack>
            
       
    )
}