import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledNavLink = styled(NavLink)<{ isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ isActive }) => css`
    font-size: ${isActive ? "14px" : "13px"};
    font-weight: ${isActive ? "600" : "300"};
    opacity: ${isActive ? 1 : 0.6};
  `}
`;

const MainNavLink = styled(NavLink)<{ isActive?: boolean; darkTheme: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background: var(--main-col);
  color: ${({ darkTheme }) => (darkTheme ? "" : "#fff")};
  ${({ isActive, darkTheme }) => css`
    width: 35px;
    height: 35px;
    font-size: ${isActive ? "14px" : "13px"};
    font-weight: ${isActive ? "600" : "300"};
    border: ${isActive
      ? darkTheme
        ? "1px solid var(--wht)"
        : "1px solid #666"
      : "none"};
  `};
`;
const MenuButton = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
`;

type BottomNavigationBarPropType = { darkTheme: boolean };

const BottomNavigationBar = ({ darkTheme }: BottomNavigationBarPropType) => {
  const dispatch = useDispatch();
  return (
    <footer className="ft_sm">
      <ul className="ft_sm_inn">
        <li className="ft_sm_li">
          <MenuButton
            onClick={() => {
              dispatch({ type: "modal_menu" });
            }}
          >
            <StyledNavLink to={"#"}>
              <i className="uil uil-bars" />
            </StyledNavLink>
          </MenuButton>
        </li>
        <li className="ft_sm_li">
          <StyledNavLink to={`/`} key={"home"}>
            <i className="uil uil-estate"></i>
          </StyledNavLink>
        </li>
        <li className="ft_sm_li">
          <MainNavLink
            to={`/participate`}
            key={"participate"}
            darkTheme={darkTheme}
          >
            <i className="uil uil-check-square"></i>
          </MainNavLink>
        </li>
        <li className="ft_sm_li">
          <StyledNavLink to={`/faq`} key={"faq"}>
            <i
              className="uil uil-shield-question"
              style={{ fontSize: "21px" }}
            ></i>
          </StyledNavLink>
        </li>
      </ul>
    </footer>
  );
};

export default BottomNavigationBar;
