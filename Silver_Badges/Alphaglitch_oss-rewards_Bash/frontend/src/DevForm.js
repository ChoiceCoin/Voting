import $ from "jquery";
import "./devform.css";
import { NavbarForm } from "./Components";

const DevForm = () => {
  return (
    <>
      <NavbarForm />

      <form
        action="https://choice-rewards.herokuapp.com/devform"
        method="POST"
        className="devform_container"
      >
        <div className="form_name">
          <p>Full Name</p>
          <input
            type="text"
            placeholder="Input Full name"
            id="form_name"
            name="form_name"
          />
        </div>
        <div className="form_discord">
          <p>Discord Id</p>
          <input
            type="text"
            placeholder="Input discord username"
            id="form_discord"
            name="form_discord"
          />
        </div>
        <div className="form_github">
          <p>Github Url</p>
          <input
            type="text"
            placeholder="Link to github profile"
            id="form_github"
            name="form_github"
          />
        </div>
        <div className="form_twitter">
          <p>Twitter Handle</p>
          <input
            type="text"
            placeholder="Link to twitter profile"
            id="form_twitter"
            name="form_twitter"
          />
        </div>
        <div className="form_walllet">
          <p>Wallet Address</p>
          <input
            type="text"
            placeholder="Your wallet address"
            id="form_wallet_addr"
            name="form_wallet_addr"
          />
        </div>
        <div className="submit_form">
          <button className="submit_form_butt" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default DevForm;
