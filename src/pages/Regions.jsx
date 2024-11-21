import {useContext} from "react"
import useScrollPacer from "../hooks/useScrollPacer"
import {AppContext} from "../App"
import worldMapImage from "../images/worldMap.jpg"
import {cities} from "../data/cityData"
import styled from "styled-components"

// Styled components for page layout and element styling
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
`

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0;
`

const MapImage = styled.img`
  width: 100%;
  height: auto;
`

// Grid overlay for positioning city markers
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
`

// C.S.S creates clickable areas for each city with hover effects
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
`

const Regions = ({setCurrentCity, setIsRentalsAnimationApplied}) => {
  // Get current city from context and set timer for scrolling controller
  const {currentCity} = useContext(AppContext)
  const triggerScroll = useScrollPacer(1000)

  // Handle city selection and trigger animations
  const handleCityClick = (cityName) => {
    setCurrentCity(cityName)
    setIsRentalsAnimationApplied(true)
    triggerScroll()
  }

  return (
    <>
      <StyledTitleLine>
        Regions Page - Current City: <span>{currentCity}</span>
      </StyledTitleLine>
      <div style={{margin: "0 5%"}}>
        <MapContainer>
          <MapImage src={worldMapImage} alt="Map" />

          {/* Create grid overlay with city markers */}
          <Grid>
            {cities.length === 0 ? (
              <p style={{color: "#333333"}}>No cities loaded</p>
            ) : (
              cities.map((city, index) => (
                // Create clickable areas for each city
                <CityArea
                  key={index}
                  x={city.x}
                  y={city.y}
                  width={city.width}
                  height={city.height}
                  onClick={() => handleCityClick(city.name)}>
                  {city.name}
                </CityArea>
              ))
            )}
          </Grid>
        </MapContainer>
      </div>
    </>
  )
}

export default Regions
