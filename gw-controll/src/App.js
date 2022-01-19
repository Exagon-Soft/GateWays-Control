import React, { useState } from "react";
import "./App.css";
import AppMenu from "./components/AppMenu";
import ModalSignIn from "./components/ModalSignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "./firebase-conf";
import NotLoggedArea from "./components/NotLoggedSpace";
import LoggedArea from "./components/LoggedSpace";
import ModalSignUp from "./components/ModalSignUp";
import GatewayContextProvider from "./Context/GatewayContext";

function App() {
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  
  const currentUser = useAuthState(firebaseAuth);

  //** Fires when the SignIn Button is clicked */
  const LoginClick = () => {
    setSignIn(true);
    setSignUp(false);
  };

  //** Fires when the SignUp Button is clicked */
  const RegisterClick = () => {
    setSignIn(false);
    setSignUp(true);
  };

  //** Fires when the close modal button is clicked */
  const CloseModals = () => {
    setSignIn(false);
    setSignUp(false);
  };

  return (
    <>
      <div className={"site-container"}>
        <AppMenu
          LoginClick={LoginClick}
          RegisterClick={RegisterClick}
          currentUser={currentUser[0]}
        />
        <ModalSignIn signIn={signIn} CloseModals={CloseModals} />
        <ModalSignUp signUp={signUp} CloseModals={CloseModals} />
        {currentUser[0] === null ? (
          <NotLoggedArea />
        ) : (
            <LoggedArea UserUID={currentUser[0]?.uid}/>
        )}
      </div>
    </>
  );
}

export default App;
