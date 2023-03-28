import { Box } from '@mui/material';
import ProfileF from '../../images/ProfilepicF.png';
import ProfileM from '../../images/ProfilepicM.png';
import ProfileMariel from '../../images/mariel.png';
import ProfileFaith from '../../images/faith.png';
import ProfileKerr from '../../images/kerr.png';
import ProfileCara from '../../images/cara.png';
import ProfileKarylle from '../../images/karylle.png';

export default function ContactUs() {
    return (

        <div>
            <div className="App">
                <p style={{fontSize: 40, color: '#90794C', textAlign: 'left', marginLeft: 310}}>About Us</p>
                <div style={{backgroundColor: '#D2A857', borderRadius: 30, padding: 30, maxWidth: 800, marginLeft: 290, opacity:'0.94'}}>
                    <div>
                        <p style={{color: '#261D0C', fontSize: 25, paddingLeft: 5, textAlign:'justify'}}>
                        Team Innovators was founded on September 23, 2022, by Mariel Genodiala. 
                        It is a developing team that provides excellent opportunities to advance 
                        and learn alongside aspiring entrepreneurs.
                        </p>
                    </div>
                </div><br></br>
                <p style={{fontSize: 40, color: '#90794C', textAlign: 'center', marginLeft: 20}}>Team Innovators
                <p style={{color: 'grey', fontSize: 15,  textAlign:'center'}}> Meet the entire team</p></p>

                <div style={{backgroundColor: '#ffffff', borderRadius: 30, padding: 5, maxWidth: 300, marginLeft: 560}}>
                    <img src={ProfileMariel} alt={"profile female"} style={{width: 150, height: 150}}/>
                    <div className='contain3'>
                        <p style={{color: 'black', fontSize: 14,  textAlign:'center'}}> Mariel Genodiala
                        <p style={{color: 'grey', fontSize: 12, textAlign:'center'}}> Founder</p>
                        <p style={{color: 'black', fontSize: 13,  textAlign:'center'}}> 
                        A BSIT-3 student who has excellent <br></br>communication skills with <br></br>team-leading abilities.</p></p>
                    </div>
                </div>

                <div className="wrapperA">
                  <div className='leftA'>
                    <div style={{backgroundColor: '#ffffff', borderRadius: 30, padding: 5, maxWidth: 300, marginLeft: 80}}>
                        <img src={ProfileFaith} alt={"profile female"} style={{width: 150, height: 150}}/>
                    <div className='contain3'>
                        <p style={{color: 'black', fontSize: 14,  textAlign:'center'}}> Faith Abigail Rosalijos
                        <p style={{color: 'grey', fontSize: 12, textAlign:'center'}}> Co-founder</p>
                        <p style={{color: 'black', fontSize: 13,  textAlign:'center'}}> 
                        A BSIT-3 student who is an expert in <br></br>layout and design, as well as some <br></br>part-time experience.</p></p>
                    </div>
                </div>
                  </div>
                  <div className='rightL'>
                  <div style={{backgroundColor: '#ffffff', borderRadius: 30, padding: 5, maxWidth: 300, marginLeft: 180}}>
                    <img src={ProfileKerr} alt={"profile male"} style={{width: 150, height: 150}}/>
                    <div className='contain3'>
                        <p style={{color: 'black', fontSize: 14,  textAlign:'center'}}> Kerr Labajo
                        <p style={{color: 'grey', fontSize: 12, textAlign:'center'}}> Co-founder</p>
                        <p style={{color: 'black', fontSize: 13,  textAlign:'center'}}> 
                        A BSCS-3 student who has a strong <br></br>personality and is self-assured in his programming and research abilities. </p></p>
                    </div>
                </div>
                </div>
            </div>
            <div className="wrapperA">
                  <div className='leftA'>
                    <div style={{backgroundColor: '#ffffff', borderRadius: 30, padding: 5, maxWidth: 300, marginLeft: 80, marginTop:20}}>
                        <img src={ProfileCara} alt={"profile female"} style={{width: 150, height: 150}}/>
                    <div className='contain3'>
                        <p style={{color: 'black', fontSize: 14,  textAlign:'center'}}> Cara Carmel Encabo
                        <p style={{color: 'grey', fontSize: 12, textAlign:'center'}}> Co-founder</p>
                        <p style={{color: 'black', fontSize: 13,  textAlign:'center'}}> 
                        A BSIT-3 student who is an effective<br></br>communicator and a prototype <br></br>designer.</p></p>
                    </div>
                </div>
                  </div>
                  <div className='rightL'>
                  <div style={{backgroundColor: '#ffffff', borderRadius: 30, padding: 5, maxWidth: 300, marginLeft: 180, marginTop:20}}>
                    <img src={ProfileKarylle} alt={"profile female"} style={{width: 150, height: 150}}/>
                    <div className='contain3'>
                        <p style={{color: 'black', fontSize: 14,  textAlign:'center'}}> Karylle Jay Caballero
                        <p style={{color: 'grey', fontSize: 12, textAlign:'center'}}> Co-founder</p>
                        <p style={{color: 'black', fontSize: 13,  textAlign:'center'}}> 
                        A BSIT-3 student who has an excellent <br></br>work in digital design and strong <br></br>research background.</p></p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}