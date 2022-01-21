import React, {useState, useEffect} from 'react'
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
import PeripheralItem from './PeripheralItem';
import Peripherals from "../ModalPeriphericals";
import {PeripheralServices} from "../../Services/PeripheralServices"

//** Handles the onGateWay_click event **/
function CollapseClick(sender) {
  console.log(sender.target.className);
  if (sender.target.className === "sc-dtMgUX ihlPog" || sender.target.className === "sc-cZMNgc" || sender.target.className === "sc-kHOZwM gkouWf" || sender.target.className === "sc-bTfYFJ eLiHqb collapsible-header") {
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
}

const GateWayListItem = ({ GateWayIcon, gatewayElement, GateWayClick, DeleteGateWayClick}) => {
  const peripheralService = new PeripheralServices();
  //**Control Peripheral Dialog behavior */
  const [showperiPhericalsDialog, setshowperiPhericalsDialog] = useState(false);
  const [peripheralData, setperipheralData] = useState(null);

  //** Fires when the close modal button is clicked */
  const CloseModals = () => {
    setshowperiPhericalsDialog(false);
  };

  //**Storage the Peripheral List */
  const [peripheralList, setperipheralList] = useState([]);

  async function LoadPeripherals() {
    try {
      var perplist;
      perplist = await peripheralService.getPeripherals(gatewayElement.ID);
      return perplist;
    } catch (error) {
      return error;
    }
  }

  //** Fires when the Add/Edit Peripherical Button is clicked */
  const PeriphericalClick = (peripheral) => {

    if (peripheral !== null) {
      setperipheralData(peripheral);
    } else {
      setperipheralData(null);
    }

    setshowperiPhericalsDialog(true);
  };

  useEffect(() => {
    async function mockFunction() {
      try {
        const tempList = await LoadPeripherals();
        setperipheralList(tempList.data);
      } catch (error) {
        return error;
      }
    }
    mockFunction();
  }, [gatewayElement]);

  return (
    <>
      <GateWaysListItem
        class="GateWayItem"
        id={gatewayElement.ID}
        onClick={CollapseClick}
      >
        <GateWaysListItemHead className="collapsible-header">
          <GateWaysListItemHeadWrapper>
            <GateWaysListItemHeadIcon src={GateWayIcon} />
            <GateWaysListItemHeadText>
              {gatewayElement.Name} ({gatewayElement.IPV4})
            </GateWaysListItemHeadText>
          </GateWaysListItemHeadWrapper>
          <GateWaysListItemHeadButtonsWrapper>
            <GateWaysListItemHeadEditButton
              onClick={() => {
                GateWayClick(gatewayElement);
              }}
            >
              Edit
            </GateWaysListItemHeadEditButton>
            <GateWaysListItemHeadDeleteButton onClick={DeleteGateWayClick}>
              Delete
            </GateWaysListItemHeadDeleteButton>
          </GateWaysListItemHeadButtonsWrapper>
        </GateWaysListItemHead>
        <GateWaysListItemBody className="Hidden">
          <GateWaysListItemBodyButtonsArea>
            {peripheralList.length < 10 ? (
              <GateWaysListItemAddPeripheralButton onClick={() => {PeriphericalClick(null);}}>
                New Peripheral
              </GateWaysListItemAddPeripheralButton>
            ) : (
              <></>
            )}

            <GateWaysListItemAddPeripheralButton onClick={PeriphericalClick}>
              New Picture
            </GateWaysListItemAddPeripheralButton>
          </GateWaysListItemBodyButtonsArea>
          {peripheralList &&
            peripheralList.map((peripheralElement) => (
              <PeripheralItem
                key={peripheralElement.ID}
                peripheralElement={peripheralElement}
                PeriphericalClick={PeriphericalClick}
              ></PeripheralItem>
            ))}
          <GateWaysListItemBodyPicturesArea></GateWaysListItemBodyPicturesArea>
        </GateWaysListItemBody>
      </GateWaysListItem>
      <Peripherals
        showperiPhericalsDialog={showperiPhericalsDialog}
        CloseModals={CloseModals}
        gateway_id={gatewayElement.ID}
        peripheralItemData={peripheralData}
      />
    </>
  );
}

export default GateWayListItem
