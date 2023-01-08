import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Children } from "react";

const defaultSettings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  lazyLoad: "progressive",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

interface Props {
  children: React.ReactNode;
}

const MultiCarousel = ({ children }: Props) => {
  const slidesToShow = Math.min(Children.count(children), 4);
  const settings = { ...defaultSettings, slidesToShow };
  return (
    <Slider className="w-full" {...settings}>
      {children}
    </Slider>
  );
};

export default MultiCarousel;
