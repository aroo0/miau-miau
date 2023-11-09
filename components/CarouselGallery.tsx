"use client";
import BearCarousel, {
  TBearSlideItemDataList,
  BearSlideImage,
} from "bear-react-carousel";
import "bear-react-carousel/dist/index.css";
import styled from 'styled-components'


interface CarouselGalleryProps {
  images: { url: string }[];
}

const CarouselGallery: React.FC<CarouselGalleryProps> = ({ images }) => {
  const bearSlideItemData: TBearSlideItemDataList = images.map((image) => {
    return {
      key: image.url,
      children: (
        <BearSlideImage
          imageUrl={`${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE}/${image.url}`}
          className="m-auto"
        />
      ),
    };
  });

  return (
      <GalleryStyles>
        <BearCarousel
          data={bearSlideItemData}
          height="auto"
        
          isEnablePagination
        />
      </GalleryStyles>
  );
};

const GalleryStyles = styled.div`
--primary-color: var(--foreground);

`;

export default CarouselGallery;
