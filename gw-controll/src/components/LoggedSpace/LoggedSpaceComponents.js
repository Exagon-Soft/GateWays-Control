import styled from "styled-components";

export const FullContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  padding: 7%;

  @media screen and (max-width: 850px) {
    padding: 100px 3% 3% 3%;
  }
`;

export const ButtonsArea = styled.div`
  display: flex;
  height: 20%;
  width: 100%;
  padding: 20px;
  justify-content: flex-start;
  align-items: center;
`;

export const FormBtn = styled.div`
  align-content: center;
  display: flex;
  width: fit-content;
  background: #bd542c;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  box-shadow: -2px 3px 5px rgba(56, 47, 53, 0.9);
  transition: all 0.3s ease-in-out;
  height: fit-content;
  padding: 5px 10px;

  &:hover {
    background: #a4644c;
    box-shadow: -2px 3px 5px rgba(60, 50, 56, 0.9);
  }

  &:active {
    background: #632209;
    box-shadow: none;
  }
`;

export const ListArea = styled.div`
  display: flex;
  height: 80%;
  width: 100%;
  padding: 20px;
  justify-content: center;
`;

export const GateWaysList = styled.ul`
  width: 100%;
  transition: all 0.4s ease-in-out;
`;

export const GateWaysListItem = styled.li`
  list-style: none;
  margin-bottom: 10px;
`;

export const GateWaysListItemHead = styled.div`
  class-name: collapsible-header;
  display: flex;
  padding: 5px 20px;
  border-radius: 5px;
  background-color: burlywood;
  border: solid 2px blanchedalmond;
  transition: all 0.2s ease-in-out;
  box-shadow: 2px 3px 5px rgba(43, 38, 41, 0.9);
  cursor: pointer;
  position: relative;
  z-index: 100;

  &:hover {
    background-color: bisque;
    box-shadow: 2px 3px 5px rgba(132, 115, 125, 0.9);
  }
`;

export const GateWaysListItemHeadWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const GateWaysListItemHeadButtonsWrapper = styled.div`
  width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
`;

export const GateWaysListItemHeadIcon = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-right: 5px;
`;

export const GateWaysListItemHeadText = styled.h2`
  @media screen and (max-width: 850px) {
    font-size: small !important;
    font-weight: bold;
  }
`;

export const GateWaysListItemHeadDeleteButton = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 5px 10px;
  margin-right: 5px;
  background-color: red;
  border-radius: 5px;
  box-shadow: 2px 3px 5px rgba(43, 38, 41, 0.9);
  display: grid;
  justify-self: right;
  cursor: pointer;
  z-index: 200;

  &:hover {
    background-color: #f74a4a;
    box-shadow: 2px 3px 5px rgba(132, 115, 125, 0.9);
  }
`;

export const GateWaysListItemHeadEditButton = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 5px 10px;
  margin-right: 5px;
  background-color: green;
  border-radius: 5px;
  box-shadow: 2px 3px 5px rgba(43, 38, 41, 0.9);
  display: grid;
  justify-self: right;
  cursor: pointer;
  z-index: 200;

  &:hover {
    background-color: #6df46d;
    box-shadow: 2px 3px 5px rgba(132, 115, 125, 0.9);
  }
`;

export const GateWaysListItemBody = styled.div`
  width: 90%;
  margin-left: 5%;
  border-width: 0px 2px 2px 2px;
  border-color: blanchedalmond;
  border-style: solid;
  border-radius: 0 0 5px 5px;
  height: auto;
  padding: 20px;
  background-color: #c19863;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  transition: all 0.3s ease-in-out;
`;

export const GateWaysListItemBodyButtonsArea = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-items: center;
  justify-content: left;
  align-items: center;
`;

export const FormLineDivider = styled.div`
  width: 100%;
  display: flex;
  align-self: center;
  margin-left: 3px;
  margin-right: 3px;
  border-bottom: solid 2px #fff;
  margin-top: 20px;
  margin-bottom: 20px;
  overflow: clip;
`;

export const GateWaysListItemBodyPicturesArea = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-items: center;
  justify-content: left;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 10px;
`;

export const GateWaysListItemAddPeripheralButton = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 5px 10px;
  margin-right: 5px;
  background-color: blue;
  border-radius: 5px;
  box-shadow: 2px 3px 5px rgba(43, 38, 41, 0.9);
  display: grid;
  justify-self: right;
  cursor: pointer;
  z-index: 200;

  &:hover {
    background-color: #6df46d;
    box-shadow: 2px 3px 5px rgba(132, 115, 125, 0.9);
  }
`;

export const GateWaysListItemAddPictureButton = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 5px 10px;
  margin-right: 5px;
  background-color: blue;
  border-radius: 5px;
  box-shadow: 2px 3px 5px rgba(43, 38, 41, 0.9);
  display: grid;
  justify-self: right;
  cursor: pointer;
  z-index: 200;

  &:hover {
    background-color: #6df46d;
    box-shadow: 2px 3px 5px rgba(132, 115, 125, 0.9);
  }
`;

export const GateWaysListItemOpenGaleryButton = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 5px 10px;
  margin-right: 5px;
  background-color: blue;
  border-radius: 5px;
  box-shadow: 2px 3px 5px rgba(43, 38, 41, 0.9);
  display: grid;
  justify-self: right;
  cursor: pointer;
  z-index: 200;

  &:hover {
    background-color: #6df46d;
    box-shadow: 2px 3px 5px rgba(132, 115, 125, 0.9);
  }
`;

export const GateWaysListItemBodyPeripheralArea = styled.div``;

export const Peripheral = styled.div`
  border-radius: 5px;
  width: fit-content;
  padding: 5px 10px;
  background-color: chocolate;
  display: flex;
  align-items: center;
  margin: 10px;
  cursor: pointer;

  &:hover {
    background-color: #e8a87a;
  }
`;

export const PeripheralIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 5px;
`;

export const PeripheralTitle = styled.h3``;

export const CarouselItem = styled.div``;

export const CarrouselImageLink = styled.a`
   className: card-img-top;
   display: flex;
   overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`

export const CarouselImgTop = styled.img`
  className: card-img-top;
  width: 120px;
  height: 120px;
  display: flex;
  margin: 10px;
  border: solid 1px white;
  border-radius: 20%;
  overflow: scroll;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover{
    height: 130px
  }   
`;

export const CarouselCard = styled.div`
  className: card;
`;

export const CarouselCardBody = styled.div`
  className: card-body;
`;

export const CarouselCardTitle = styled.h5`
  className: card-title;
`;

export const CarouselCardText = styled.p`
  className: card-text;
`;
