// src/components/Animation.tsx

import React from "react";
import Lottie from "lottie-react";
import animationData from "../../../public/animations/loading.json"; // Adjust the path as needed

const LoadingAnimation: React.FC = () => {
  return (
    <div>
      <Lottie animationData={animationData} loop={true} autoplay={true} />
    </div>
  );
};

export default LoadingAnimation;
