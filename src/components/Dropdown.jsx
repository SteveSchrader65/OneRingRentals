import {useState, useEffect, useRef} from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 98%;
  right: 0;
  background-color: #f2f2f2;
  width: 125px;
  z-index: 100;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  animation: menuBounce 0.4s ease-in-out forwards;
  transform-origin: top center;

  @keyframes menuBounce {
    0% {
      transform: scaleY(0);
    }
    80% {
      transform: scaleY(1.2);
    }
    100% {
      transform: scaleY(1);
    }
  }
`;

const DropdownItem = styled.a`
  color: #888888;
  padding: 10px 40px;
  text-decoration: none;
  display: block;

  &:hover {
    color: #000000;
  }
`;

const DropdownMenu = ({items, selectedLanguage, onItemSelect}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleLanguageSelect = (item) => {
    onItemSelect(item.label);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer
      className="dropdown"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <DropdownButton onClick={handleToggle} aria-haspopup="true" aria-expanded={isOpen}>
        {selectedLanguage}
        <i className={`fas fa-caret-down`} style={{marginLeft: "20px", fontSize: "0.8rem"}}></i>
      </DropdownButton>
      <DropdownContent $isOpen={isOpen} role="menu">
        {items &&
          items
            .filter((item) => item.label !== selectedLanguage)
            .map((item, index) => (
              <DropdownItem
                key={index}
                href={item.href}
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  handleLanguageSelect(item);
                }}>
                {item.label}
              </DropdownItem>
            ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default DropdownMenu;
