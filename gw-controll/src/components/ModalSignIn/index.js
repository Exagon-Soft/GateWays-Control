/* eslint-disable no-useless-escape */
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firebaseAuth } from "../../firebase-conf";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  SignInModal,
  Form,
  FormTitle,
  FormEmailLogin,
  FormInput,
  FormButton,
  FormGoogleRow,
  FormBtn,
  FormGoogleIcon,
  FormGoogle,
  FormAuthLogin,
  FormRowContainer,
  FormLineDivider,
  Icon,
  CloseIcon,
  ModalBack,
} from "./ModalSignInComponents";
import { ModalContent } from "../Utils/ModalComponents";
import {
  ButtonLeftContainer,
  ButtonRightContainer,
  CustomrightButton,
} from "../Utils/miscElements";
import GoogleIcon from "../../images/google.png";

const ModalSignIn = ({ signIn, CloseModals }) => {
  //******Const declaration******//
  toast.configure();

  //******Functions******//

  //* Logs In a user to the system using email and password */
  const LogIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((firebaseUser) => {
          CloseModals();
        })
        .catch((error) => {
          toast(error.message);
        });
      //enter System
    } catch (error) {
      toast(error.message);
    }
  };

  //** Validates the data and fires the LogIn functions if is valid */
  const TryLogIn = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const logingEmailvalue = document.getElementById("loginEmail").value;
    const logingPassvalue = document.getElementById("loginPass").value;
    var isEmailValid = false;
    var isPassValid = false;

    if (logingPassvalue !== "") {
      isPassValid = true;
    }

    if (logingEmailvalue !== "" && reg.test(logingEmailvalue)) {
      isEmailValid = true;
    }

    if (isEmailValid && isPassValid) {
      LogIn(logingEmailvalue, logingPassvalue);
    } else {
      if (!isEmailValid) {
        toast("Email Empty or  Invalid");
      }

      if (!isPassValid) {
        toast("Passwords Empty");
      }
    }
  };

  //** Try to get authenticated with Google */
  const signUpWithGoogle = async () => {
    try {
      await signInWithPopup(firebaseAuth, new GoogleAuthProvider())
        .then((firebaseUser) => {
          CloseModals();
        })
        .catch((error) => {
          toast(error);
        });
    } catch (error) {
      toast(error);
    }
  };
  return (
    <>
      <SignInModal signIn={signIn}>
        <ModalContent>
          <Icon>
            <CloseIcon onClick={CloseModals} />
          </Icon>
          <Form>
            <FormTitle>Sign in to your account</FormTitle>
            <FormEmailLogin>
              <FormInput
                id="loginEmail"
                type="email"
                required
                placeholder="Email..."
              />
              <FormInput
                id="loginPass"
                type="password"
                required
                placeholder="Password..."
              />
              <FormButton onClick={TryLogIn}>Continue</FormButton>
            </FormEmailLogin>
            <FormGoogleRow>
              <FormRowContainer>
                <FormLineDivider />
                Or
                <FormLineDivider />
              </FormRowContainer>
            </FormGoogleRow>
            <FormAuthLogin>
              <FormGoogleRow>
                <FormBtn onClick={signUpWithGoogle}>
                  <FormGoogleIcon src={GoogleIcon} />
                  <FormGoogle>Continue width Google</FormGoogle>
                </FormBtn>
              </FormGoogleRow>
            </FormAuthLogin>
            <FormGoogleRow>
              <FormRowContainer>
                <ButtonLeftContainer></ButtonLeftContainer>
                <ButtonRightContainer>
                  <CustomrightButton>Forgot?</CustomrightButton>
                </ButtonRightContainer>
              </FormRowContainer>
            </FormGoogleRow>
          </Form>
        </ModalContent>
      </SignInModal>
      <ModalBack signIn={signIn} />
    </>
  );
};

export default ModalSignIn;
