import React, { useContext, useState } from "react";
import GateWays from "../ModalGateWays";
import Peripherals from "../ModalPeriphericals";
import {
  ButtonsArea,
  FormBtn,
  FullContainer,
  GateWaysList,
  GateWaysListItem,
  GateWaysListItemAddPeripheralButton,
  GateWaysListItemBodyPicturesArea,
  GateWaysListItemBody,
  GateWaysListItemBodyButtonsArea,
  GateWaysListItemHead,
  GateWaysListItemHeadButtonsWrapper,
  GateWaysListItemHeadDeleteButton,
  GateWaysListItemHeadEditButton,
  GateWaysListItemHeadIcon,
  GateWaysListItemHeadText,
  GateWaysListItemHeadWrapper,
  ListArea,
  Peripheral,
  PeripheralIcon,
  PeripheralTitle,
} from "./LoggedSpaceComponents";
import GateWay from "../../images/GateWay.svg";
import Peripherical_Active from "../../images/Peripherical_Active.svg";
import Peripherical_Inactive from "../../images/Peripherical_Inactive.svg";
import { gateWayContext } from "../../Context/GatewayContext";

//** Handles the onGateWay_click event **/
function CollapseClick(sender) {
  var gateWayHeader = sender.target.closest(".collapsible-header");
  var gateWay = gateWayHeader.parentNode;
  var gateWayBody = gateWay.childNodes[1];
  var classList = gateWayBody.classList;
  var hasClass = false;

  classList.forEach((element) => {
    if (element === "Hidden") {
      hasClass = true;
    }
  });

  if (hasClass) {
    gateWayBody.classList.remove("Hidden");
  } else {
    gateWayBody.classList.add("Hidden");
  }
}

const LoggedArea = ({ UserUID }) => {
  const [gateWays, setgateWays] = useState(false);
  const [periPhericals, setperiPhericals] = useState(false);

  const [gateways] = useContext(gateWayContext);

  //** Fires when the close modal button is clicked */
  const CloseModals = () => {
    setperiPhericals(false);
    setgateWays(false);
  };

  //** Fires when the Add/Edit GteWay Button is clicked */
  const GateWayClick = () => {
    setperiPhericals(false);
    setgateWays(true);
  };

  //** Fires when the Add/Edit Peripherical Button is clicked */
  const PeriphericalClick = () => {
    setgateWays(false);
    setperiPhericals(true);
  };

  return (
    <>
      <FullContainer>
        <ButtonsArea>
          <FormBtn onClick={GateWayClick}>Add GateWay</FormBtn>
        </ButtonsArea>
        <ListArea>
          <GateWaysList className="collapsible">
            <GateWaysListItem className="" onClick={CollapseClick}>
              <GateWaysListItemHead className="collapsible-header">
                <GateWaysListItemHeadWrapper>
                  <GateWaysListItemHeadIcon src={GateWay} />
                  <GateWaysListItemHeadText>
                    North Dakota (10.7.9.25)
                  </GateWaysListItemHeadText>
                </GateWaysListItemHeadWrapper>
                <GateWaysListItemHeadButtonsWrapper>
                  <GateWaysListItemHeadEditButton>
                    Edit
                  </GateWaysListItemHeadEditButton>
                  <GateWaysListItemHeadDeleteButton>
                    Delete
                  </GateWaysListItemHeadDeleteButton>
                </GateWaysListItemHeadButtonsWrapper>
              </GateWaysListItemHead>
              <GateWaysListItemBody className="Hidden">
                <GateWaysListItemBodyButtonsArea>
                  <GateWaysListItemAddPeripheralButton onClick={PeriphericalClick}>
                    New Peripheral
                  </GateWaysListItemAddPeripheralButton>
                  <GateWaysListItemAddPeripheralButton onClick={PeriphericalClick}>
                    New Picture
                  </GateWaysListItemAddPeripheralButton>
                </GateWaysListItemBodyButtonsArea>
                <Peripheral onClick={PeriphericalClick}>
                  <PeripheralIcon
                    src={Peripherical_Active}
                    alt=""
                  ></PeripheralIcon>
                  <PeripheralTitle>Samsung (12/12/2021)</PeripheralTitle>
                </Peripheral>
                <Peripheral onClick={PeriphericalClick}>
                  <PeripheralIcon
                    src={Peripherical_Active}
                    alt=""
                  ></PeripheralIcon>
                  <PeripheralTitle>Samsung (04/01/2022)</PeripheralTitle>
                </Peripheral>
                <Peripheral onClick={PeriphericalClick}>
                  <PeripheralIcon
                    src={Peripherical_Active}
                    alt=""
                  ></PeripheralIcon>
                  <PeripheralTitle>Dichotic (16/02/2022)</PeripheralTitle>
                </Peripheral>
                <Peripheral onClick={PeriphericalClick}>
                  <PeripheralIcon
                    src={Peripherical_Inactive}
                    alt=""
                  ></PeripheralIcon>
                  <PeripheralTitle>Haier (22/03/2022)</PeripheralTitle>
                </Peripheral>
                <GateWaysListItemBodyPicturesArea>
                  
                </GateWaysListItemBodyPicturesArea>
              </GateWaysListItemBody>
            </GateWaysListItem>
          </GateWaysList>
        </ListArea>
      </FullContainer>
      <Peripherals periPhericals={periPhericals} CloseModals={CloseModals} />
      <GateWays
        gateWays={gateWays}
        CloseModals={CloseModals}
        UserUID={UserUID}
      />
    </>
  );
};

export default LoggedArea;
