import React from 'react'
import FacebookLogin from 'react-facebook-login';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions';
import '../styles/SignUpFacebook.css'

const FacebookSignUp = (props) => {

    const dispatch = useDispatch()


    const responseFacebook = async (res) => {
        const userData = {
          firstName: res.name,
          lastName: res.lastname,
          email: res.email,
          password: res.id +"Ab0",
          from: "facebook",
          country: props.country
        }
        dispatch(userActions.signUpUser(userData))

        const errormsg = res.data.message
        console.log(errormsg)
        if(res.data.from === "validator"){
    
          errormsg.forEach(e => {
            toast.error(e.message)
        })
    
    
        } 
    
        if (res.data.from === "facebook") {
          if(res.data.success){
              toast.success(res.data.message)
          }else{
              toast.error(res.data.message)
          }
      }
      }

      
  return (
    <FacebookLogin
    cssClass="buttonsocial my-facebook-button-class signup-facebook"
    icon="fa-facebook fa-2x"
    textButton=" SignUp with Facebook"
      appId="2807813939349597"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
    />
  )
}

export default FacebookSignUp