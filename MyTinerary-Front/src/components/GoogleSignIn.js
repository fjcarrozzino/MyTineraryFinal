import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import userActions from "../redux/actions/userActions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GoogleSignIn = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCallbackResponse = async(response) => {
    let userObject = jwt_decode(response.credential);
    const res = await dispatch(
      userActions.signInUser({
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
    // if(res.data?.response.userData.from === "validator"){
    //   errormsg.forEach(e => {
    //     toast.error(e.message)
    // })
    // } 

    if(res.data?.from === "no-form") {
      toast.error(errormsg)
    }

    if (res.data.response?.userData.from === "google") {
      if(res.data.success){
          toast.success(res.data.message)
      }else{
          toast.error(res.data.message)
      }
  }

  if (res.data.success) {
    navigate("/", {replace: true})
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
      shape: "rectangular",
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

export default GoogleSignIn;