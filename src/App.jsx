import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {useState, createContext} from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Rentals from "./pages/Rentals"
import Regions from "./pages/Regions"
import Contact from "./pages/Contact"
import Nopage from "./pages/404error"
export const AppContext = createContext()

function App() {
  // Application states for language, selected city and animation controls
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [currentCity, setCurrentCity] = useState("Perth")
  const [isHomeAnimationApplied, setIsHomeAnimationApplied] = useState(false)
  const [isRentalsAnimationApplied, setIsRentalsAnimationApplied] = useState(false)

  // Function to stop any running animations by setting the controlling vaiables
  // to FALSE
  const stopAnimation = () => {
    setIsHomeAnimationApplied(false)
    setIsRentalsAnimationApplied(false)
  }

  return (
    // The Router component manages navigation between pages
    <Router>
      {/* Context Provider passes the current city value and animation control function to all child components */}
      <AppContext.Provider value={{currentCity, stopAnimation}}>
        {/* Pass props to Header component */}
        <Header
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          isHomeAnimationApplied={isHomeAnimationApplied}
          isRentalsAnimationApplied={isRentalsAnimationApplied}
        />
        <main>
          {/* Define routes (pages) */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rentals" element={<Rentals />} />

            {/* Pass props to Regions component */}
            <Route
              path="/regions"
              element={
                <Regions
                  setCurrentCity={setCurrentCity}
                  setIsRentalsAnimationApplied={setIsRentalsAnimationApplied}
                />
              }
            />

            {/* Pass props to Contact component */}
            <Route path="/contact" element={<Contact selectedLanguage={selectedLanguage} />} />

            {/* Pass animation control flag to 404 page component */}
            <Route
              path="*"
              element={<Nopage setIsHomeAnimationApplied={setIsHomeAnimationApplied} />}
            />
          </Routes>
        </main>
        <Footer />
      </AppContext.Provider>
    </Router>
  )
}

export default App
