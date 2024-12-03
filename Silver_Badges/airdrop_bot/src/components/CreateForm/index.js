import React, { useState } from "react";
import {
  ChoiceT,
  FormBack,
  H3,
  Input,
  MainForm,
  AnotherDiv,
  Button,
} from "./FormElements";

function CreateForm() {
  // const [form, setform] = useState({
  //   name: "",
  //   discord: "",
  //   github: "",
  //   twitter: "",
  //   walletAddress: "",
  // });
  const [name, setname] = useState("");
  const [discord, setdiscord] = useState("");
  const [github, setgithub] = useState("");
  const [twitter, settwitter] = useState("");
  const [walletAddress, setwalletAddress] = useState("");

  // const HandleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(...form);
  // };
  const submit = () => {
    document.getElementById("regs").innerHTML += "Successfully Registered";
  };
  return (
    <>
      <FormBack>
        <img
          src="https://gateway.pinata.cloud/ipfs/QmQjBWpP3XozmQqKRknc4dM4f4zDHs7gGBdVRRLK1ays86?preview=1"
          id="choice_icon"
        />
        <ChoiceT>
          <img
            src="https://gateway.pinata.cloud/ipfs/QmTHDy9RmrMSoNibX9EmBdnCKM2gKS3YXnpx29kzYhxtUM?preview=1"
            id="imgatge"
          />
        </ChoiceT>
        <MainForm>
          <H3>Register as Developer</H3>
          <AnotherDiv>
            <Input
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="First Name"
            ></Input>
            <Input
              value={discord}
              onChange={(e) => setdiscord(e.target.value)}
              placeholder="Last Name"
            ></Input>
            <Input
              value={github}
              onChange={(e) => setgithub(e.target.value)}
              placeholder="Discord Id"
            ></Input>
            <Input
              value={twitter}
              onChange={(e) => settwitter(e.target.value)}
              placeholder="Github URL"
            ></Input>
            <Input
              value={walletAddress}
              onChange={(e) => setwalletAddress(e.target.value)}
              placeholder="Wallet Address"
            ></Input>
          </AnotherDiv>
          <Button to="/reward" onClick={submit}>
            Submit
          </Button>
          <div id="regs"></div>
        </MainForm>
      </FormBack>
    </>
  );
}

export default CreateForm;
