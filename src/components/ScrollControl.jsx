import React, { useState, useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";

// This component allows setting of 'speed' by calculating
// and modifying the required speed duration to perform the
// scroll at the set speed
const ScrollAccelerator = ({ speed = 1000 }) => {
  const [scrollDuration, setScrollDuration] = useState(300);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newDuration = Math.max((scrollY / speed) * 1000, 100); // minimum 100ms
      setScrollDuration(newDuration);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <ScrollToTop
      smooth
      duration={scrollDuration}
    />
  );
};

export default ScrollAccelerator;
