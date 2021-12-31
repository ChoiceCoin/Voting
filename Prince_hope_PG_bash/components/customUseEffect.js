import { useEffect } from "react";

const useGlobalEffect =() =>{
    return useEffect(() => {
      let storage = window.localStorage.getItem("proposals");
      if (!storage) {
        localStorage.setItem("proposals", JSON.stringify(Obj));
        storage = localStorage.getItem("proposals");
      }
      setPropsObj(JSON.parse(storage));
    }, []);
}

const Obj = [
  {
    name: "prince",
    desc: "Welcome to the wild wild west",
  },
  {
    name: "prince",
    desc: "Welcome to the wild wild west",
  },
  {
    name: "prince",
    desc: "Welcome to the wild wild west",
  },
];
export default useGlobalEffect