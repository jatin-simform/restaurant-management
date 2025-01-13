import { useEffect, useState } from "react";

const useScreenRatio = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768); // Mobile if width <= 768px

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Update on resize
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  return isMobileView;
};

export default useScreenRatio;
