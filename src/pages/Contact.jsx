import {useState, useContext} from "react"
import {AppContext} from "../App"
import styled from "styled-components"

// Styled components for form layout and styling
const StyledTitleLine = styled.h2`
  background-color: #333333;
  color: #fefefe;
  padding: 0.5rem 4rem;
`

const StyledFormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: 0 auto;
  gap: 1rem;
`

const StyledFormWrapper = styled.div`
  flex: 1 1 100%;

  @media (min-width: 768px) {
    &:nth-child(1),
    &:nth-child(2) {
      flex: 0 0 calc(50% - 0.5rem);
    }
  }
`

// Styled components for form elements
const StyledFormGroup = styled.div`
  margin-bottom: 1rem;
`

const StyledHeading = styled.h3`
  font-size: 1.3rem;
  color: blue;
  margin-bottom: 1rem;
`

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`

const StyledInput = styled.input`
  width: 70%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const StyledSelect = styled.select`
  width: 75%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const StyledRadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

const StyledRadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`

const StyledSubmit = styled.button`
  background-color: #3300ff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  width: 30%;

  &:hover {
    background-color: #9980ff;
  }
`

const Contact = ({selectedLanguage}) => {
  // Get current city from context and initialize form state
  const {currentCity} = useContext(AppContext)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    country: "",
    email: "",
    phone: "",
    enquiryType: "",
    comment: "",
  })

  // Handle form field changes
  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  // Display form data as alert on submit
  const handleSubmit = (e) => {
    e.preventDefault()
    alert(
      `Current City: ${currentCity}\n
      Language: ${selectedLanguage}\n
      Name: ${formData.name}\n
      Role: ${formData.role}\n
      Country: ${formData.country}\n
      E-mail: ${formData.email}\n
      Phone: ${formData.phone}\n
      Enquiry: ${formData.enquiryType}\n
      Comment: ${formData.comment}`
    )
  }

  // Icon definitions
  const ICONS = {
    USER: "user-tie",
    CLIPBOARD: "clipboard-question",
  }

  // Custom icon component to display passed icon
  const IconChar = ({icon, style}) => {
    return <i className={`fas fa-${icon}`} style={style}></i>
  }

  return (
    <>
      <StyledTitleLine>Contact Page</StyledTitleLine>
      <div style={{margin: "0 5%"}}>
        <StyledFormContainer onSubmit={handleSubmit}>
          {/* Personal information section */}
          <StyledFormWrapper>
            <StyledHeading>
              <IconChar icon={ICONS.USER} style={{fontSize: "3rem", marginRight: "5%"}} />
              About you
            </StyledHeading>
            <StyledFormGroup>
              <StyledLabel htmlFor="name">Please, introduce yourself ...</StyledLabel>
              <StyledInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>You are a ...</StyledLabel>
              <StyledRadioGroup id="groupOne">
                {["tenant/potential tenant", "owner", "investor", "broker"].map((role) => (
                  <StyledRadioLabel key={role}>
                    <input
                      type="radio"
                      id={role}
                      name="role"
                      value={role}
                      checked={formData.role === role}
                      onChange={handleChange}
                    />
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </StyledRadioLabel>
                ))}
              </StyledRadioGroup>
            </StyledFormGroup>
          </StyledFormWrapper>
          {/* Contact information section */}
          <StyledFormWrapper>
            <StyledHeading style={{visibility: "hidden", height: "15%"}}></StyledHeading>
            <StyledFormGroup>
              <StyledLabel htmlFor="country">You live in ...</StyledLabel>
              <StyledSelect
                name="country"
                id="country"
                value={formData.country}
                onChange={handleChange}
                required>
                <option value="">Select Country</option>
                {[
                  "Australia",
                  "Brazil",
                  "Chile",
                  "Japan",
                  "Morocco",
                  "United Kingdom",
                  "United States",
                ].map((country) => (
                  <option key={country} value={country.toLowerCase()}>
                    {country}
                  </option>
                ))}
              </StyledSelect>
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel htmlFor="email">Your e-mail address is ...</StyledLabel>
              <StyledInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
                required
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel htmlFor="phone">Your telephone number is ...</StyledLabel>
              <StyledInput
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Telephone number"
                required
              />
            </StyledFormGroup>
          </StyledFormWrapper>
          {/* Query purpose section */}
          <StyledFormWrapper>
            <StyledHeading>
              <IconChar icon={ICONS.CLIPBOARD} style={{fontSize: "3rem", marginRight: "2%"}} />
              Your enquiry details
            </StyledHeading>
            <StyledFormGroup>
              <StyledLabel>What would you like to know about ??</StyledLabel>
              <StyledRadioGroup id="groupTwo">
                {["property", "advert", "general", "report"].map((type) => (
                  <StyledRadioLabel key={type}>
                    <input
                      type="radio"
                      id={type}
                      name="enquiryType"
                      value={type}
                      checked={formData.enquiryType === type}
                      onChange={handleChange}
                    />
                    {type === "property"
                      ? "Property listing"
                      : type === "advert"
                      ? "Advertising"
                      : type === "general"
                      ? "General enquiry"
                      : "Report problem"}
                  </StyledRadioLabel>
                ))}
              </StyledRadioGroup>
            </StyledFormGroup>
          </StyledFormWrapper>
          <StyledFormWrapper>
            <StyledFormGroup>
              <StyledLabel htmlFor="comment">Comments:</StyledLabel>
              <StyledTextArea
                id="comment"
                name="comment"
                rows="4"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Any comments?"
              />
            </StyledFormGroup>
            <StyledSubmit type="submit">Submit</StyledSubmit>
          </StyledFormWrapper>
        </StyledFormContainer>
      </div>
    </>
  )
}

export default Contact
