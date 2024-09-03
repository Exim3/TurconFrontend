// src/components/Animation.tsx

import React from "react";
import Lottie from "lottie-react";
import animationData from "../../../public/animations/handshake.json"; // Adjust the path as needed

const handshakeAnimation: React.FC = () => {
  return (
    <div>
      <Lottie animationData={animationData} loop={true} autoplay={true} />
    </div>
  );
};

export default handshakeAnimation;
