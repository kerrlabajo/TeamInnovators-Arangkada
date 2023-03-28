import { Box, Toolbar, Typography } from "@mui/material";
import AboutUs from "../../components/karylle/AboutUs";
import Footer from "../../components/Footer";
import UserAppBarB from "../../components/UserAppBarB";


export default function RegistrationOne() {
    return (
        <div>
            <div className="App">
            <UserAppBarB></UserAppBarB>
                <div className="pstyle">
                    <Box component="main" sx={{ p: 6 }}>
                        <Toolbar />
                        <Typography>
                            <AboutUs></AboutUs>
                        </Typography>
                    </Box>
                    <Footer name="Karylle Jay Caballero" course="BSIT" section="G2"/>
                </div>
            </div>
        </div>
    )
}