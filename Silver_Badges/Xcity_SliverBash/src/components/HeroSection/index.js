import React, { useState } from "react";
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "./HeroElements";
import Video from "../../videos/video.mp4";
import { Button } from "../Btns";

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };
  return (
    <HeroContainer>
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </HeroBg>
      <HeroContent>
        <HeroH1>A Democratic Token For A New Age</HeroH1>
        <HeroP>
          Choice Coin is an Algorand Standard Asset that powers Decentralized
          Decisions, a voting and governance software built directly on the
          Algorand Blockchain.
        </HeroP>
        <HeroBtnWrapper>
          <Button to="/proposal" onMouseEnter={onHover} onMouseLeave={onHover}>
            Create A Proposal{hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
