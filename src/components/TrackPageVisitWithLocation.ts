// src/components/TrackPageVisitWithLocation.tsx
import React, { useEffect } from "react";
import { logEvent } from "../utils/Analytics";

const TrackPageVisitWithLocation: React.FC = () => {
  useEffect(() => {
    const startTime = Date.now();

    const handleUnload = (): void => {
      const endTime = Date.now();
      const duration = endTime - startTime;

      const handleLocationSuccess = (position: GeolocationPosition): void => {
        logEvent(
          "Page Visit",
          "User Location",
          `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`,
          duration
        );
      };

      const handleLocationError = (error: GeolocationPositionError): void => {
        console.error("Error getting location:", error);
        logEvent(
          "Page Visit",
          "User Location",
          `Location error - Code: ${error.code}`,
          duration
        );
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          handleLocationSuccess,
          handleLocationError
        );
      } else {
        // Geolocation is not supported
        console.warn("Geolocation is not supported by this browser.");
        logEvent(
          "Page Visit",
          "User Location",
          "Geolocation not supported",
          duration
        );
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return null;
};

export default TrackPageVisitWithLocation;
