import styled from "styled-components";
import "./electionlist.css";
import ElectionCard, { Election } from "./ElectionCard";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 2.5rem);
`;

const Details = styled.div`
  margin-bottom: 48px;
  line-height: 1.3;
`;

const IssueContent = styled.div`
  margin-bottom: 24px;
`;

const OptionTitle = styled.h4`
  display: inline-flex;
  padding-bottom: 2px;
  border-bottom: 1px solid var(--border-default);
  margin-top: 8px;
  margin-bottom: 4px;
`;

const vote0ElectionDetails: Election = {
  candidates: [
    {
      name: "Option 0",
      image: "", // url
      address: "ENTER AN ADDRESS HERE", // wallet address for option 1
      votes: 0,
    },
    {
      name: "Option 1",
      image: "", // url
      address: "ENTER AN ADDRESS HERE", // wallet address for option 1
      votes: 0,
    },
  ],
  wallet: {
    address: "", // Election creator address
  },
  title: "Choice Coin Governance: Vote 0",
  card_desc: "",
  slug: "vote0",
};

const Participate = () => {
  return (
    <div className="ptt_elt">
      <div className="ptt_elt_inn">
        <div className="ptt_hd">
          <p>Choice Coin Governance - Vote 0</p>
          {/* <p>Participate in Ongoing Elections</p> */}
        </div>
        <Details>
          <IssueContent>
            This Issue addresses Choice tokenomics. The reserve address for
            Choice Coin is currently 750 million Choice. Vote 0 will determine
            the release distribution for the reserve address. Choice will be
            released from the reserve address on the first day of each year
            according to the vote result.
          </IssueContent>
          <OptionTitle>Option 0</OptionTitle>
          <p>
            The reserve address will dispense 75 million Choice each year for
            the next 10 years.
          </p>
          <br />
          <OptionTitle>Option 1</OptionTitle>
          <p>
            The reserve address will dispense 150 million Choice each year for
            the next 5 years.
          </p>
        </Details>
        <ul className="card_list">
          {/* Hard code to show one Election only */}
          <ElectionCard
            scores={[0]}
            options={[]}
            election={vote0ElectionDetails}
          />
        </ul>
      </div>
    </div>
  );
};

export default Participate;
