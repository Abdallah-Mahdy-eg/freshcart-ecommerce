import { Carousel } from "@material-tailwind/react";
import iamgeOne from "../../images/slider-image-1.jpeg";
import iamgeTwo from "../../images/slider-image-2.jpeg";
import iamgeThree from "../../images/slider-image-3.jpeg";
import iamgeFour from "../../images/slider-2.jpeg";

export function CarouselDefault() {
  return (
    <div className="h-80 w-full mb-8">
      <Carousel
        className="rounded-xl h-full"
        autoplay={true}
        autoplayDelay={3000}
        loop={true}
        transition={{ duration: 0.5 }}
        
      >
        <img
          src={iamgeOne}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src={iamgeTwo}
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src={iamgeThree}
          alt="image 3"
          className="h-full w-full object-cover"
        />
        <img
          src={iamgeFour}
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
    </div>
  );
}
