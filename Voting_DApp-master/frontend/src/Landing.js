import "./styles/landing.css";
import ScrollTextLand from "./components/ScrollTextLand";

const Landing = () => {
  return (
    <div className="landing" id="landing">
      <ScrollTextLand
        word={"Join our Discord Server to learn more and participate in our Open Source Rewards Programs!"}
      />

      <div className="land_cov">
  <div className="land_item1">
    <p className="hdy">
      Choice Coin DAO: Bringing Decentralized Governance to the Algorand Blockchain
    </p>
    <p className="suby">
      Choice Coin is an Algorand Standard Asset (ASA) that powers the Choice Coin DAO, a Decentralized Autonomous Organization built on the Algorand Blockchain. The Choice Coin DAO aims to make decentralized voting a reality through allocations to open-source software development and community awareness.
      <br />
      <br />
      Decentralized Decisions allows users to vote on proposals within the Choice Coin DAO using their Choice tokens. The options with the most Choice allocated to it will be the ones that are implemented.
    </p>
  </div>
  <div className="land_item1">
  <b>  <h3>Rules</h3></b>
    <p className="suby">
<ul>
    <li>1. One Choice is equal to one vote.</li>
    <li>2. You can vote as many times as you desire.</li>
  <li>  3. There are no limits on how much Choice you can use to vote.</li>
    <li>4. Any Choice sent after the voting deadline, Wednesday December 29th at 5:00PM will not
        count, will not be rewarded, and will not be returned.</li>
  <li>  5. All votes are final.</li>
  </ul>
    </p>
  </div>
  <div className="land_item1">
  <h3>Rewards</h3>
    <p className="suby">
    All rewards will be distributed by Wednesday January 5th at 5:00PM EST. If up to 3,000,000.00
    Choice is committed to vote, then the reward pool will be 600,000.00 Choice. If up to
    6,000,000.00 Choice is committed to vote, then the reward pool will be 1,000,000.00 Choice. If
    over 6,000,000.00 Choice is committed to vote, then the reward pool will be 1,400,000.00
    Choice. The reward will be distributed proportionally, based on the amount committed, to all voters.
    </p>
  </div>

</div>
</div>
);
};

const SvgBack = () => {
return (
<div className="svg_back">
<svg
  viewBox="0 0 1920 2000"
  xmlns="http://www.w3.org/2000/svg"
  className="svg_back_svg"
>
  <g
    style={{
      // transform: "translate(-665px, -541px)",
      transform: "translate(-665px, -641px)",
    }}
  >
    <path
      id="path-1"
      d="M850,465.2306038553079C958.8144764947031,461.39226371873275,1021.4825449934733,574.690630100371,1097.602194324131,652.5438389976157C1192.8323916982479,749.9428222389499,1368.671034936332,828.728799358622,1334.2725557328813,960.5320506722703C1299.8481110256396,1092.434792948918,1107.555018272517,1074.29745287207,977.1577704117068,1114.0458310003419C884.7147604742252,1142.2247977698926,792.9447122651261,1191.0425020323207,704.2918459583884,1152.5660995224646C612.1944538591086,1112.5947316903269,551.2051870411254,1021.0010708275778,534.6264511362035,921.9819545234247C519.1154830331442,829.340249908849,570.0034794286372,746.5677468829045,623.3740579709078,669.2718420013925C684.1383971386729,581.2676511384526,743.1223621382509,469.0006236203441,850,465.2306038553079 "
      style={{
        // transform: "scale(1.3) translate(-256px, -132px)",
        transform: "scale(1.3) translate(-160px, -200px)",
      }}
    ></path>
    <path
      id="path-2"
      d="M850,465.2306038553079C958.8144764947031,461.39226371873275,1021.4825449934733,574.690630100371,1097.602194324131,652.5438389976157C1192.8323916982479,749.9428222389499,1368.671034936332,828.728799358622,1334.2725557328813,960.5320506722703C1299.8481110256396,1092.434792948918,1107.555018272517,1074.29745287207,977.1577704117068,1114.0458310003419C884.7147604742252,1142.2247977698926,792.9447122651261,1191.0425020323207,704.2918459583884,1152.5660995224646C612.1944538591086,1112.5947316903269,551.2051870411254,1021.0010708275778,534.6264511362035,921.9819545234247C519.1154830331442,829.340249908849,570.0034794286372,746.5677468829045,623.3740579709078,669.2718420013925C684.1383971386729,581.2676511384526,743.1223621382509,469.0006236203441,850,465.2306038553079 "
      style={{
        transform: "scale(1.15) translate(-90px, -120px)",
      }}
    ></path>
    <path
      id="path-3"
      d="M850,465.2306038553079C958.8144764947031,461.39226371873275,1021.4825449934733,574.690630100371,1097.602194324131,652.5438389976157C1192.8323916982479,749.9428222389499,1368.671034936332,828.728799358622,1334.2725557328813,960.5320506722703C1299.8481110256396,1092.434792948918,1107.555018272517,1074.29745287207,977.1577704117068,1114.0458310003419C884.7147604742252,1142.2247977698926,792.9447122651261,1191.0425020323207,704.2918459583884,1152.5660995224646C612.1944538591086,1112.5947316903269,551.2051870411254,1021.0010708275778,534.6264511362035,921.9819545234247C519.1154830331442,829.340249908849,570.0034794286372,746.5677468829045,623.3740579709078,669.2718420013925C684.1383971386729,581.2676511384526,743.1223621382509,469.0006236203441,850,465.2306038553079 "
      style={{
        transform: "scale(1) translate(-0px, -0px)",
      }}
    ></path>
  </g>
</svg>
</div>
);
};


export default Landing;
