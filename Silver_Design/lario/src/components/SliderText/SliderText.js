import React from "react";
import TextTransition, { presets } from "react-text-transition";
 
// const TEXTS = [
//   "Forest",
//   "Building",
//   "Tree",
//   "Color"
// ];
 
const SliderText = ({text}) => {
  const [index, setIndex] = React.useState(0);
  const TEXTS = text  

  React.useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      5000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
 
  return (
      <TextTransition
        text={ TEXTS[index % TEXTS.length] }
        springConfig={ presets.stiff }
      />
  );
};
export default SliderText
