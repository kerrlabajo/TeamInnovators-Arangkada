import { Stack } from '@mui/material';
import Logo from '../../images/logowhite.png';

type MyCompType = {
    line1: string;
    line2: string;
    line3: string;
}

export default function Welcome(props:MyCompType) {
    return (
        <Stack spacing={4} width="80%" alignItems="center">
            <img src={Logo} alt={"arangkada logo"} style={{width: 150, height: 150}}/>
            <h2 style={{fontSize: '50px', color: '#ffffff', margin: 0}}>{props.line1}</h2>
            <h1 style={{fontSize: '80px', color: '#ffffff',  margin: 0}}>{props.line2}</h1>
            <i><p style={{ fontSize: "24px", color: '#ffffff',  margin: 0}}>{props.line3}</p></i>
        </Stack>
    )
}