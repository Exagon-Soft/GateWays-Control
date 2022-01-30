/* eslint-disable array-callback-return */
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
    CarouselImgTop,
    FormLineDivider,
    CarrouselImageLink,
} from "./LoggedSpaceComponents";
import PeripheralItem from './PeripheralItem';
import Peripherals from "../ModalPeriphericals";
import {PeripheralServices} from "../../Services/PeripheralServices"
import ModalPicture from '../ModalPicture';
import {firebaseStorage} from "../../firebase-conf"
import { ref, listAll, getDownloadURL} from "firebase/storage";

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
    } else {
      gateWayBody.classList.add("Hidden");
    }
  }
}

const GateWayListItem = ({ GateWayIcon, gatewayElement, GateWayClick, DeleteGateWayClick}) => {
  const peripheralService = new PeripheralServices();
  //**Control Peripheral Dialog behavior */
  const [showperiPhericalsDialog, setshowperiPhericalsDialog] = useState(false);
  //**Control Picture Dialog behavior */
  const [showpicturesDialog, setshowpicturesDialog] = useState(false);

  const [peripheralData, setperipheralData] = useState(null);
  const [pictureURL, setpictureURL] = useState("");

  //** Fires when the close modal button is clicked */
  const CloseModals = (needRefresh) => {
    if(needRefresh){
      RefreshLists();
    }
    setshowperiPhericalsDialog(false);
    setshowpicturesDialog(false);
  };

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
      const picturesListRef = ref(firebaseStorage, gatewayElement.ID + "/");
      const pictureList = await listAll(picturesListRef);

      pictureList.items.forEach(async (itemPicture) => {
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

  //** Fires when the Add/Edit Peripherical Button is clicked */
  const PeriphericalClick = (peripheral) => {
    if (peripheral !== null) {
      setperipheralData(peripheral);
    } else {
      setperipheralData(null);
    }

    setshowperiPhericalsDialog(true);
  };

  //** Fires when the Add Picture Button is clicked */
  const OnImageClick = (ImageURL) => {
    if (ImageURL !== "") {
      setpictureURL(ImageURL);
    } else {
      setpictureURL("");
    }
    setshowpicturesDialog(true);
  }

  async function RefreshLists(){
    setpicturesList([]);
    setperipheralList([]);
    const tempPict = await LoadPictures();
    const tempList = await LoadPeripherals();
    setpicturesList(tempPict);
    setperipheralList(tempList.data);
  }

  useEffect(() => {
    async function mockFunction() {
      try {
        await RefreshLists();
      } catch (error) {
        return error;
      }
    }
    mockFunction();
  }, []);

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
                  PeriphericalClick(null);
                }}
              >
                New Peripheral
              </GateWaysListItemAddPeripheralButton>
            ) : (
              <></>
            )}

            <GateWaysListItemAddPeripheralButton
              onClick={() => {
                OnImageClick("");
              }}
            >
              New Picture
            </GateWaysListItemAddPeripheralButton>
          </GateWaysListItemBodyButtonsArea>
          {peripheralList &&
            peripheralList?.map((peripheralElement, index) => (
              <PeripheralItem
                key={peripheralElement.ID + index}
                peripheralElement={peripheralElement}
                PeriphericalClick={PeriphericalClick}
                onClick={() => {PeriphericalClick(peripheralElement);}}
              ></PeripheralItem>
            ))}
          <FormLineDivider />
          <GateWaysListItemBodyPicturesArea>
            {picturesList &&
              picturesList?.map((pictureElement, index) => (
                <CarrouselImageLink target="blank" href={pictureElement}>
                <CarouselImgTop
                  key={index}
                  src={pictureElement}
                  alt="Images"
                ></CarouselImgTop>
                </CarrouselImageLink>
              ))}
          </GateWaysListItemBodyPicturesArea>
        </GateWaysListItemBody>
      </GateWaysListItem>
      <Peripherals
        showperiPhericalsDialog={showperiPhericalsDialog}
        CloseModals={CloseModals}
        gateway_id={gatewayElement.ID}
        peripheralItemData={peripheralData}
      />
      <ModalPicture
        showpicturesDialog={showpicturesDialog}
        CloseModals={CloseModals}
        GateWay_id={gatewayElement.ID}
        pictureURL={pictureURL}
      ></ModalPicture>
    </>
  );
}

export default GateWayListItem
