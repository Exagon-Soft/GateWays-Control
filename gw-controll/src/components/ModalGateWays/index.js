import React, { useEffect, useState} from "react";
import { GateWayService } from "../../Services/GateWayServices";
import { toast } from "react-toastify";
import {
  CloseIcon,
  ContainerModal,
  Form,
  FormButton,
  FormInput,
  FormTitle,
  Icon,
  ModalBack,
} from "./ModalGateWaysComponents";



const GateWays = ({ showGateWayDialog, CloseModals, UserUID, GateWayDBData}) => {
  //**Initialize Components */
  const gateWayService = new GateWayService();
  toast.configure();
  //**Set the Data Format */
  const initialGatewayState = {
    UserUID: "",
    Name: "",
    IPV4: "",
  };
 
  //**Handle the Data state */
  useEffect(() => {
    
    if (GateWayDBData !== null && showGateWayDialog) {
      gatewayData.Name = GateWayDBData.Name;
      gatewayData.IPV4 = GateWayDBData.IPV4;
    } else {
      setgatewayData(initialGatewayState);
    }
    document.getElementById("gateWayName").value = gatewayData.Name;
    document.getElementById("gateWayIP").value = gatewayData.IPV4;
  }, [showGateWayDialog]);

  const [gatewayData, setgatewayData] = useState(initialGatewayState);

  //**Validate a correct IP string */
  function ValidIP(stringIP) {
    var patronIp = new RegExp(
      "^([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3})$"
    );
    var values;

    // early return if the string is in incorrect format
    if (stringIP.search(patronIp) !== 0) {
      return false;
    }

    values = stringIP.split(".");

    return (
      values[0] <= 255 &&
      values[1] <= 255 &&
      values[2] <= 255 &&
      values[3] <= 255
    );
  }

  function onCloseModal(needRefresh) {
    if (
      gatewayData.UserUID !== "" ||
      gatewayData.Name !== "" ||
      gatewayData.IPV4 !== ""
    ) {
      setgatewayData(initialGatewayState);
    }

    CloseModals(needRefresh);
  }

  //**Check if the data to save is valid */
  function isValid() {
    var gatName = gatewayData.Name;
    var gatIPV4 = gatewayData.IPV4;
    var resoult = false;

    if (gatName !== "" && gatIPV4 !== "" && ValidIP(gatIPV4)) {
      resoult = true;
    }

    return resoult;
  }

  function ShowErrors() {
    if (gatewayData.Name === "") {
      toast("GateWay Name can not be null");
    }
    if (gatewayData.IPV4 === "") {
      toast("GateWay IPV4 can not be null");
    } else {
      if (!ValidIP(gatewayData.IPV4)) {
        toast("Invalid IPV4 address");
      }
    }
  }

  //**Fills the data on demand */
  const UpdateField = (data, field) => {
    setgatewayData({
      ...gatewayData,
      [field]: data,
    });
  };

  //**Save the data to the Database */
  const saveGateWay = async () => {
    if (isValid()) {
      try {
        await gateWayService.createGateway(gatewayData);
        onCloseModal(true);
      } catch (error) {
        return error;
      }
    } else {
      ShowErrors();
    }
  };

  //**Updates the data in the Database */
  const changeGateWay = async () => {
    if (isValid()) {
      await gateWayService.updateGateWay(GateWayDBData.ID, gatewayData);
      onCloseModal(true);
    } else {
      ShowErrors();
    }
  };

  return (
    <>
      <ContainerModal showGateWayDialog={showGateWayDialog}>
        <Icon>
          <CloseIcon onClick={() => {onCloseModal(false)}} />
        </Icon>
        <Form>
          <FormTitle>
            {GateWayDBData === null ? "Add new" : "Update"} GateWay
          </FormTitle>
          <FormInput
            id="gateWayName"
            placeholder="human-readable name"
            onChange={(sender) => {
              UpdateField(sender.target.value, "Name");
              if (gatewayData.UserUID === null || gatewayData.UserUID === "")
                UpdateField(UserUID, "UserUID");
            }}
          ></FormInput>
          <FormInput
            id="gateWayIP"
            placeholder="IPv4 address"
            onChange={(sender) => UpdateField(sender.target.value, "IPV4")}
          ></FormInput>
          {GateWayDBData === null ? (
            <FormButton onClick={saveGateWay}>Add GateWay</FormButton>
          ) : (
            <FormButton onClick={changeGateWay}>Update GateWay</FormButton>
          )}
        </Form>
      </ContainerModal>
      <ModalBack showGateWayDialog={showGateWayDialog}></ModalBack>
    </>
  );
};

export default GateWays;
