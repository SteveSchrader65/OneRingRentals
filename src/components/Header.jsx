import {useContext} from "react"
import {Link} from "react-router-dom"
import {AppContext} from "../App"
import DropdownMenu from "./Dropdown"
import SearchFeature from "./SearchFeature"
import styled from "styled-components"

// Styled components for header layout
const StyledHeader = styled.header`
  font-family: Arial, sans-serif;
  font-size: 0.95rem;
  width: 100%;
`

const StyledTopbar = styled.div`
  position: relative;
  font-size: 0.8rem;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin: 0.25rem 0 0 0;
`

const StyledLink = styled.a`
  color: #888888;
  text-decoration: none;
  margin-right: 0.75rem;

  &:hover {
    color: #000000;
  }
`

const StyledDivider = styled.div`
  border-left: 1px solid #434343;
  height: 1.5rem;
  margin: 0 0.75rem;
`

const StyledDropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 8rem;
`

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledNavLink = styled(Link)`
  color: #888888;
  text-decoration: none;
  margin: 1% 0 0 9%;

  &:hover {
    color: #333333;
    font-weight: bold;
  }
`

const StyledLogo = styled.img`
  height: 5.5rem;
`

const StyledSearchFeature = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 5%;
`
// Header component with props and function to stop animation
// passed via context provider
const Header = ({
  selectedLanguage,
  setSelectedLanguage,
  isHomeAnimationApplied,
  isRentalsAnimationApplied,
}) => {
  const {stopAnimation} = useContext(AppContext)

  // Define language options for dropdown menu
  const dropdownItems = [
    {label: "English", href: "#"},
    {label: "Deutsch", href: "#"},
    {label: "Espanol", href: "#"},
    {label: "Francais", href: "#"},
    {label: "Portugues", href: "#"},
  ]

  // Update selected language and display in console message
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language)
    console.log("Selected language:", language)
  }

  // Icon definitions
  const ICONS = {
    LOGIN: "arrow-right-to-bracket",
    REGISTER: "pencil-square",
    GLOBE: "earth-asia",
  }

  // Custom icon component to display passed icon
  const IconChar = ({icon, style}) => {
    return <i className={`fas fa-${icon}`} style={style}></i>
  }

  return (
    <StyledHeader>
      {/* Top bar with login/register links and language selector */}
      <StyledTopbar>
        <StyledLink href="#">
          <IconChar icon={ICONS.LOGIN} style={{marginRight: "5px"}} />
          Login
        </StyledLink>
        <StyledLink href="#">
          <IconChar icon={ICONS.REGISTER} style={{marginLeft: "20px", marginRight: "5px"}} />
          Register
        </StyledLink>
        <StyledDivider />
        <IconChar icon={ICONS.GLOBE} style={{marginLeft: "25px", marginRight: "5px"}} />
        <StyledDropdown>
          <DropdownMenu
            items={dropdownItems}
            selectedLanguage={selectedLanguage}
            onItemSelect={handleLanguageChange}
          />
        </StyledDropdown>
      </StyledTopbar>

      {/* Navigation bar with logo, page links and search feature */}
      <StyledNav>
        <StyledNavLink to="/" onClick={stopAnimation}>
          <StyledLogo
            src="./src/images/logo.png"
            alt="One Ring logo"
            className={isHomeAnimationApplied ? "flashLink" : ""}
          />
        </StyledNavLink>

        {/* Navigation links */}
        <StyledNavLink
          to="/rentals"
          className={isRentalsAnimationApplied ? "flashLink" : ""}
          onClick={stopAnimation}>
          FIND A RENTAL
        </StyledNavLink>
        <StyledNavLink to="/regions" onClick={stopAnimation}>
          REGIONS
        </StyledNavLink>
        <StyledNavLink to="/contact" onClick={stopAnimation}>
          CONTACT
        </StyledNavLink>
        <StyledNavLink to="*" onClick={stopAnimation}></StyledNavLink>

        {/* Search component */}
        <StyledSearchFeature>
          <SearchFeature />
        </StyledSearchFeature>
      </StyledNav>
    </StyledHeader>
  )
}

export default Header
