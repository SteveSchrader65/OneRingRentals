import {useState, useEffect, useRef} from "react"
import styled from "styled-components"

// Styled components to style and control search UI elements
const SearchContainer = styled.div`
  position: relative;
  width: ${({$expanded}) => ($expanded ? "200px" : "40px")};
  height: 40px;
  transition: width 0.5s ease-in-out;
`

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
`

const StyledSearchInput = styled.input`
  width: calc(100% - 30px);
  height: 80%;
  background: transparent;
  border: none;
  outline: none;
  margin-left: 10px;
  opacity: ${({$expanded}) => ($expanded ? "1" : "0")};
  transition: opacity 0.5s ease-in-out;
`

const SearchFeature = () => {
  // Set states for search term and search bar open/close status
  const [searchTerm, setSearchTerm] = useState("")
  const [expanded, setExpanded] = useState(false)

  // Define refs for handling click outside and focus events
  const searchRef = useRef(null)
  const toggleRef = useRef(null)

  // Toggle search bar expansion and handle focus
  const toggleExpand = () => {
    setExpanded((prev) => !prev)
    if (!expanded) {
      setSearchTerm("")
      setTimeout(() => {
        toggleRef.current?.focus()
      }, 500)
    }
  }

  // Collapse search bar on click events outside search area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Update search term on each key press
  const handleInput = (e) => {
    const value = e.target.value

    setSearchTerm(value)
  }

  // Log search term changes
  useEffect(() => {
    console.log("Search Term:", searchTerm)
  }, [searchTerm])

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
  )
}

export default SearchFeature
