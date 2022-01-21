import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

export const LoaderForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(
    108deg,
    rgba(82, 58, 45, 1) 0%,
    rgba(100, 27, 4, 1) 100%
  );
`;

export const CommuneNav = styled.nav`
  background: transparent;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 850px) {
    transition: 0.8s all ease;
  }
`;

export const CommuneNavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`;

export const CommuneNavLogo = styled(LinkR)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;
  display: flex;
`;

//****** BUTTONS ******/
export const Button = styled(LinkS)`
  border-radius: 50px;
  background: ${({ primary }) => (primary ? "#bd542c" : "#010606")};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  color: ${({ dark }) => (dark ? "#010606" : "#fff")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    transition: all 0.3s ease-in-out;
    background: ${({ primary }) => (primary ? "#fff" : "#bd542c")};
  }
`;

export const LinkButton = styled(LinkR)`
  border-radius: 50px;
  background: ${({ primary }) => (primary ? "#bd542c" : "#010606")};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  color: ${({ dark }) => (dark ? "#010606" : "#fff")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  text-decoration: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    transition: all 0.3s ease-in-out;
    background: ${({ primary }) => (primary ? "#fff" : "#bd542c")};
  }
`;

export const CustomleftButton = styled.div`
  text-decoration: none;
  cursor: pointer;
  color: #fff;
  width: Auto;
  margin-top: 20px;
  margin-left: 2px;
  background-color: transparent;
  border: none;

  &:hover {
    color: gray;
  }
`;

export const CustomrightButton = styled.div`
  text-decoration: none;
  cursor: pointer;
  color: #fff;
  width: Auto;
  margin-top: 20px;
  margin-right: 2px;
  background-color: transparent;
  border: none;

  &:hover {
    color: gray;
  }
`;

export const CustomleftLink = styled(LinkR)`
  text-decoration: none;
  cursor: pointer;
  color: #fff;
  width: Auto;
  margin-top: 20px;
  margin-left: 2px;

  &:hover {
    color: gray;
  }
`;

export const CustomrightLink = styled(LinkR)`
  text-decoration: none;
  cursor: pointer;
  color: #fff;
  width: Auto;
  margin-top: 20px;
  margin-right: 2px;

  &:hover {
    color: gray;
  }
`;

export const ButtonLeftContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: flex-start;
`;

export const ButtonRightContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: flex-end;
`;

export const ThreeButtonLeftContainer = styled.div`
  display: flex;
  width: 33%;
  justify-content: flex-start;
`;

export const ThreeButtonRightContainer = styled.div`
  display: flex;
  width: 66%;
  justify-content: flex-end;
`;
