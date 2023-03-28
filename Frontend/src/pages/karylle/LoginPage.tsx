import Login from "../../components/karylle/Login"
import Welcome from "../../components/karylle/WelcomeLogin"
import Footer from "../../components/Footer"
import { Stack } from "@mui/material"
import UserAppbar from "../../components/UserAppbar"

export default function RegistrationOne() {
    return (
      <Stack className="bgimg">
        <UserAppbar></UserAppbar>
        <Stack 
          direction={{ xs: "column", md: "row" }} 
          sx={{ margin: "auto", width: "90%", padding: "112px 0 32px 0" }} 
          alignItems="center"
          spacing={{ xs: 4, md: 0 }}
        >
          <Welcome line1='Welcome to' line2='Arangkada' line3='We get you moving!'></Welcome>
          <Login></Login>
        </Stack> 
        <Footer name="Cara Carmel Encabo and Karylle Jay Caballero" course="BSIT 3" section="G2" />
      </Stack>
    )
}