import { useState } from "react";
import Switch from "react-switch";

const Toggle = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      handleDiameter={12}
      offColor="transparent"
      onColor="transparent"
      offHandleColor="#3a4be8"
      onHandleColor="#fff"
      height={16}
      width={48}
      borderRadius={50}
      activeBoxShadow="0px 0px 1px 2px transparent"
      uncheckedIcon={<></>}
      checkedIcon={<></>}
      uncheckedHandleIcon={<></>}
      checkedHandleIcon={<></>}
      className="react-switch"
      id="small-radius-switch"
    />
  );
};

export default Toggle;
