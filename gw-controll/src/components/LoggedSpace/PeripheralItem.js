import React, { useEffect, useState } from 'react'
import {
  Peripheral,
  PeripheralIcon,
  PeripheralTitle,
} from "./LoggedSpaceComponents";
import Peripherical_Active from "../../images/Peripherical_Active.svg";
import Peripherical_Inactive from "../../images/Peripherical_Inactive.svg";
import moment from "moment";

const PeripheralItem = ({peripheralElement, PeriphericalClick}) => {
  const [peripheralItemData, setperipheralItemData] = useState(null);

  useEffect(() => {
    try {
      setperipheralItemData(peripheralElement);
      console.log(peripheralItemData);
    } catch (error) {
      return(error);
    }
  }, [peripheralElement])
  return (
    <>
      <Peripheral onClick={() => {PeriphericalClick(peripheralElement)}}>
        {peripheralItemData?.Status === "Active" ? (
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
        
        <PeripheralTitle>{peripheralItemData?.Vendor} ({moment(Date(peripheralItemData?.CreateAt)).format("MMM-DD-YYYY")})</PeripheralTitle>
      </Peripheral>
    </>
  );
};

export default PeripheralItem
