import React, { lazy, Suspense, useState } from "react";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "./firebase-conf";
import SideNav from "./components/AppMenu/SideNav";
import LoggedArea from "./components/LoggedSpace";

function App() {
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const currentUser = useAuthState(firebaseAuth);

  //Splitting the code
  const ModalSignIn = lazy(() => import("./components/ModalSignIn"));
  const ModalSignUp = lazy(() => import("./components/ModalSignUp"));
  
  const NotLoggedArea = lazy(() => import("./components/NotLoggedSpace"));
  const AppMenu = lazy(() => import("./components/AppMenu"));
  const renderLoader = () => <p>Loading</p>;

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

  //**Fires when interacts with the Sidebar/Sidebar Button */
  const Toggle = () =>{
    setisOpen(!isOpen);
  }

  return (
    <>
      <div className={"site-container"}>
        <Suspense fallback={renderLoader()}>
          <AppMenu
            LoginClick={LoginClick}
            RegisterClick={RegisterClick}
            currentUser={currentUser[0]}
            Toggle={Toggle}
          />
        </Suspense>
        <SideNav
          Toggle={Toggle}
          isOpen={isOpen}
          LoginClick={LoginClick}
          RegisterClick={RegisterClick}
          currentUser={currentUser[0]}
        ></SideNav>
        <Suspense fallback={renderLoader()}>
          <ModalSignIn signIn={signIn} CloseModals={CloseModals} />
        </Suspense>
        <Suspense fallback={renderLoader()}>
          <ModalSignUp signUp={signUp} CloseModals={CloseModals} />
        </Suspense>
        {currentUser[0] === null ? (
          <NotLoggedArea />
        ) : (
          <LoggedArea UserUID={currentUser[0]?.uid} />
        )}
      </div>
    </>
  );
}

export default App;
