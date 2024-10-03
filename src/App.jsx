import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState, createContext} from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nopage from "./components/404error";
import Home from "./pages/Home";
import Rentals from "./pages/Rentals";
import Regions from "./pages/Regions";
import Contact from "./pages/Contact";
export const AppContext = createContext();

function App() {
  const [currentCity, setCurrentCity] = useState("Perth");

  return (
    <BrowserRouter>
      <Header />
      <main>
        <AppContext.Provider value={{ currentCity }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/regions" element={<Regions setCurrentCity={setCurrentCity} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Nopage />} />
          </Routes>
        </AppContext.Provider>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;