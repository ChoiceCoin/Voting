import "./styles/landing.css";
import ScrollTextLand from "./components/ScrollTextLand";

const Landing = () => {
  return (
    <div className="landing" id="landing">
      <ScrollTextLand
        word={
          "Join our Discord Server to learn more and participate in our Open Source Rewards Programs!"
        }
      />

      <div className="land_cov">
        <div className="land_item1">
          <p className="hdy">
            Choice Coin DAO: Bringing Decentralized Governance to the Algorand
            Blockchain
          </p>
          <p className="suby">
            Choice Coin is an Algorand Standard Asset (ASA) that powers the
            Choice Coin DAO, a Decentralized Autonomous Organization built on
            the Algorand Blockchain. The Choice Coin DAO aims to make
            decentralized voting a reality through allocations to open-source
            software development and community awareness.
            <br />
            <br />
            Decentralized Decisions allows users to vote on proposals within the
            Choice Coin DAO using their Choice tokens. The options with the most
            Choice allocated to it will be the ones that are implemented.
          </p>
        </div>
        <div className="land_item1">
          <b>
            {" "}
            <h3>Rules</h3>
          </b>

          <ul
            className="suby"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <li>1. One Choice is equal to one vote.</li>
            <li>2. You can vote as many times as you desire.</li>
            <li>
              {" "}
              3. There are no limits on how much Choice you can use to vote.
            </li>
            <li>
              4. Any Choice sent after the voting deadline, Wednesday December
              29th at 5:00PM will not count, will not be rewarded, and will not
              be returned.
            </li>
            <li> 5. All votes are final.</li>
          </ul>
        </div>
        <div className="land_item1">
          <h3>Rewards</h3>
          <p className="suby">
            All rewards will be distributed by Wednesday January 5th at 5:00PM
            EST. If up to 3,000,000.00 Choice is committed to vote, then the
            reward pool will be 600,000.00 Choice. If up to 6,000,000.00 Choice
            is committed to vote, then the reward pool will be 1,000,000.00
            Choice. If over 6,000,000.00 Choice is committed to vote, then the
            reward pool will be 1,400,000.00 Choice. The reward will be
            distributed proportionally, based on the amount committed, to all
            voters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
