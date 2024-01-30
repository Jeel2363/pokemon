import React from 'react';

const FallingLeaves = ({ numLeaves }) => {
  const generateRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const generateRandomLeaves = () => {
    const leaves = [];
    for (let i = 0; i < numLeaves; i++) {
      const style = {
        left: `${generateRandomNumber(0, 100)}vw`,
        animationDuration: `${generateRandomNumber(3, 8)}s`,
        animationDelay: `${generateRandomNumber(0, 3)}s`,
        transform: `rotate(${generateRandomNumber(0, 360)}deg)`,
        opacity: generateRandomNumber(0.5, 1),
      };
      leaves.push(<i key={i} className="leaf" style={style}></i>);
    }
    return leaves;
  };

  return (
    <div className="falling-leaves">
      {generateRandomLeaves()}
    </div>
  );
};

export default FallingLeaves;
