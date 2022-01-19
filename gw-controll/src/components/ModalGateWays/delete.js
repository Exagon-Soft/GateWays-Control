import React from 'react';
import { GateWayService } from "../../Services/GateWayServices";
import { ButtonLeftContainer, ButtonRightContainer } from '../Utils/miscElements';
import {
    CloseIcon,
    DeleteContainerModal,
    Form,
    FormButton,
    FormLabel,
    FormRowContainer,
    FormTitle,
    DeleteModalBack,
    Icon,
  } from "./ModalGateWaysComponents";

const DeleteGateWay = ({GateWayDBData,showDeleteGateWayDialog, CloseModals}) => {
  //**Initialize Components */
  const gateWayService = new GateWayService();
  async function onDeleteGateWay() {
      await gateWayService.deleteGateWay(GateWayDBData.ID);
      CloseModals();
  }

  return (
    <>
      <DeleteContainerModal showDeleteGateWayDialog={showDeleteGateWayDialog}>
        <Icon>
          <CloseIcon onClick={CloseModals}>X</CloseIcon>
        </Icon>
        <Form>
          <FormTitle>Delete GateWay</FormTitle>
          <FormRowContainer>
            <FormLabel>
              You are about to delete this GateWay and all of it's accessories.
            </FormLabel>
          </FormRowContainer>
          <FormRowContainer>
            <FormLabel>Pres Confirm to delete, Cancel to maintain.</FormLabel>
          </FormRowContainer>
          <FormRowContainer>
            <ButtonLeftContainer>
              <FormButton onClick={onDeleteGateWay}>Confirm</FormButton>
            </ButtonLeftContainer>
            <ButtonRightContainer>
              <FormButton onClick={CloseModals}>Cancel</FormButton>
            </ButtonRightContainer>
          </FormRowContainer>
        </Form>
      </DeleteContainerModal>
      <DeleteModalBack
        showDeleteGateWayDialog={showDeleteGateWayDialog}
      ></DeleteModalBack>
    </>
  );
}

export default DeleteGateWay
