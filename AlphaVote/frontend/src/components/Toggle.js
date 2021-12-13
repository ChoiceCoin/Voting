import styled, {css} from "styled-components";
import Switch from "react-switch";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const iconWrapperSharedStyles = css`
  display: flex;
  align-items: center;
  font-size: 16px;
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
    <>
      <label htmlFor="small-radius-switch">
        <p style={{ width: "0px", height: "0px", overflow: "hidden" }}>
          Toggle
        </p>
      </label>
      <Switch
        checked={checked}
        onChange={handleChange}
        handleDiameter={20}
        offColor="#222"
        onColor="#eee"
        offHandleColor="#eee"
        onHandleColor="#444"
        width={44}
        height={20}
        borderRadius={90}
        boxShadow="0px 1px 4px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 6px rgba(0, 0, 0, 0.2)"
        checkedIcon={<IconWrapperLeft><i className="fas fa-sun"></i></IconWrapperLeft>}
        uncheckedIcon={<IconWrapperRight><i class="far fa-moon"></i></IconWrapperRight>}
        className="react-switch"
        id="small-radius-switch"
      />
    </>
  );
};

export default Toggle;
