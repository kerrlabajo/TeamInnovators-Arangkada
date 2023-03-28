import { Box, Toolbar, Typography } from "@mui/material";
import EditProfile from "../../components/karylle/EditProfileDriver";
import Footer from "../../components/Footer";

export default function RegistrationOne() {
    return (
        <div>
            <div className="App">
                <div className="pstyle">
                    <Box component="main" sx={{ p: 6 }}>
                        <Toolbar />
                        <Typography>
                            <EditProfile></EditProfile>
                        </Typography>
                    </Box>
                    <Footer name="Karylle Jay Caballero" course="BSIT" section="G2"/>
                </div>
            </div>
        </div>
    )
}