import RegistrationForm from "../../components/cara/RegistrationForm"
import Welcome from "../../components/cara/Welcome"
import Footer from "../../components/Footer"
import UserAppbar from "../../components/UserAppbar"



export default function RegistrationOne() {
    return (
      <div>
        <UserAppbar></UserAppbar>
        <div className="App">
            <div className="bstyle">
              <div className='contain'>
                <div className='wrapper'>
                  <div className='left'>
                    <Welcome line1='Welcome to' line2='Arangkada' line3='We get you moving!'></Welcome>
                  </div>
                  <div className='right'>
                    <RegistrationForm></RegistrationForm>
                  </div>
                </div>
              </div>
              <Footer name="Cara Carmel Encabo and Karylle Jay Caballero" course="BSIT" section="G2"/>
            </div>
        </div>
      </div>
      
    )
}