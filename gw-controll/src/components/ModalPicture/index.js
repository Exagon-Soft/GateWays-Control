import React, { useEffect, useState } from "react";
import { firebaseStorage } from "../../firebase-conf";
import { ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";

import {
  CloseIcon,
  ContainerModal,
  Form,
  FormButton,
  FormFile,
  FormRowContainer,
  FormThumbnail,
  FormTitle,
  Icon,
  ModalBack,
} from "./ModalPictureComponents.js";

const ModalPicture = ({ showpicturesDialog, CloseModals, GateWay_id }) => {
  const [thumbnailSrc, setThumbnailSrc] = useState("");
  const [uploadPicture, setUploadPicture] = useState(null);

  function handleFileUploadChange(event) {
    const picture = event.target.files[0];
    setUploadPicture(picture);
    var imageSRC = URL.createObjectURL(picture);
    setThumbnailSrc(imageSRC);
  }

  async function UploadPicture() {
    try {
      if (uploadPicture !== null) {
        const fileRef = ref(
          firebaseStorage,
          `${GateWay_id}/${uploadPicture.name}`
        );
        await uploadBytes(fileRef, uploadPicture);
        toast("Picture Uploaded");
        CloseModals(true);
      } else {
        toast("Please select a picture");
      }
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
  }, [uploadPicture]);

  return (
    <>
      <ContainerModal showpicturesDialog={showpicturesDialog}>
        <Icon
          onClick={() => {
            CloseModals(false);
          }}
        >
          <CloseIcon />
        </Icon>
        <Form>
          <FormTitle>Add Picture</FormTitle>
          <FormRowContainer>
            <FormThumbnail
              id="UploadImage"
              src={thumbnailSrc}
              onClick={() => {
                var selector = document.getElementById("pictureSelector");
                selector.click();
              }}
            ></FormThumbnail>
          </FormRowContainer>
          <FormFile
            id="pictureSelector"
            type="file"
            onChange={handleFileUploadChange}
          ></FormFile>
          <FormButton onClick={UploadPicture}>Submit</FormButton>
        </Form>
      </ContainerModal>
      <ModalBack showpicturesDialog={showpicturesDialog}></ModalBack>
    </>
  );
};

export default ModalPicture;
