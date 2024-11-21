import {useState, useEffect, useRef} from "react";
import {useState, useEffect, useRef} from "react";
import styled from "styled-components";

// Styled components for dropdown menu elements
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

// Styled component for dropdown content (with bounce animation)
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
  // Set state for dropdown menu status and define ref
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Toggle dropdown visibility
  const handleToggle = () => {
    setIsOpen((prevState) => !prevState)
  }

  // Handle mouse interactions over menu
  const handleMouseEnter = () => {
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  // Set language selection and close dropdown
  const handleLanguageSelect = (item) => {
    onItemSelect(item.label)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <DropdownContainer
      className="dropdown"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {/* Dropdown trigger button */}
      <DropdownButton onClick={handleToggle} aria-haspopup="true" aria-expanded={isOpen}>
        {selectedLanguage}
        {selectedLanguage}
        <i className={`fas fa-caret-down`} style={{marginLeft: "20px", fontSize: "0.8rem"}}></i>
      </DropdownButton>

      {/* Filtered dropdown menu items (exclude current language) */}
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
                  e.preventDefault()
                  handleLanguageSelect(item)
                }}>
                {item.label}
              </DropdownItem>
            ))}
      </DropdownContent>
    </DropdownContainer>
  )
};

export default DropdownMenu;
