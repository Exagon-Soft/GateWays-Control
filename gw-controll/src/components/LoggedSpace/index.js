import React, { useEffect, useRef, useState } from "react";
import GateWays from "../ModalGateWays";
import {firestore} from "../../firebase-conf";
import { doc, getDoc } from "firebase/firestore";

import {
  ButtonsArea,
  FormBtn,
  FullContainer,
  GateWaysList,
  ListArea,
} from "./LoggedSpaceComponents";
import GateWayIcon from "../../images/GateWay.svg";

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

    setshowGateWayDialog(true);
  }

  //** Fires when the Delete GateWay Button is clicked */
  function DeleteGateWayClick() {
    setshowGateWayDialog(false);
    setshowDeleteGateWayDialog(true);
  }

 

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
                  
                  gatewayElement={gatewayElement}
                ></GateWayListItem>
              ))}
          </GateWaysList>
        </ListArea>
      </FullContainer>
      
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
