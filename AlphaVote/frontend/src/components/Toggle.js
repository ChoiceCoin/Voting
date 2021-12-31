import styled, {css} from "styled-components";
import Switch from "react-switch";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const ToggleWrapper = styled.div`
  margin-right: 15px;
  @media (max-width: 768px) {
    margin-right: 0;
  }
`

const iconWrapperSharedStyles = css`
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 2px 4px;
`

const IconWrapperLeft = styled.div`
  ${iconWrapperSharedStyles}
  justify-content: flex-start;
`

const IconWrapperRight = styled.div`
  ${iconWrapperSharedStyles}
  justify-content: flex-end;
`

const Toggle = ({ darkTheme }) => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("mode") === "light") {
      setChecked(true);
    }
  }, []);

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);

    if (!darkTheme) {
      localStorage.setItem("mode", "dark");
      dispatch({ type: "dark_mode" });
    } else {
      localStorage.setItem("mode", "light");
      dispatch({ type: "light_mode" });
    }
  };

  return (
    <ToggleWrapper>
      <label htmlFor="small-radius-switch">
        <p style={{ width: "0px", height: "0px", overflow: "hidden" }}>
          Toggle
        </p>
      </label>
      <Switch
        checked={checked}
        onChange={handleChange}
        handleDiameter={18}
        offColor="#222"
        onColor="#eee"
        offHandleColor="#eee"
        onHandleColor="#444"
        width={42}
        height={18}
        borderRadius={90}
        boxShadow="0px 1px 4px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 6px rgba(0, 0, 0, 0.2)"
        checkedIcon={<IconWrapperLeft><i className="fas fa-sun"></i></IconWrapperLeft>}
        uncheckedIcon={<IconWrapperRight><i className="far fa-moon"></i></IconWrapperRight>}
        className="react-switch"
        id="small-radius-switch"
      />
    </ToggleWrapper>
  );
};

export default Toggle;
