/* eslint-disable array-callback-return */
import React, {lazy, Suspense, useState, useEffect} from 'react';
import {firebaseStorage} from "../../firebase-conf";
import { ref, listAll, getDownloadURL} from "firebase/storage";
import {PeripheralServices} from "../../Services/PeripheralServices";
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
    FormLineDivider,
} from "./LoggedSpaceComponents";
import PictureItem from './PictureItem';
const PeripheralItem = lazy(() => import('./PeripheralItem'));

const renderLoader = () => <p>Loading</p>;

const GateWayListItem = ({ GateWayIcon, gatewayElement, GateWayClick, DeleteGateWayClick, onPeripheralClick, onAddPictureClick}) => {
  const peripheralService = new PeripheralServices();

  //**Storage the Peripheral List */
  const [peripheralList, setperipheralList] = useState([]);
  //**Storage the Picture List */
  const [picturesList, setpicturesList] = useState([]);

  //**Loads the peripheral list for the GateWay */
  async function LoadPeripherals() {
    try {
      var perplist;
      perplist = await peripheralService.getPeripherals(gatewayElement.ID);
      return perplist;
    } catch (error) {
      return error;
    }
  }

  //**Loads the picture list for the GateWay */
  async function LoadPictures() {
    var urlList = [];
    try {
      const picturesListRef = await ref(firebaseStorage, gatewayElement.ID + "/");
      const pictureList = await listAll(picturesListRef);

      await pictureList.items.forEach(async (itemPicture) => {
        var tempUrl = await getDownloadURL(ref(firebaseStorage, gatewayElement.ID + "/" + itemPicture.name));
        if(tempUrl !== "" && tempUrl !== null){
          urlList.push(tempUrl);
        }
      })
      return urlList;
    } catch (error) {
      return error;
    }
  }

  async function RefreshLists(){
    setpicturesList([]);
    setperipheralList([]);
    const tempPict = await LoadPictures();
    const tempList = await LoadPeripherals();
    await setpicturesList(tempPict);
    setperipheralList(tempList.data);
  }

  //** Handles the onGateWay_click event **/
function CollapseClick(sender) {
  var classPatron = "ClickableItem";
  if (sender.target.className.includes(classPatron)) {
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
      //RefreshLists();
    } else {
      gateWayBody.classList.add("Hidden");
    }
  }
}

  useEffect(() => {
    try {
      RefreshLists();
      //this.forceUpdate();
    } catch (error) {
      return error;
    }
  }, [gatewayElement.ID]);

  return (
    <>
      <GateWaysListItem
        className="GateWayItem"
        id={gatewayElement.ID}
        onClick={CollapseClick}
      >
        <GateWaysListItemHead className="collapsible-header ClickableItem">
          <GateWaysListItemHeadWrapper className="ClickableItem">
            <GateWaysListItemHeadIcon
              src={GateWayIcon}
              className="ClickableItem"
            />
            <GateWaysListItemHeadText className="ClickableItem">
              {gatewayElement.Name} ({gatewayElement.IPV4})
            </GateWaysListItemHeadText>
          </GateWaysListItemHeadWrapper>
          <GateWaysListItemHeadButtonsWrapper className="ClickableItem">
            <GateWaysListItemHeadEditButton
              onClick={() => {
                GateWayClick(gatewayElement);
              }}
            >
              Edit
            </GateWaysListItemHeadEditButton>
            <GateWaysListItemHeadDeleteButton
              onClick={() => {
                DeleteGateWayClick(gatewayElement);
              }}
            >
              Delete
            </GateWaysListItemHeadDeleteButton>
          </GateWaysListItemHeadButtonsWrapper>
        </GateWaysListItemHead>
        <GateWaysListItemBody className="Hidden">
          <GateWaysListItemBodyButtonsArea>
            {peripheralList.length < 10 ? (
              <GateWaysListItemAddPeripheralButton
                onClick={() => {
                  onPeripheralClick(null, gatewayElement.ID);
                }}
              >
                New Peripheral
              </GateWaysListItemAddPeripheralButton>
            ) : (
              <></>
            )}

            <GateWaysListItemAddPeripheralButton
              onClick={() => {
                onAddPictureClick("", gatewayElement.ID);
              }}
            >
              New Picture
            </GateWaysListItemAddPeripheralButton>
          </GateWaysListItemBodyButtonsArea>
          <FormLineDivider />
          <Suspense fallback={renderLoader()}>
            {peripheralList !== null ? (
              peripheralList?.map((peripheralElement, index) => (
                <PeripheralItem
                  key={index++}
                  peripheralElement={peripheralElement}
                  PeriphericalClick={onPeripheralClick}
                  GateWayElement={gatewayElement.ID}
                ></PeripheralItem>
              ))
            ) : (
              <h1>No Pictures</h1>
            )}
          </Suspense>
          <FormLineDivider />
          <GateWaysListItemBodyPicturesArea>
            <Suspense fallback={renderLoader()}>
              {picturesList &&
                picturesList?.map((pictureElement, index) => (
                  <PictureItem
                    key={index++}
                    pictureElement={pictureElement}
                  ></PictureItem>
                ))}
            </Suspense>
          </GateWaysListItemBodyPicturesArea>
        </GateWaysListItemBody>
      </GateWaysListItem>
    </>
  );
}

export default GateWayListItem
