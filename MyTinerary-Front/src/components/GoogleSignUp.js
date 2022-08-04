import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import userActions from "../redux/actions/userActions";
import toast from "react-hot-toast";

const GoogleSignUp = (props) => {
  const dispatch = useDispatch();

  const handleCallbackResponse = async(response) => {
    let userObject = jwt_decode(response.credential);
    const res = await dispatch(
      userActions.signUpUser({
        firstName: userObject.given_name,
        lastName: userObject.family_name,
        email: userObject.email,
        country: props.country,
        urlImage: userObject.picture,
        password: userObject.sub,
        from: "google",
      })
      );

    const errormsg = res.data.message
    console.log(errormsg)
    if(res.data.from === "validator"){

      errormsg.forEach(e => {
        toast.error(e.message)
    })


    } 

    if (res.data.from === "google") {
      if(res.data.success){
          toast.success(res.data.message)
      }else{
          toast.error(res.data.message)
      }
  }

  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "1003178410228-rnhf8vd6iet7he3vlv994m2hinff177b.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("button-div"), {
      theme: "outline",
      size: "medium",
      type: "standard",
      shape: "pill",
      locale: "en",
      text: "button",
      width: "100%"
    });
  });

  return (
    <div id="button-div" >
    </div>
  );
};

export default GoogleSignUp;
