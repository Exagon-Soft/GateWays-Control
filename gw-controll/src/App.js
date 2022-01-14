import React, { useState } from "react";
import "./App.css";
import AppMenu from "./components/AppMenu";
import ModalSignIn from "./components/ModalSignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth} from "./firebase-conf";
import NotLoggedArea from "./components/NotLoggedSpace";
import LoggedArea from "./components/LoggedSpace";
import ModalSignUp from "./components/ModalSignUp";
import GateWays from "./components/ModalGateWays";
import Peripherals from "./components/ModalPeriphericals";

function App() {
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [gateWays, setgateWays] = useState(false);
  const [periPhericals, setperiPhericals] = useState(false);
  const currentUser = useAuthState(firebaseAuth);

  //** Fires when the SignIn Button is clicked */
  const LoginClick = () => {
    setSignIn(true);
    setSignUp(false);
    setperiPhericals(false);
    setgateWays(false);
  };

  //** Fires when the SignUp Button is clicked */
  const RegisterClick = () => {
    setSignIn(false);
    setperiPhericals(false);
    setgateWays(false);
    setSignUp(true);
  };

  //** Fires when the Add/Edit GteWay Button is clicked */
  const GateWayClick = () => {
    setSignIn(false);
    setSignUp(false);
    setperiPhericals(false);
    setgateWays(true);
  };

  //** Fires when the Add/Edit Peripherical Button is clicked */
  const PeriphericalClick = () => {
    setSignIn(false);
    setSignUp(false);
    setperiPhericals(true);
    setgateWays(false);
  };

  //** Fires when the close modal button is clicked */
  const CloseModals = () => {
    setSignIn(false);
    setSignUp(false);
    setperiPhericals(false);
    setgateWays(false);
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
        <GateWays gateWays={gateWays} CloseModals={CloseModals} />
        <Peripherals periPhericals={periPhericals} CloseModals={CloseModals} />
        {currentUser[0] === null ? (
          <NotLoggedArea />
        ) : (
          <LoggedArea
            GateWayClick={GateWayClick}
            PeriphericalClick={PeriphericalClick}
          />
        )}
      </div>
    </>
  );
}

export default App;
