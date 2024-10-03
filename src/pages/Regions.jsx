import { useContext } from "react";
import { animateScroll as scroll } from 'react-scroll';
import { AppContext } from "../App";
import worldMapImage from "../images/worldMap.jpg";
import { cities } from "../data/cityData";
import styled from "styled-components";

const StyledTitleLine = styled.h2`
  background-color: #333333;
  color: #fefefe;
  display: inline-block;
  width: 100%;
  padding: 0.5rem 0;
  padding-left: 4rem;

  span {
    color: #ffff00;
  }
`;

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
`;

const MapImage = styled.img`
  width: 100%;
  height: auto;
`;

const Grid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(75, 1fr);
  grid-template-rows: repeat(60, 1fr);
  pointer-events: none;
`;

const CityArea = styled.div`
  grid-column: ${(props) => props.x} / span ${(props) => props.width};
  grid-row: ${(props) => props.y} / span ${2};
  background-color: rgba(255, 0, 0, 0.3);
  transition: background-color 0.3s;
  border: 2px solid red;
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: black;
  font-weight: bold;

  &:hover {
    background-color: rgba(255, 255, 0, 0.6);
    cursor: pointer;
  }
`;

const Regions = (props) => {
  const { currentCity } = useContext(AppContext);

  const handleCityClick = (cityName) => {
    props.setCurrentCity(cityName);
    scroll.scrollToTop({duration: 1000});
  };

  return (
    <>
      <StyledTitleLine>Regions Page - Current City: <span>{currentCity}</span></StyledTitleLine>
      <div style={{margin: "0 5%"}}>
        <MapContainer>
          <MapImage src={worldMapImage} alt="Map" />
          <Grid>
            {cities.map((city, index) => (
              <CityArea
                key={index}
                x={city.x}
                y={city.y}
                width={city.width}
                height={city.height}
                onClick={() => handleCityClick(city.name)}>
                {city.name}
              </CityArea>
            ))}
          </Grid>
        </MapContainer>
      </div>
    </>
  );
};

export default Regions;
