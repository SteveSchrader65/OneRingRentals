import {useEffect} from "react"
import styled from "styled-components"
import Image from "../images/404house.jpg"

// Styled components for page layout
const StyledTitleLine = styled.h2`
  background-color: #333333;
  color: #fefefe;
  display: inline-block;
  width: 100%;
  padding: 0.5rem 0;
  padding-left: 4rem;
`

const StyledContainer = styled.div`
  text-align: center;
`

const StyledImage = styled.img`
  width: 70%;
  border: 3px solid red;
`

const Nopage = ({setIsHomeAnimationApplied}) => {
  // Trigger animation when 404 page loads
  useEffect(() => {
    setIsHomeAnimationApplied(true)
  }, [])

  return (
    <>
      {/* Display error message */}
      <StyledTitleLine>
        <span style={{color: "#ff0000"}}>404: </span>
        <span>Uh-oh !! This appears to be a property managed by one of our competitors</span>
      </StyledTitleLine>

      {/* Display 404 image */}
      <StyledContainer>
        <StyledImage src={Image} alt="Page Not Found" />
      </StyledContainer>
    </>
  )
}

export default Nopage
