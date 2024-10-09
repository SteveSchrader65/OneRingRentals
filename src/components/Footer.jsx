import styled from "styled-components";

const StyledFooter = styled.footer`
  font-family: Arial, sans-serif;
  width: 100%;
  margin-top: 20vh;
`;

const StyledContentArea = styled.div`
  position: relative;
  font-size: 0.9rem;
  background-color: #bec3c7;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 2%;
`;

const StyledSocialLink = styled.a`
  color: #888888;
  text-decoration: none;
  margin-right: 0.75rem;
  cursor: pointer;
  border: 1px solid #888888;
  border-radius: 3px;
  height: 2rem;
  width: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #000000;
  }
`;

const Footer = () => {
  const ICONS = {
    FACEBOOK: "fab fa-facebook-f",
    TWITTER: "fab fa-twitter",
    GOOGLE: "fab fa-google",
    PINTEREST: "fab fa-pinterest",
    YOUTUBE: "fab fa-youtube",
    RSS: "fas fa-rss",
  };

  const IconChar = ({ icon }) => {
    return <i className={`${icon}`}></i>;
  };

  return (
    <StyledFooter>
      <StyledContentArea>
        <p style={{paddingLeft: "5%"}}>&copy;{new Date().getFullYear()} Steve Schrader</p>
        <div style={{paddingRight: "5%"}}>
          {Object.keys(ICONS).map((icon) => (
            <StyledSocialLink key={icon}>
              <IconChar icon={ICONS[icon]} aria-hidden="true" />
            </StyledSocialLink>
          ))}
        </div>
      </StyledContentArea>
    </StyledFooter>
  );
};

export default Footer;
