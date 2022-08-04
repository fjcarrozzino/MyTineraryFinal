import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/BackToCities.css'

const BackToCities = () => {
  return (
    <div className='button-div-back'>
        <Link to="/cities"><button className='button-back'> Back To Cities</button></Link>
    </div>
  )
}

export default BackToCities