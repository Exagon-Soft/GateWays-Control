import React from "react";
import { CloseIcon, ContainerModal, Form, FormButton, FormInput, FormTitle, Icon, ModalBack } from "./ModalGateWaysComponents";

const GateWays = ({ gateWays, CloseModals }) => {
  return (
    <>
      <ContainerModal gateWays={gateWays}>
          <Icon>
              <CloseIcon onClick={CloseModals}/>
          </Icon>
        <Form>
            <FormTitle>Add new GateWay</FormTitle>
            <FormInput id="gateWayName" placeholder="human-readable name"></FormInput>
            <FormInput id="gateWayIP" placeholder="IPv4 address"></FormInput>
            <FormButton>Continue</FormButton>
        </Form>
      </ContainerModal>
      <ModalBack gateWays={gateWays}></ModalBack>
    </>
  );
};

export default GateWays;
