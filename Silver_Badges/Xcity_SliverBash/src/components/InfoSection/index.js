import React from "react";
import {
  Column2,
  Img,
  ImgWrap,
  Column1,
  InfoRow,
  InfoWrapper,
  InfoContainer,
  TextWrapper,
  Topline,
  Heading,
  BtnWrap,
  Subtitle,
} from "./infoElements";
import { Button } from "../ButtonElements";

const InfoSection = ({
  lightBg,
  lightText,
  id,
  topLine,
  darkText,
  headLine,
  description,
  buttonLabel,
  img,
  imgStart,
  alt,
  primary,
  dark,
  dark2,
}) => {
  return (
    <>
      <InfoContainer lightBg={lightBg} id={id}>
        <InfoWrapper>
          <InfoRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <Topline>{topLine}</Topline>
                <Heading lightText={lightText}>{headLine}</Heading>
                <Subtitle darkText={darkText}>{description}</Subtitle>
                <BtnWrap>
                  <Button
                    to="home"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                    primary={primary ? 1 : 0}
                    dark={dark ? 1 : 0}
                    dark2={dark2 ? 1 : 0}
                  >
                    {buttonLabel}
                  </Button>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={img} alt={alt} />
              </ImgWrap>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
