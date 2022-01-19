import React, { useEffect, useRef, useState } from "react";
import GateWays from "../ModalGateWays";
import {firestore} from "../../firebase-conf";
import { doc, getDoc } from "firebase/firestore";
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
import GateWayIcon from "../../images/GateWay.svg";
import Peripherical_Active from "../../images/Peripherical_Active.svg";
import Peripherical_Inactive from "../../images/Peripherical_Inactive.svg";
import { gateWayContext } from "../../Context/GatewayContext";
import GateWayListItem from "./GateWayListItem";
import { GateWayService } from "../../Services/GateWayServices";
import DeleteGateWay from "../ModalGateWays/delete";

const gateWayService = new GateWayService();

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
  //**Control GateWay Dialog behavior */
  const [showGateWayDialog, setshowGateWayDialog] = useState(false);
  //**Control Peripheral Dialog behavior */
  const [showperiPhericalsDialog, setshowperiPhericalsDialog] = useState(false);
  //**Control Delete Dialog behavior */
  const [showDeleteGateWayDialog, setshowDeleteGateWayDialog] = useState(false);
  //**Storage the GateWays List */
  const [gatewayList, setgatewayList] = useState([]);
  //**Storage the GateWay Data */
  const [gatewayDBData, setgatewayDBData] = useState(null);
  //**Storage the Current User Rol */
  const [Rol, setRol] = useState("User");

   //*******Get the current User access Rol */
   async function getUserRol(userUID) {
    const docRef = doc(firestore, `users/${userUID}`);
    getDoc(docRef)
      .then((userRol) => {
        setRol(userRol.data().Rol)
      })
      .catch((error) => {
        return null;
      });
  }

  async function LoadGateWays() {
    try {
      var UserRol = Rol;
      var gateWaylist;
      if(UserRol === "Admin"){
        gateWaylist = await gateWayService.getAllGateWays();
      }else{
        gateWaylist = await gateWayService.getGateWays(UserUID);
      }
      
      return gateWaylist;
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    async function mockFunction() {
      try {
        const tempList = await LoadGateWays();
        setgatewayList(tempList.data);
      } catch (error) {
        return error;
      }
    }
    mockFunction();
  }, [gatewayList]);

  //** Fires when the close modal button is clicked */
  const CloseModals = () => {
    setshowperiPhericalsDialog(false);
    setshowGateWayDialog(false);
    setshowDeleteGateWayDialog(false);
  };

  //** Fires when the Add/Edit GateWay Button is clicked */
  function GateWayClick(gatData) {
    if (gatData !== null) {
      setgatewayDBData(gatData);
    } else {
      setgatewayDBData(null);
    }

    setshowperiPhericalsDialog(false);
    setshowGateWayDialog(true);
  }

  //** Fires when the Delete GateWay Button is clicked */
  function DeleteGateWayClick() {
    setshowperiPhericalsDialog(false);
    setshowGateWayDialog(false);
    setshowDeleteGateWayDialog(true);
  }

  //** Fires when the Add/Edit Peripherical Button is clicked */
  const PeriphericalClick = () => {
    setshowGateWayDialog(false);
    setshowperiPhericalsDialog(true);
  };

  return (
    <>
      <FullContainer>
        <ButtonsArea>
          <FormBtn
            onClick={() => {
              GateWayClick(null);
            }}
          >
            Add GateWay
          </FormBtn>
        </ButtonsArea>
        <ListArea>
          <GateWaysList className="collapsible">
            {gatewayList &&
              gatewayList.map((gatewayElement) => (
                <GateWayListItem
                  key={gatewayElement.id}
                  onClick={CollapseClick}
                  GateWayIcon={GateWayIcon}
                  GateWayClick={GateWayClick}
                  DeleteGateWayClick={DeleteGateWayClick}
                  PeriphericalClick={PeriphericalClick}
                  gatewayElement={gatewayElement}
                ></GateWayListItem>
              ))}
            {/* <GateWaysListItem onClick={CollapseClick}>
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
            </GateWaysListItem> */}
          </GateWaysList>
        </ListArea>
      </FullContainer>
      <Peripherals
        showperiPhericalsDialog={showperiPhericalsDialog}
        CloseModals={CloseModals}
      />
      <GateWays
        showGateWayDialog={showGateWayDialog}
        CloseModals={CloseModals}
        UserUID={UserUID}
        GateWayDBData={gatewayDBData}
      />
      <DeleteGateWay
        GateWayDBData={gatewayDBData}
        showDeleteGateWayDialog={showDeleteGateWayDialog}
        CloseModals={CloseModals}
      ></DeleteGateWay>
    </>
  );
};

export default LoggedArea;
