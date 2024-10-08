import {useState, useEffect, useRef} from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  position: relative;
  width: ${({$expanded}) => ($expanded ? "200px" : "40px")};
  height: 40px;
  transition: width 0.5s ease-in-out;
`;

const StyledSearchButton = styled.button`
  background-color: #fafafa;
  color: #444444;
  border: 1px solid #888888;
  border-radius: 2px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  padding: ${({$expanded}) => ($expanded ? "0 20px 0 5px" : "0")};
  padding-right: 11px;
  transition: all 0.25s ease-in-out;
  overflow: hidden;
`;

const StyledSearchInput = styled.input`
  width: calc(100% - 30px);
  height: 80%;
  background: transparent;
  border: none;
  outline: none;
  margin-left: 10px;
  opacity: ${({$expanded}) => ($expanded ? "1" : "0")};
  transition: opacity 0.5s ease-in-out;
`;

const SearchFeature = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState(false);
  const searchRef = useRef(null);
  const toggleRef = useRef(null);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
    if (!expanded) {
      setSearchTerm("");
      setTimeout(() => {
        toggleRef.current?.focus();
      }, 500);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInput = (e) => {
    const value = e.target.value;

    setSearchTerm(value);
  };

  useEffect(() => {
    console.log("Search Term:", searchTerm);
  }, [searchTerm]);

  return (
    <SearchContainer ref={searchRef} $expanded={expanded}>
      <StyledSearchButton onClick={toggleExpand} $expanded={expanded}>
        <StyledSearchInput
          ref={toggleRef}
          $expanded={expanded}
          type="text"
          name="search"
          value={searchTerm}
          placeholder="Search ..."
          onChange={handleInput}
        />
        <i className="fas fa-search" style={{flexShrink: 0}} />
      </StyledSearchButton>
    </SearchContainer>
  );
};

export default SearchFeature;
