// src/components/TrackSessionDuration.js
import React, { useEffect } from "react";
import ReactGA from "react-ga";

const TrackSessionDuration: React.FC = () => {
  useEffect(() => {
    const startTime = Date.now();

    const handleUnload = () => {
      const endTime = Date.now();
      const duration = endTime - startTime;

      ReactGA.timing({
        category: "User Timing",
        variable: "Page Load Time",
        value: duration,
      });
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return null;
};

export default TrackSessionDuration;
