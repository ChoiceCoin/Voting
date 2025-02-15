import "./Landing.css";
import { A11yUserPreferences } from "@react-three/a11y";
import Model from "./Model";

const Landing = () => {
  return (
    <div className="landing">
      <div className="land_inn">
        <div className="land_item land_item1">
          <p className="hdy">
            {/* Choice coin <br /> */}
            Governance <br /> token for a new age.
          </p>
          <p className="suby">
            Choice Coin is a governance token that powers the Fortior Voting
            Protocol, which leverages Artificial Intelligence and Quantum
            Computing.
          </p>
        </div>

        <div className="land_butt">
          <button>About Fortior</button>
          <button>About Choice Coin </button>
        </div>
      </div>

      <A11yUserPreferences>
        <Model />
      </A11yUserPreferences>
    </div>
  );
};

export default Landing;
