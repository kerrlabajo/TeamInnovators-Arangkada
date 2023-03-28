import { Box, Toolbar, Typography } from "@mui/material";
import Registration from "../../components/karylle/RegistrationDriver";
import Welcome from "../../components/cara/Welcome"
import Footer from "../../components/Footer";
import UserAppbar from "../../components/UserAppbar";


export default function RegistrationOne() {
    return (
      <div>
      <UserAppbar></UserAppbar>
      <div className="App">
          <div className="bstyle">
              <Box component="main" sx={{ p: 6 }}>
                  <Toolbar />
                  <Typography>
                      <Registration></Registration>
                  </Typography>
              </Box>
              <Footer name="Cara Carmel Encabo" course="BSIT" section="G2"/>
          </div>
      </div>
  </div>
)
}