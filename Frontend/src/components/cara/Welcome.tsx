import Logo from '../../images/logobrown.png';

type MyCompType = {
    line1: string;
    line2: string;
    line3: string;
}

export default function Welcome(props:MyCompType) {
    return (
        <div>
            <img src={Logo} alt={"arangkada logo"} style={{width: 150, height: 150}}/>
            <h2 style={{fontSize: '50px', color: '#D2A857', lineHeight: '.2em'}}>{props.line1}</h2>
            <h1 style={{fontSize: '80px', color: '#90794C', lineHeight: '.2em'}}>{props.line2}</h1>
            <i><p style={{color: '#90794C'}}>{props.line3}</p></i>
            <br></br>
        </div>
    )
}