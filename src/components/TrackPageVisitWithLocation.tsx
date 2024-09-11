// src/components/TrackPageVisitWithDuration.tsx
import React, { useEffect } from "react";
import { logEvent } from "../utils/Analytics";
const TrackPageVisitWithDuration: React.FC = () => {
  useEffect(() => {
    const startTime = Date.now();

    const handleUnload = (): void => {
      const endTime = Date.now();
      const duration = endTime - startTime; // Duration in milliseconds

      logEvent("Page Timing", "Page Visit Duration", undefined, duration);
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return null;
};

export default TrackPageVisitWithDuration;
