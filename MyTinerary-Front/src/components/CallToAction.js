import React from 'react'
import '../styles/CallToAction.css'
import logo from '../assets/logoMTNoBackground.png'
import { Link } from 'react-router-dom'

function CallToAction() {
  return (
    <div className='call-action'>
      <img src={logo} alt='logo' height='150rem'/>
        <h2 className='description-action'>Find
        your perfect trip, designed by insiders who know and love
        their cities!</h2>
        <Link to='/cities' className='button-action'> Choose your perfect destination </Link>
    </div>
  )
}

export default CallToAction