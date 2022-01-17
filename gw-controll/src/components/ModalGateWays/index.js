import React, { useState, useContext } from "react";
import { gateWayContext } from "../../Context/GatewayContext";
import GateWay from "../../images/GateWay.svg";
import {
  CloseIcon,
  ContainerModal,
  Form,
  FormButton,
  FormInput,
  FormLabel,
  FormTitle,
  GateWayPreview,
  Icon,
  ModalBack,
} from "./ModalGateWaysComponents";

const GateWays = ({ gateWays, CloseModals, UserUID }) => {
  const [preview, setpreview] = useState(GateWay);
  
  const initialGatewayState = {
    UserUID: "",
    Name: "",
    IPV4: "",
  };
  const [gatewayData, setgatewayData] = useState(initialGatewayState);

  const [addGateway, deleteGateway, updateGateway] = useContext(gateWayContext);


  const UpdateField = (data, field) => {
    setgatewayData({
      ...gatewayData,
      [field]: data,
    });
    console.log(UserUID, gatewayData);
  };

  const saveGateWay = () => {
    addGateway(gatewayData);
    setgatewayData(initialGatewayState);
    CloseModals();
  };

  return (
    <>
      <ContainerModal gateWays={gateWays}>
        <Icon>
          <CloseIcon onClick={CloseModals} />
        </Icon>
        <Form>
          <FormTitle>Add new GateWay</FormTitle>
          <FormInput
            id="gateWayName"
            placeholder="human-readable name"
            value={gatewayData.Name}
            onChange={(sender) => {
              UpdateField(sender.target.value, "Name");
              if (gatewayData.UserUID === null || gatewayData.UserUID === "")
                UpdateField(UserUID, "UserUID");
            }}
          ></FormInput>
          <FormInput
            id="gateWayIP"
            placeholder="IPv4 address"
            value={gatewayData.IPV4}
            onChange={(sender) => UpdateField(sender.target.value, "IPV4")}
          ></FormInput>
          <FormButton onClick={saveGateWay}>Continue</FormButton>
        </Form>
      </ContainerModal>
      <ModalBack gateWays={gateWays}></ModalBack>
    </>
  );
};

export default GateWays;
