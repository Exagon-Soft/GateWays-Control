import styled from 'styled-components';
import { FaTimes } from "react-icons/fa";

export const ContainerModal = styled.div`
  display: ${({ showGateWayDialog }) => (showGateWayDialog ? "inline" : "none")};
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

export const DeleteContainerModal = styled.div`
  display: ${({ showDeleteGateWayDialog }) => (showDeleteGateWayDialog ? "inline" : "none")};
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

export const GateWayPreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`

export const GteWayPreviewSearcher = styled.input`
   
`

export const ModalBack = styled.div`
  display: ${({ showGateWayDialog }) => (showGateWayDialog ? "inline" : "none")};
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

export const DeleteModalBack = styled.div`
  display: ${({ showDeleteGateWayDialog }) => (showDeleteGateWayDialog ? "inline" : "none")};
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

export const FormGoogleRow = styled.div`
  width: 100%;
  display: flex;
  vertical-align: middle;
  color: #fff;
`;

export const FormRowContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const FormBtn = styled.div`
  align-content: center;
  margin-left: 10%;
  display: flex;
  width: 80%;
  background: #bd542c;
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

export const FormEmailSelect = styled.div`
  margin-left: 10%;
  display: flex;
  width: 80%;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
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


export const CloseIcon = styled(FaTimes)`
  color: #fff;
  margin: 5px 5px -3px 5px;
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