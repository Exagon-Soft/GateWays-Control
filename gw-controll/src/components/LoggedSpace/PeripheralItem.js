import React from 'react'
import {
  Peripheral,
  PeripheralIcon,
  PeripheralTitle,
} from "./LoggedSpaceComponents";
import Peripherical_Active from "../../images/Peripherical_Active.svg";
import Peripherical_Inactive from "../../images/Peripherical_Inactive.svg";
import moment from "moment";

const PeripheralItem = ({peripheralElement, PeriphericalClick}) => {
  return (
    <>
      <Peripheral onClick={() => {PeriphericalClick(peripheralElement)}}>
        {peripheralElement.Status === "Active" ? (
          <PeripheralIcon
            src={Peripherical_Active}
            alt="Peripheral Status"
          ></PeripheralIcon>
        ) : (
          <PeripheralIcon
            src={Peripherical_Inactive}
            alt="Peripheral Status"
          ></PeripheralIcon>
        )}

        <PeripheralTitle>{peripheralElement.Vendor} ({moment(Date(peripheralElement.CreateAt)).format("MMM-DD-YYYY")})</PeripheralTitle>
      </Peripheral>
    </>
  );
};

export default PeripheralItem
