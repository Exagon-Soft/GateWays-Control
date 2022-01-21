import React, { useState, useEffect } from "react";
import { firebaseAuth, firestore } from "../../firebase-conf";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SidebarAdminLink,
  UserArea,
} from "./AppMenuComponents";

const SideNav = ({
  isOpen,
  Toggle,
  LoginClick,
  RegisterClick,
  currentUser,
}) => {
  const [Rol, setRol] = useState("User");
  //**LogOut from the System */
  const logout = async () => {
    await signOut(firebaseAuth);
  };

  useEffect(() => {
    if (currentUser) {
      getUserRol(currentUser.uid);
    }
  }, [Rol]);

  //*******Get the current User access Rol */
  async function getUserRol(userUID) {
    const docRef = doc(firestore, `users/${userUID}`);
    getDoc(docRef)
      .then((userRol) => {
        setRol(userRol.data().Rol);
      })
      .catch((error) => {
        return null;
      });
  }

  return (
    <>
      <SidebarContainer isOpen={isOpen} onClick={Toggle}>
        <Icon onClick={Toggle}>
          <CloseIcon />
        </Icon>
        <SidebarWrapper>
          {currentUser ? (
            <UserArea id="userArea">{currentUser?.email}</UserArea>
          ) : (
            <></>
          )}
          <SidebarMenu>
            {currentUser ? (
              <SidebarAdminLink Rol={Rol}>
                All GateWays Listed
              </SidebarAdminLink>
            ) : (
              <></>
            )}
            {!currentUser ? (
              <SidebarLink onClick={() =>{RegisterClick();
                                          Toggle();}}>SignUp</SidebarLink>
            ) : (
              <></>
            )}
            {!currentUser ? (
              <SidebarLink onClick={()=>{LoginClick();
                                         Toggle();}}>SignIn</SidebarLink>
            ) : (
              <></>
            )}
            {currentUser ? (
              <SidebarLink onClick={logout}>Leave System</SidebarLink>
            ) : (
              <></>
            )}
          </SidebarMenu>
        </SidebarWrapper>
      </SidebarContainer>
    </>
  );
};

export default SideNav;
