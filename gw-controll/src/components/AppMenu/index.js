import React, { useEffect, useState } from "react";
import {
  AppNav,
  NavLogo,
  NavWrapperContainer,
  NavLogoPicture,
  NavMenuList,
  NavMenuItem,
  NavAdminMenuItem,
  UserArea,
  NavbarTogle,
} from "./AppMenuComponents";
import Icon from "../../images/APPicon.webp";
import { firebaseAuth, firestore } from "../../firebase-conf";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FaBars } from "react-icons/fa";

const AppMenu = ({ LoginClick, RegisterClick, currentUser, Toggle }) => {
  const [Rol, setRol] = useState("User");
  //**LogOut from the System */
  const logout = async () => {
    await signOut(firebaseAuth);
  };

  useEffect(() => {
    if (currentUser) {
      getUserRol(currentUser.uid);
    }
  }, []);

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
      <AppNav>
        <NavWrapperContainer>
          <NavLogo>
            <NavLogoPicture src={Icon} alt="GW-CONTROL" />
            GW-CONTROL
          </NavLogo>
          <NavbarTogle id="SideBarBTN" onClick={Toggle}>
            <FaBars></FaBars>
          </NavbarTogle>
          <NavMenuList id="menuList">
            {currentUser ? (
              <NavAdminMenuItem Rol={Rol}>All GateWays Listed</NavAdminMenuItem>
            ) : (
              <></>
            )}

            {!currentUser ? (
              <NavMenuItem onClick={RegisterClick}>SignUp</NavMenuItem>
            ) : (
              <></>
            )}
            {!currentUser ? (
              <NavMenuItem onClick={LoginClick}>SignIn</NavMenuItem>
            ) : (
              <></>
            )}

            {currentUser ? (
              <NavMenuItem onClick={logout}>Leave System</NavMenuItem>
            ) : (
              <></>
            )}
          </NavMenuList>
        </NavWrapperContainer>
        {currentUser ? (
          <UserArea id="userArea">{currentUser?.email}</UserArea>
        ) : (
          <></>
        )}
      </AppNav>
    </>
  );
};

export default AppMenu;
