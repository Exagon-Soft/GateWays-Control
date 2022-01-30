import styled from 'styled-components';
import { FaTimes } from "react-icons/fa";


export const ContainerModal = styled.div`
  display: ${({ showpicturesDialog }) => (showpicturesDialog ? "inline" : "none")};
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: transparent;
  padding: 5%;
  height: 100vh;
  z-index: 950;

  @media screen and (max-width: 850px) {
  }
`;

export const ModalBack = styled.div`
  display: ${({ showpicturesDialog }) => (showpicturesDialog ? "inline" : "none")};
  height: 100vh;
  width: 100%;
  position absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 900;
  background-color: #010101;
  opacity: 0.6;
`;

export const Form = styled.div`
  background: #010101;
  max-width: 400px;
  height: auto;
  width: 100%;
  z-index: 1;
  display: grid;
  margin: 10% auto;
  padding: 30px 40px;
  border-radius: 4px;
  box-shadow: -2px 3px 5px rgba(0, 0, 00, 0.9);

  @media screen and (max-width: 850px) {
    padding: 32px 32px;
    margin: 50% auto;
  }
`;

export const FormTitle = styled.h1`
  margin-bottom: 40px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #fff;
`;

export const FormInput = styled.input`
  padding: 8px 8px;
  margin-bottom: 20px;
  border: none;
  border-radius: 4px;
`;

export const FormFile = styled.input`
  type: file;
  padding: 8px 0px;
  margin-bottom: 20px;
  border: none;
  border-radius: 4px;
  display: none;
`;

export const FormButton = styled.button`
  background: #bd542c;
  margin-top: 10px;
  padding: 6px 16px;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  box-shadow: -2px 3px 5px rgba(56, 47, 53, 0.9);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #a4644c;
    box-shadow: -2px 3px 5px rgba(60, 50, 56, 0.9);
  }

  &:active {
    background: #632209;
    box-shadow: none;
  }
`;

export const FormThumbnail = styled.img`
width: 100%;
height: 220px;
cursor: pointer;
border-radius: 10%;
margin-bottom: 20px;
border: solid 1px white;
`
export const FormRowContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const CloseIcon = styled(FaTimes)`
  color: #fff;
  position: relative;
  z-index: 999;
`;

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: #060805;
  border-radius: 10px;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
  z-index: 950;
`;

export const PicProgress = styled.progress`
  max: 100;
`
