import { Link } from "react-router-dom";
import DropdownMenu from './Dropdown';
import SearchFeature from './SearchFeature';
import styled from "styled-components";

const StyledHeader = styled.header`
  font-family: Arial, sans-serif;
  font-size: 0.95rem;
  width: 100%;
`;

const StyledTopbar = styled.div`
  position: relative;
  font-size: 0.8rem;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin: 0.25rem 0 0 0;
`;

const StyledLink = styled.a`
  color: #888888;
  text-decoration: none;
  margin-right: 0.75rem;

  &:hover {
    color: #000000;
  }
`;

const StyledDivider = styled.div`
  border-left: 1px solid #434343;
  height: 1.5rem;
  margin: 0 0.75rem;
`;

const StyledDropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 8rem;
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledNavLink = styled(Link)`
  color: #888888;
  text-decoration: none;
  margin: 1% 0 0 9%;

  &:hover {
    color: #333333;
    font-weight: bold;
  }
`;

const StyledLogo = styled.img`
  height: 5.5rem;
  `;

const StyledSearchFeature = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 5%;
`;

const Header = () => {
  const dropdownItems = [
    { label: "Deutsch", href: "#" },
    { label: "Espanol", href: "#" },
    { label: "Francais", href: "#" },
    { label: "Portugues", href: "#" },
  ];

  const ICONS = {
    LOGIN: "arrow-right-to-bracket",
    REGISTER: "pencil-square",
    GLOBE: "earth-asia",
  };

  const IconChar = ({ icon, style }) => {
    return <i className={`fas fa-${icon}`} style={style}></i>;
  };

  return (
    <StyledHeader>
      <StyledTopbar>
        <StyledLink href="#">
          <IconChar icon={ICONS.LOGIN} style={{ marginRight: "5px" }} />
          Login
        </StyledLink>
        <StyledLink href="#">
          <IconChar icon={ICONS.REGISTER} style={{ marginLeft: "20px", marginRight: "5px" }} />
          Register
        </StyledLink>
        <StyledDivider />
        <IconChar icon={ICONS.GLOBE} style={{ marginLeft: "25px", marginRight: "5px" }} />
        <StyledDropdown>
          <DropdownMenu items={dropdownItems} />
        </StyledDropdown>
      </StyledTopbar>
      <StyledNav>
        <StyledNavLink to="/">
          <StyledLogo src="src/images/logo.png" alt="One Ring logo" />
        </StyledNavLink>
        <StyledNavLink to="/rentals">FIND A RENTAL</StyledNavLink>
        <StyledNavLink to="/regions">REGIONS</StyledNavLink>
        <StyledNavLink to="/contact">CONTACT</StyledNavLink>
        <StyledNavLink to="*"></StyledNavLink>
        <StyledSearchFeature>
          <SearchFeature />
        </StyledSearchFeature>
      </StyledNav>
    </StyledHeader>
  );
};

export default Header;
