import React from "react";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
} from "./FooterElements";
import { FaBars } from "react-icons/fa";

const Footer = ({ toggle }) => {
  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">BY Chukwuemeka Kingsley</NavLogo>
          <NavMenu>
            <NavItem>
              <NavLinks to="about">About</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="discover">Participation</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="services">Open source</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="signup">Community</NavLinks>
            </NavItem>
          </NavMenu>
          <NavBtn>
            <NavBtnLink to="/proposal">Get Updates</NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Footer;
