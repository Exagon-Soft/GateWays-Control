import styled from "styled-components";
import { Link as LinkScroll } from "react-scroll";

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
