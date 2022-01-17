import React, { createContext, useState, useEffect} from "react";
import { GateWayService } from "../Services/GateWayServices";

export const gateWayContext = createContext();

const GatewayContextProvider = ({props, currentUserUID}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const gateWayService = new GateWayService();

  const [gateWays, setGateWays] = useState([]);
  const [gateWayEdit, setGateWayEdit] = useState(null);

  useEffect(() => {
    gateWayService.getGateWays(currentUserUID).then((data) => setGateWays(data));
  }, [gateWayService, gateWays]);

  const addGateway = (gateway) => {
    gateWayService.createGateway(gateway).then((data) => {
      setGateWays([...gateWays, data]);
    });
  };

  

  const deleteGateway = (gateway) => {
    gateWayService
      .deleteGateway(gateway.uid)
      .then(() => setGateWays(gateWays.filter((gw) => gw.uid !== gateway.uid)));
  };

  const findGateway = (gateway) => {
    const targetGateway = gateWays.find((gw) => gw.uid === gateway.uid);

    setGateWayEdit(targetGateway);
  };

  const updateGateway = (gateway) => {
    gateWayService
      .updateGateway(gateway.uid)
      .then((data) =>
        setGateWays(
          gateWays.map((gw) => (gw.uid === gateway.uid ? data : gateway))
        )
      );

    setGateWayEdit(null);
  };

  return (
    <gateWayContext.Provider
      value={[
        addGateway,
        deleteGateway,
        updateGateway,
        findGateway,
        gateWayEdit,
        gateWays,
      ]}
    >
      {props.children}
    </gateWayContext.Provider>
  );
};

export default GatewayContextProvider;
