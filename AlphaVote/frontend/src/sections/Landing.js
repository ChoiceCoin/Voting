import "../styles/landing.css";
import loadable from "@loadable/component";
const ScrollTextLand = loadable(() => import("../components/ScrollTextLand"));

const Landing = () => {
  return (
    <div className="landing" id="landing">
      <ScrollTextLand
        word={"Join our discord channel and help grow our codebase"}
      />

      <div className="land_cov">
        <div className="land_item1">
          <p className="hdy">
            The Democratic <br /> Token Built Just For <br /> a New Age.
          </p>
          <p className="suby">
            Choice Coin is an Algorand Standard Asset that powers Decentralized
            Decisions, a voting and governance software built directly on the
            Algorand Blockchain.
            <br />
            <br />
            Decentralized Decisions enables organizations to make governance
            decisions in an open and decentralized manner.
          </p>
        </div>

        <div className="land_item2">
          <SvgBack />
        </div>

        <div className="land_item1">
          <p className="suby">
            For the Choice Coin DAO, Decentralized Decisions leverages
            Proof-of-Participation as a governance mechanism, allowing voters to
            have a larger say in direct proportion to their contribution to the
            network.
          </p>
        </div>

        <div className="land_butts">
          <a href="https://fortiorblockchain.com/" className="ld_butt">
            What's Fortior?
          </a>
          <a href="https://fortiorblockchain.com/" className="ld_butt">
            About Choice
          </a>
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
