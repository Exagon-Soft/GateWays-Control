/* eslint-disable no-useless-escape */
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firebaseAuth } from "../../firebase-conf";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  SignUpModal,
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
} from "./ModalSignUpComponents";
import { ModalContent } from "../Utils/ModalComponents";
import GoogleIcon from "../../images/google.png";

const ModalSignUp = ({ signUp, CloseModals }) => {
  //******Const declaration******//
  toast.configure();

  //******Functions******//

  //**Try to Register with Email/Password */
  const Register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then((firebaseUser) => {
          CloseModals();
        })
        .catch((error) => {
          toast(error);
        });
      //enter System
    } catch (error) {
      toast(error.message);
    }
  };

  const TryRegister = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const registerEmailValue = document.getElementById("email").value;
    const registerPassValue = document.getElementById("password").value;
    var validEmail = false;
    var validPassword = false;
    if (registerPassValue !== "") {
      validPassword = true;
    } else {
    }

    if (registerEmailValue !== "" && reg.test(registerEmailValue)) {
      validEmail = true;
    } else {
    }

    if (validEmail && validPassword) {
      Register(registerEmailValue, registerPassValue);
    } else {
      if (!validEmail) {
        toast("Email Empty or  Invalid");
      }
      if (!validPassword) {
        toast("Password Empty");
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

  //*******Component Body*******//
  return (
    <>
      <SignUpModal signUp={signUp}>
        <ModalContent>
          <Icon>
            <CloseIcon onClick={CloseModals} />
          </Icon>
          <Form>
            <FormTitle>Register new account</FormTitle>
            <FormEmailLogin>
              <FormInput
                id="email"
                type="email"
                required
                placeholder="Email..."
              />

              <FormInput
                id="password"
                type="password"
                required
                placeholder="Password..."
              />
              <FormButton onClick={TryRegister}>Continue</FormButton>
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
          </Form>
        </ModalContent>
      </SignUpModal>
      <ModalBack signUp={signUp} />
    </>
  );
};

export default ModalSignUp;
