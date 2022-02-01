import React, {lazy, Suspense, useEffect, useState } from "react";

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
import { GateWayService } from "../../Services/GateWayServices";

const GateWays = lazy(() => import("../ModalGateWays"));
const GateWayListItem = lazy(() => import("./GateWayListItem"));
const DeleteGateWay = lazy(() => import("../ModalGateWays/delete"));

const renderLoader = () => <p>Loading</p>;

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
   async function getUserRol() {
    const docRef = doc(firestore, `users/${UserUID}`);
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
      await getUserRol();
      var gateWaylist;
      if(Rol === "Admin"){
        gateWaylist = await gateWayService.getAllGateWays();
      }else{
        gateWaylist = await gateWayService.getGateWays(UserUID);
      }
      console.log(gateWaylist);
      return gateWaylist;
    } catch (error) {
      return error;
    }
  }

  async function LoadGateWaysList(){
    setgatewayList([]);
    const tempList = await LoadGateWays();
    setgatewayList(tempList.data);
  }

  useEffect(() => {
    try {
      LoadGateWaysList();
      
    } catch (error) {
      return error;
    }
  }, []);

  //** Fires when the close modal button is clicked */
  const CloseModals = (needLoad) => {
    setshowGateWayDialog(false);
    setshowDeleteGateWayDialog(false);
    if(needLoad){
      LoadGateWaysList();
      this.forceUpdate();
    }
    
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
  function DeleteGateWayClick(gatData) {
    if (gatData !== null) {
      setgatewayDBData(gatData);
    } else {
      setgatewayDBData(null);
    }
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
              gatewayList.map((gatewayElement, index) => (
                <Suspense fallback={renderLoader()}>
                  <GateWayListItem
                    key={gatewayElement.id}
                    onClick={CollapseClick}
                    GateWayIcon={GateWayIcon}
                    GateWayClick={GateWayClick}
                    DeleteGateWayClick={DeleteGateWayClick}
                    gatewayElement={gatewayElement}
                  ></GateWayListItem>
                </Suspense>
              ))}
          </GateWaysList>
        </ListArea>
      </FullContainer>
      <Suspense fallback={renderLoader()}>
        <GateWays
          showGateWayDialog={showGateWayDialog}
          CloseModals={CloseModals}
          UserUID={UserUID}
          GateWayDBData={gatewayDBData}
        />
      </Suspense>
      <Suspense fallback={renderLoader()}>
        <DeleteGateWay
          GateWayDBData={gatewayDBData}
          showDeleteGateWayDialog={showDeleteGateWayDialog}
          CloseModals={CloseModals}
        ></DeleteGateWay>
      </Suspense>
    </>
  );
};

export default LoggedArea;
