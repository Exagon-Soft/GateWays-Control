import React, {useState, useEffect} from "react";
import {PeripheralServices} from "../../Services/PeripheralServices";
import {
  Chequer,
  CloseIcon,
  ContainerModal,
  Form,
  FormButton,
  FormGoogleRow,
  FormInput,
  FormRowContainer,
  FormTitle,
  Icon,
  ModalBack,
} from "./ModalPeriphericalsComponents";

const Peripherals = ({ showperiPhericalsDialog, CloseModals, gateway_id, peripheralItemData }) => {
  const peripheralService = new PeripheralServices();
  //**Set the Data Format */
  const initialPeripheralState = {
    Vendor: "",
    Status: "Inactive",
  };
  const [peripheralData, setperipheralData] = useState(initialPeripheralState);

  //**Handle the Data state */
  useEffect(() => {
    if (peripheralItemData !== null && showperiPhericalsDialog) {
      peripheralData.Vendor = peripheralItemData.Vendor;
      peripheralData.Status = peripheralItemData.Status;
    } else {
      setperipheralData(initialPeripheralState);
    }
    document.getElementById("peripheralVendor").value = peripheralData.Vendor;
    if (peripheralData.Status === "Active") {
      document.getElementById("peripheralStatus").checked = true;
    } else {
      document.getElementById("peripheralStatus").checked = false;
    }
  }, [showperiPhericalsDialog]);

  //**Check if the data to save is valid */
  function isValid() {
    var perVendor = peripheralData.Vendor;
    var perStatus = peripheralData.Status;
    var resoult = false;

    if (perVendor !== "" && perStatus !== "") {
      resoult = true;
    }

    return resoult;
  }

  //**Fills the data on demand */
  const UpdateField = (data, field) => {
    setperipheralData({
      ...peripheralData,
      [field]: data,
    });
  };

  function onCloseModal(needRefresh) {
    if (peripheralData.Vendor !== "") {
      setperipheralData(initialPeripheralState);
    }

    CloseModals(needRefresh);
  }

  //**Save the data to the Database */
  async function saveData() {
    try {
      if (isValid) {
        await peripheralService.createPeripheral(gateway_id, peripheralData);
        onCloseModal(true);
      }
    } catch (error) {
      return error;
    }
  }

  //**Update the data in the Database */
  async function updateData() {
    try {
      if (isValid) {
        await peripheralService.updatePeripheral(gateway_id, peripheralItemData.ID, peripheralData);
        onCloseModal(true);
      }
    } catch (error) {
      return error;
    }
  }

   //**Delete the data from the Database */
   async function deleteData() {
     try {
       await peripheralService.deletePeripheral(
         gateway_id,
         peripheralItemData.ID,
       );
       onCloseModal(true);
     } catch (error) {
       return error;
     }
   }

  

  return (
    <>
      <ContainerModal showperiPhericalsDialog={showperiPhericalsDialog}>
        <Icon>
          <CloseIcon onClick={() => {onCloseModal(false);}} />
        </Icon>
        <Form>
          {peripheralItemData === null ? (
            <FormTitle>Add new Peripheral to this GateWay</FormTitle>
          ) : (
            <FormTitle>Update Peripheral</FormTitle>
          )}
          <FormInput
            id="peripheralVendor"
            placeholder="vendor"
            onChange={(sender) => UpdateField(sender.target.value, "Vendor")}
          ></FormInput>
          <FormGoogleRow>
            <Chequer
              id="peripheralStatus"
              type="checkbox"
              onChange={(sender) => {
                var value = "Inactive";
                if (sender.target.checked) {
                  value = "Active";
                }
                UpdateField(value, "Status");
              }}
            ></Chequer>
            Online
          </FormGoogleRow>
          <FormRowContainer>
            <FormButton onClick={() => {onCloseModal(false);}}>Cancel</FormButton>
            {peripheralItemData === null ? (
              <FormButton onClick={saveData}>Add</FormButton>
            ) : (
              <FormButton onClick={updateData}>Update</FormButton>
            )}

            <FormButton onClick={deleteData}>Delete</FormButton>
          </FormRowContainer>
        </Form>
      </ContainerModal>
      <ModalBack showperiPhericalsDialog={showperiPhericalsDialog}></ModalBack>
    </>
  );
};

export default Peripherals;
