import styled from "styled-components";
import { Link as LinkScroll } from "react-scroll";
import {FaTimes} from 'react-icons/fa';


export const AppNav = styled.nav`
  background-color: #010101 !important;
  height: 80px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 900;
`;

export const NavWrapperContainer = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  width: 90%;
  position: relative;
  height: 100%;

  @media only screen and (min-width: 601px) {
    width: 85%;
  }
  @media only screen and (min-width: 993px) {
    width: 70%;
  }
`;

export const NavLogo = styled(LinkScroll)`
  position: relative;
  color: #fff;
  display: flex;
  font-size: 2.1rem;
  padding: 0 5px;
  align-items: center;
  width: fit-content;

  @media screen and (max-width: 850px) {
  }
`;

export const NavLogoPicture = styled.img`
  width: 64px;
  height: 64px;
  margin-top: 8px;
  margin-right: 5px;
`;

export const NavbarTogle = styled.div`
  display: none;

  @media screen and (max-width: 850px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;

export const NavMenuList = styled.ul`
  position: relative;
  float: right;
  right: 5%;
  display: flex;
  text-decoration: none;
  margin-top: -40px;
  list-style: none;

  @media screen and (max-width: 850px) {
    display: none;
  }
`;

export const NavMenuItem = styled.li`
  color: #fff;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  padding-right: 15px;
  text-decoration: none;
  
  transition: all 0.3s ease-in-out;

  &.active {
    border-bottom: solid 2px #bd542c;
  }

  &:hover {
    color: #bd542c;
  }
`;

export const NavAdminMenuItem = styled.li`
  color: #fff;
  display: ${({Rol}) => (Rol === "Admin" ? 'flex' : 'none')};
  align-items: center;
  text-align: center;
  padding-right: 15px;
  text-decoration: none;
  
  transition: all 0.3s ease-in-out;

  &.active {
    border-bottom: solid 2px #bd542c;
  }
`;

export const UserArea = styled.div`
  color: #fff;
  position: fixed;
  float: right;
  right: 5px;
  display: flex;
  margin-top: -47px;

  @media screen and (max-width: 850px) {
    display: none;
  }
`

//***Side Var */


export const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #0d0d0d;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.4s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  left: ${({ isOpen }) => (isOpen ? '0' : '100%')};
`

export const CloseIcon = styled(FaTimes)`
  color: #fff;
`

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
  z-index: 950;
`

export const SidebarWrapper = styled.div`
  color: #fff;
`

export const SidebarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 80px);
  text-align: center;

  @media screen and (max-width: 850px){
      grid-template-rows: repeat(6, 60px);
  }
`

export const SidebarLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #bd542c;
    transition: 0.2s ease-in-out;
  }
`

export const SidebarAdminLink = styled.div`
  display: ${({Rol}) => (Rol === "Admin" ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #bd542c;
    transition: 0.2s ease-in-out;
  }
`

export const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
`

export const SideBtnRoute = styled.div`
border-radius: 50px;
background: #bd542c;
white-space: nowrap;
padding: 16px 64px;
color: #010606;
font-size: 16px;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;

&:hover{
  transition: all 0.2s ease-in-out;
  background: #fff;
  color: #010606;
}
`
