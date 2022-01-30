import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

const Login = (props) => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log("funziona");
      props.setIsAuth(true);
    });
  };
  return (
    <div>
      <p>accedi con google</p>
      <button onClick={signInWithGoogle}>accedi con google</button>
    </div>
  );
};

export default Login;
