import React from 'react';
import { CarouselImgTop, CarrouselImageLink } from './LoggedSpaceComponents';

const PictureItem = ({pictureElement}) => {
  return (
    <>
      <CarrouselImageLink target="blank" href={pictureElement}>
        <CarouselImgTop src={pictureElement} alt="Images"></CarouselImgTop>
      </CarrouselImageLink>
    </>
  );
};

export default PictureItem;
