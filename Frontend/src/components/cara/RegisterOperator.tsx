import { AccountBalance } from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AccountService from "../../api/AccountService";
import { Account } from "../../api/dataTypes";
import OperatorService from "../../api/OperatorService";
import Op from '../../images/operator.png';


export default function RegisterOperator() {

    const navigate = useNavigate();
    const location = useLocation();

    const [data, setData]= useState({
        businessName: "",
        permitNumber: "",
    })


    const postOperator = async (event: { preventDefault: () => void; }) =>{
        event.preventDefault();
        
        
        AccountService.getAccountById (
            location.state.accountId
        )
        .then((res)=> {
            console.log(res.data)
            OperatorService.postOperator(  {
                operatorId:-1,
                businessName: data.businessName,
                permitNumber:data.permitNumber,
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
        
        // console.log(account.accountId)
        // console.log(location.state.accountId)
    
        navigate("/landing"); 
        
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
        //console.log(e.target.name)
    };

    const handleSubmitClick = () => {
        navigate("/landing/");
    }

    return (
        <Grid onSubmit={postOperator} component="form">
        <div className="contain2">
           <h3>You are a PUV Operator!</h3>
           <img src={Op} style={{width: 210, height: 210, marginLeft:'150px', marginRight:'150px'}}/>
           <i><p style={{fontSize: '15px'}}>Please fill further information</p></i>
           <TextField required id="outlined-basic" label="Business Name" name="businessName" variant="outlined" value={data.businessName} onChange={handleChange} sx={{margin: 1, width: { sm: 400, md: 400 }}}/><br></br>
           <TextField required id="outlined-basic" label="Business Permit Number" name="permitNumber" variant="outlined" value={data.permitNumber} onChange={handleChange} sx={{margin: 1, width: { sm: 400, md: 400 }}}/><br></br>
           <Button variant="contained" type="submit" style={{backgroundColor: '#D2A857', marginTop: 25, paddingInline: 40, marginBottom: '45px'}}>SUBMIT</Button><br></br>
        </div>
        </Grid>
    )
}