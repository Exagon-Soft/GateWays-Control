import React, { createContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { GateWayService } from "../Services/GateWayServices";
import {firebaseAuth} from "../firebase-conf";


export const gateWayContext = createContext();

const GatewayContextProvider = (props) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const gateWayService = new GateWayService();
  const currentUser = useAuthState(firebaseAuth);
  const [gatewayItems, setgatewayItems] = useState([]);
  const [gateWayEdit, setGateWayEdit] = useState(null);

  const addGateway = (gateway) => {
    gateWayService.createGateway(gateway).then((data) => {
      getUserGateWAys(currentUser[0].uid);
    });
  };

  const getUserGateWAys = async (user_id) => {
    try {
      const gateWaylist = await gateWayService.getGateWays(user_id);
      setgatewayItems(gateWaylist);
    } catch (error) {
      return error;
    }
  }

  const getUserGatewaysList = async () =>{
    await getUserGateWAys(currentUser[0].uid);
    return gatewayItems;
  }

  const deleteGateway = (gateway) => {
    gateWayService
      .deleteGateway(gateway.uid)
      .then(() => getUserGateWAys(currentUser[0].uid));
  };

  const findGateway = (gateway) => {
    const targetGateway = gatewayItems.find((gw) => gw.uid === gateway.uid);

    setGateWayEdit(targetGateway);
  };

  const updateGateway = (gateway_id, updateValues) => {
    gateWayService
      .updateGateWay(gateway_id, updateValues)
      .then((data) =>
        getUserGateWAys(currentUser[0].uid)
      );

    setGateWayEdit(null);
  };

  return (
    <gateWayContext.Provider
      value={[
        deleteGateway,
        updateGateway,
        findGateway,
        addGateway,
        getUserGatewaysList,
        gateWayEdit,
        gatewayItems,
      ]}
    >
      {props.children}
    </gateWayContext.Provider>
  );
};

export default GatewayContextProvider;
