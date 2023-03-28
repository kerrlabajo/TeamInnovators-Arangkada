
import { useEffect, useState } from "react";
import { Account } from "../../api/dataTypes";
import DisplayProfileOperator from "../../components/cara/DisplayProfileOperator"
import Footer from "../../components/Footer"
import AccountService from "../../api/AccountService";



export default function RegistrationOne() {
  
  const [myAccount, setAccount] = useState<Account[]>([]);
  
  // useEffect(() => {
  //   AccountService.getAccountByUsername("ding123").then((response) => {
  //     setAccount(response.data);
  //   }).catch((error) => {
  //     console.log(error);
  //   })
  // }, []);
  
    return (
      <div className="App">
        <DisplayProfileOperator></DisplayProfileOperator>
        <Footer name="Cara Carmel Encabo" course="BSIT" section="G2"/>
      </div>
      
    )
}