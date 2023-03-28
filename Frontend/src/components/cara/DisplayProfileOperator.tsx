import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccountService from "../../api/AccountService";
import { Account } from "../../api/dataTypes";
import OperatorService from "../../api/OperatorService";
import {UserContext, UserContextType } from "../../helpers/UserContext";


export default function DisplayProfileOperator() {
    const navigate = useNavigate();
    const para = useParams() as { id: string };
    const {user} = useContext(UserContext) as UserContextType;

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

    const [businessNameOp, setBusinessNameOp]=useState({
        businessName: "",
    })

    const [permitNumberOp, setPermitNumberOp]=useState({
        permitNumber: "",
    })

    const { firstname, middlename, lastname, birthdate, age, contactNumber, address, gender, username, password, accountType } = account;
    

    useEffect(() => {
        if(user != null){
            OperatorService.getOperatorbyOperatorId(user.userId).then((response) => {
                setAccount(response.data.account);
                console.log(response.data.account)
                setBusinessNameOp(response.data.businessName)
                setPermitNumberOp(response.data.permitNumber)
            }).catch((error) => {
              console.log(error);
            })
        }
      }, []);

    const handleUserEditClick = () => {
        navigate("/operator/operator-profile/edit-operator-prof/" + user?.accountId);
       
    }
    const handleBusinessEditClick = () => {
        navigate("/operator/operator-profile/edit-business-info/" + user?.userId);
    }
    const handleDeleteClick = () => {
        navigate("/operator/operator-profile/delete-op/" + user?.userId);
    }

    return (
        <div>
            <div>
                <h2 style={{textAlign: 'left', color: '#90794C'}}>User Information</h2>
                <hr className="line"></hr><br></br>
            </div>
        
            <div className="three">
                <TextField id="outlined-read-only-input" name="firstname" value={firstname} label="Firstname" InputProps={{readOnly: true,}} sx={{margin: 2}}/>
                <TextField id="outlined-read-only-input" name="middlename" value={middlename} label="Middlename" InputProps={{readOnly: true,}} sx={{margin: 2}}/>
                <TextField id="outlined-read-only-input" name="lastname" value={lastname}  label="Lastname" InputProps={{readOnly: true,}} sx={{margin: 2}}/>
            </div>
            <div className="two">
                <TextField id="outlined-read-only-input" name="contactNumber" value={contactNumber}  label="Contact Number" InputProps={{readOnly: true,}} sx={{margin: 2}}/>
                <TextField id="outlined-read-only-input" name="birthdate" value={birthdate} label="Birthdate" InputProps={{readOnly: true,}} sx={{margin: 2}}/>
            </div>
            <div className="two">
                <TextField id="outlined-read-only-input" name="age" value={age} label="Age" InputProps={{readOnly: true,}} sx={{margin: 2}}/>
                <FormControl>
                    <InputLabel id="demo-simple-select-readonly-label" sx={{margin: 2}}>Gender</InputLabel>
                    <Select
                    labelId="demo-simple-select-readonly-label"
                    id="demo-simple-select"
                    label="Gender"
                    name="gender"
                    value={gender} 
                    inputProps={{ readOnly: true }}
                    sx={{margin: 2}}
                    >
                    <MenuItem value={'Male'}>Male</MenuItem>
                    <MenuItem value={'Female'}>Female</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="one">
                <TextField id="outlined-read-only-input" name="address" value={address}  label="Address" InputProps={{readOnly: true,}} sx={{margin: 2}}/>
                <TextField id="outlined-read-only-input" name="username" value={username}  label="Username" InputProps={{readOnly: true,}} sx={{margin: 2}}/>
                <TextField id="outlined-read-only-input" name="password" type="password" value={password}  label="Password" InputProps={{readOnly: true,}} sx={{margin: 2}}/>
                <Stack direction="row" justifyContent="end">
                    <Button variant="contained" onClick={handleUserEditClick} style={{backgroundColor: '#D2A857', marginTop: 25, marginLeft: 15, marginRight: 15, paddingInline: 60}}>Edit</Button>
                </Stack>
                <div>
                    <h2 style={{textAlign: 'left', color: '#90794C'}}>Business Information</h2>
                    <hr className="line"></hr><br></br>
                </div>
                <TextField id="outlined-read-only-input" name="businessName" value={businessNameOp} label="Business Name" InputProps={{readOnly: true,}} sx={{margin: 2}}/>
                <TextField id="outlined-read-only-input" name="permitNumber" value={permitNumberOp} label="Business Permit Number" InputProps={{readOnly: true,}} sx={{margin: 2}}/>
            </div>
            
            <Stack direction="row" justifyContent="end" paddingBottom={7}>
                <Button variant="contained" onClick={handleDeleteClick} style={{backgroundColor: '#D76666', marginTop: 25}}>Delete Account</Button>
                <Button variant="contained" onClick={handleBusinessEditClick} style={{backgroundColor: '#D2A857', marginTop: 25, marginLeft: 15, marginRight: 15, paddingInline: 60}}>Edit</Button>
            </Stack>
        
        </div>
          
            
    )
}