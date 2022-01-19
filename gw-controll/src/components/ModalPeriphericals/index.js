import React from "react";
import {
  Chequer,
  CloseIcon,
  ContainerModal,
  Form,
  FormButton,
  FormGoogleRow,
  FormInput,
  FormTitle,
  Icon,
  ModalBack,
} from "./ModalPeriphericalsComponents";

const Peripherals = ({ showperiPhericalsDialog, CloseModals }) => {
  return (
    <>
      <ContainerModal periPhericals={showperiPhericalsDialog}>
        <Icon>
          <CloseIcon onClick={CloseModals} />
        </Icon>
        <Form>
          <FormTitle>Add new Peripheral to this GateWay</FormTitle>
          <FormInput id="peripheralVendor" placeholder="vendor"></FormInput>
          <FormGoogleRow>
            <Chequer type="checkbox"></Chequer>Online
          </FormGoogleRow>

          <FormButton>Continue</FormButton>
        </Form>
      </ContainerModal>
      <ModalBack periPhericals={showperiPhericalsDialog}></ModalBack>
    </>
  );
};

export default Peripherals;
