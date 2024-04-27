import React from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <main className="welcome">
      <h1>Welcome to amber agent chat portal.</h1>
      <img
        src="https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/h9afywbnumh6c1xkjmub"
        alt="ReactJs logo"
        width={"10%"}
        height={"10%"}
      />
      {/* <p>Sign in with Google to chat with with your fellow React Developers.</p> */}
      <br />
      <button className="sign-in">
        <img
          onClick={googleSignIn}
          src={GoogleSignin}
          alt="sign in with google"
          type="button"
        />
      </button>
    </main>
  );
};

export default Welcome;
