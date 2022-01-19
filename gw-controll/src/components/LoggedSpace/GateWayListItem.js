import React from 'react'
import {
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
} from "./LoggedSpaceComponents";

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

const GateWayListItem = ({ PeriphericalClick, GateWayIcon, gatewayElement, GateWayClick, DeleteGateWayClick}) => {
    return (
        <>
            <GateWaysListItem id={gatewayElement.ID} onClick={CollapseClick}>
              <GateWaysListItemHead className="collapsible-header">
                <GateWaysListItemHeadWrapper>
                  <GateWaysListItemHeadIcon src={GateWayIcon} />
                  <GateWaysListItemHeadText>
                     {gatewayElement.Name} ({gatewayElement.IPV4})
                  </GateWaysListItemHeadText>
                </GateWaysListItemHeadWrapper>
                <GateWaysListItemHeadButtonsWrapper>
                  <GateWaysListItemHeadEditButton onClick={() => {GateWayClick(gatewayElement);}}>
                    Edit
                  </GateWaysListItemHeadEditButton>
                  <GateWaysListItemHeadDeleteButton onClick={DeleteGateWayClick}>
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
                <GateWaysListItemBodyPicturesArea>
                </GateWaysListItemBodyPicturesArea>
              </GateWaysListItemBody>
            </GateWaysListItem>
        </>
    )
}

export default GateWayListItem
