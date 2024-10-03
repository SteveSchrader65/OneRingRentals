import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  padding: 2%;
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

const DropdownMenu = ({ items }) => {
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
        English
        <i className={`fas fa-caret-down`} style={{marginLeft: "20px", fontSize: "0.8rem"}}></i>
      </DropdownButton>
      <DropdownContent $isOpen={isOpen} role="menu">
        {items &&
          items.map((item, index) => (
            <DropdownItem key={index} href={item.href} role="menuitem">
              {item.label}
            </DropdownItem>
          ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default DropdownMenu;
