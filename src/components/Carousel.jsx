import {useState, useEffect, useCallback} from "react";
import image1 from "../images/city1.jpg";
import image2 from "../images/city2.jpg";
import image3 from "../images/city3.jpg";
import image4 from "../images/city4.jpg";
import image5 from "../images/city5.jpg";
import styled from "styled-components";

const StyledCarouselContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2% 0;
`;

const StyledCarousel = styled.div`
  position: relative;
  overflow: hidden;
`;

const StyledCarouselInner = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const StyledSlide = styled.div`
  flex: 0 0 100%;
`;

const StyledImg = styled.img`
  width: 100%;
  height: auto;
`;

const StyledControl = styled.button`
  background-color: #333333;
  color: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 65%;
  transform: translateY(-50%);
  border: none;
  font-size: 2.5rem;
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }

  &.left {
    left: 6%;
  }

  &.right {
    right: 6%;
  }
`;

const StyledMarkers = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 15px;
`;

const StyledMarker = styled.button`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "black" : "gray")};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const slides = [
  {img: image1, alt: "Image of Sydney"},
  {img: image2, alt: "Image of New York"},
  {img: image3, alt: "Image of Tokyo"},
  {img: image4, alt: "Image of Perth"},
  {img: image5, alt: "Image of Los Angeles"},
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isReversed, setIsReversed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const moveSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => {
      if (isReversed) {
        if (prevSlide > 0) return prevSlide - 1;
        else {
          setIsReversed(false);
          return 1;
        }
      } else {
        if (prevSlide < slides.length - 1) return prevSlide + 1;
        else {
          setIsReversed(true);
          return slides.length - 2;
        }
      }
    });
  }, [isReversed]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(moveSlide, 2500);
      return () => clearInterval(interval);
    }
  }, [isPaused, moveSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsReversed(false);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsReversed(true);
  };

  const jumpToSlide = (index) => {
    setCurrentSlide(index);
  };

  const ICONS = {
    LEFTCONTROL: "fa-solid fa-chevron-left",
    RIGHTCONTROL: "fa-solid fa-chevron-right",
  };

  const IconChar = ({icon}) => {
    return <i className={`${icon}`}></i>;
  };

  return (
    <div style={{backgroundColor: "#333333"}}>
      <StyledControl className="left" onClick={previousSlide}>
        <IconChar icon={ICONS.LEFTCONTROL} />
      </StyledControl>
      <StyledCarouselContainer>
        <StyledCarousel
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}>
          <StyledCarouselInner style={{transform: `translateX(-${currentSlide * 100}%)`}}>
            {slides.map((slide, index) => (
              <StyledSlide key={index}>
                <StyledImg src={slide.img} alt={slide.alt} />
              </StyledSlide>
            ))}
          </StyledCarouselInner>
        </StyledCarousel>
        <StyledMarkers>
          {slides.map((_, index) => (
            <StyledMarker
              key={index}
              $active={index === currentSlide}
              onClick={() => jumpToSlide(index)}
            />
          ))}
        </StyledMarkers>
      </StyledCarouselContainer>
      <StyledControl className="right" onClick={nextSlide}>
        <IconChar icon={ICONS.RIGHTCONTROL} />
      </StyledControl>
    </div>
  );
};

export default Carousel;
