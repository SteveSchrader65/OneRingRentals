import {useState, useEffect, useContext} from "react";
import {AppContext} from "../App";
import {cities} from "../data/cityData";
import {properties as propertyData} from "../data/propertyData";
import {useState, useEffect, useContext} from "react";
import {AppContext} from "../App";
import {cities} from "../data/cityData";
import {properties as propertyData} from "../data/propertyData";
import styled from "styled-components";

// Styled components for page layout and element styling
const StyledTitleLine = styled.h2`
  background-color: #333333;
  color: #fefefe;
  display: inline-block;
  width: 100%;
  padding: 0.5rem 0;
  padding-left: 4rem;
`;

const StyledIntro = styled.h3`
  color: #000000;
  font-weight: bold;
`;

const StyledCard = styled.div`
  width: 80%;
  border: 2px solid #000000;
  padding: 1%;
  display: flex;
  margin-bottom: 20px;
`;

const StyledImage = styled.img`
  width: 60%;
  height: auto;
  border: 1px solid red;
  margin-right: 20px;
`;

const StyledContent = styled.div`
  flex: 1;

  p:first-of-type {
    font-weight: bold;
    font-size: 1.4rem;
  }

  p:nth-of-type(4) {
    text-align: justify;
    text-justify: inter-word;
  }
`;

const Rentals = () => {
  // Get current city from context and initialize states
  const {currentCity} = useContext(AppContext)
  const [_, setCurrentCode] = useState("")
  const [properties, setProperties] = useState([])

  // Filter and format property data based on city prefix
  const loadProperties = (prefix) => {
    return new Promise((resolve) => {
      const filteredProperties = propertyData.filter((prop) => prop.img.startsWith(prefix))
      const loadedProperties = filteredProperties.map((prop) => ({
        src: `/src/images/${prop.img}.jpg`,
        alt: `${prop.locality} property`,
        alt: `${prop.locality} property`,
        price: `${prop.price}`,
        beds: `${prop.beds}`,
        baths: `${prop.baths}`,
        garages: `${prop.garages}`,
        sqm: `${prop.sqm}`,
        locality: `${prop.locality}`,
        locality: `${prop.locality}`,
        desc: `${prop.desc}`,
      }))
      resolve(loadedProperties)
    })
  }

  // Load properties when component mounts
  useEffect(() => {
    const city = cities.find((city) => city.name === currentCity)
    if (city) {
      setCurrentCode(city.prefix)
      loadProperties(city.prefix)
        .then((loadedProperties) => {
          setProperties(loadedProperties)
        })
        .catch((error) => {
          console.error("Error loading properties:", error)
        })
    }
  }, [])

  return (
    <>
      <StyledTitleLine>Rentals Page</StyledTitleLine>
      <div style={{margin: "0 5%"}}>
        <StyledIntro>
          One Ring Rentals currently have a number of property listings for {currentCity}:
        </StyledIntro>

        {/* Display property cards, or "No properties" message if none */}
        <div>
          {properties.length === 0 ? (
            <p style={{color: "#333333"}}>No properties loaded</p>
          ) : (

            // Map over properties array and create a card for each
            properties.map((property, index) => (
              <StyledCard key={index}>
                <StyledImage src={property.src} alt={property.alt} />
                <StyledContent>
                  <p>Price: {property.price}</p>
                  <p>
                    {property.beds}&ensp;Beds&emsp;-&emsp;{property.baths}&ensp;Baths&emsp;-&emsp;
                    {property.garages}&ensp;Garages
                  </p>
                  <p>
                    <strong>Locality:</strong>&ensp;{property.locality}&emsp;{property.sqm}
                  </p>
                  <p>
                    <strong>Description:</strong>&ensp;{property.desc}
                  </p>
                </StyledContent>
              </StyledCard>
            ))
          )}
        </div>
      </div>
    </>
  )
};

export default Rentals;

