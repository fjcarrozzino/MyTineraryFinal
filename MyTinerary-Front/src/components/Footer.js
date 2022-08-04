import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import '../styles/Footer.css'
import { Link } from 'react-router-dom';
import logo from '../assets/logoMTNoBackground.png'

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-filter'>

      </div>
        <div className='img-footer'>
            <img src={logo} alt='logo' height='80rem'/>
            <h2 style={{textAlign: "center"}}>MyTinerary &reg;</h2>
        </div>
        <div className='breakpoint-redes'>
        <a href='https://www.facebook.com/MyTinerary-110190061718233' target='_blank' rel="noreferrer"> <FacebookIcon fontSize="large"/></a>
        <a href='https://twitter.com/MytineraryApp' target="_blank" rel="noreferrer"><TwitterIcon fontSize="large"/></a>
        <a href='https://www.instagram.com/mytineraryy/' target="_blank" rel="noreferrer"><InstagramIcon fontSize="large"/></a>
        </div>
        <div className='container-footer'>          
          <div className='useful-links'>
              <h2>Useful Links</h2>
              <Link to='/' className='links-footer'> <h3>Home</h3> </Link>
              <Link to='/cities' className='links-footer'> <h3>Cities</h3> </Link>
              <Link to='/signup' className='links-footer'> <h3>Sign-Up</h3> </Link>
              <Link to='/signin' className='links-footer'> <h3>Sign-In</h3> </Link>
          </div>
          <div className='useful-links'>
              <h2>Contact</h2>
              <h3>Paraguay 2434, CABA</h3>
              <div className='iconos'>
              <a className='icon' target="_blank" href='https://api.whatsapp.com/send/?phone=1165736734&text&app_absent=0' rel="noreferrer"><WhatsAppIcon className='icon' fontSize="medium"/></a>
              <h3>+54 9 116573 6734</h3>
              </div>
          </div>
          <div className='useful-links erase-redes'>
              <h2 className='erase-footer'>Follow us on</h2>
              <div className='iconos'>
              <a href='https://www.facebook.com/MyTinerary-110190061718233' target='_blank' rel="noreferrer"> <FacebookIcon fontSize="medium"/></a>
              <h3>Facebook</h3>
              </div>
              <div className='iconos'>
              <a href='https://twitter.com/MytineraryApp' target="_blank" rel="noreferrer"><TwitterIcon fontSize="medium"/></a>
              <h3>Twitter</h3>
              </div>
              <div className='iconos'>
              <a href='https://www.instagram.com/mytineraryy/' target="_blank" rel="noreferrer"><InstagramIcon fontSize="medium"/></a>
              <h3>Instagram</h3>
              </div>
          </div>
        </div> 
    </div>
  )
}

export default Footer