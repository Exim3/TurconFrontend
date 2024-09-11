// src/components/TrackButtonClick.tsx
import React from "react";
import { logEvent } from "../utils/Analytics";

const TrackButtonClick: React.FC = () => {
  const handleClick = (): void => {
    logEvent("User Interaction", "Clicked Track Button");
  };

  return <button onClick={handleClick}>Track Button</button>;
};

export default TrackButtonClick;
