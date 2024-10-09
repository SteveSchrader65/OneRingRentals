import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState, createContext} from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Rentals from "./pages/Rentals";
import Regions from "./pages/Regions";
import Contact from "./pages/Contact";
import Nopage from "./pages/404error";
export const AppContext = createContext();

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [currentCity, setCurrentCity] = useState("Perth");
  const [isHomeAnimationApplied, setIsHomeAnimationApplied] = useState(false);
  const [isRentalsAnimationApplied, setIsRentalsAnimationApplied] = useState(false);

  const stopAnimation = () => {
    setIsHomeAnimationApplied(false);
    setIsRentalsAnimationApplied(false);
  };

  return (
    <BrowserRouter>
      <AppContext.Provider value={{currentCity, stopAnimation}}>
        <Header
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          isHomeAnimationApplied={isHomeAnimationApplied}
          isRentalsAnimationApplied={isRentalsAnimationApplied}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route
              path="/regions"
              element={
                <Regions
                  setCurrentCity={setCurrentCity}
                  setIsRentalsAnimationApplied={setIsRentalsAnimationApplied}
                />
              }
            />
            <Route path="/contact" element={<Contact selectedLanguage={selectedLanguage} />} />
            <Route
              path="*"
              element={<Nopage setIsHomeAnimationApplied={setIsHomeAnimationApplied} />}
            />
          </Routes>
        </main>
        <Footer />
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
