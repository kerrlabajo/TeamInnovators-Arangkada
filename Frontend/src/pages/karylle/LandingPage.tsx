import { Box, Toolbar, Typography } from "@mui/material";
import Landing from "../../components/karylle/Landing";
import Footer from "../../components/Footer";
import UserAppBarB from "../../components/UserAppBarB";

export default function LandingPage() {
    return (
        <div>
            <div className="App">
                <UserAppBarB></UserAppBarB>
                <div className="pstyle">
                    <Box component="main" sx={{ p: 6 }}>
                        <Toolbar />
                        <Typography>
                            <Landing></Landing>
                        </Typography>
                    </Box>
                    <Footer name="Karylle Jay Caballero" course="BSIT" section="G2"/>
                </div>
            </div>
        </div>
    )
}