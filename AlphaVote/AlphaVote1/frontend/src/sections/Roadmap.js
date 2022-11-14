import "../styles/roadmap.css";
import loadable from "@loadable/component";
import { useWindowSize } from "@react-hook/window-size";
const ArrowDown = loadable(() => import("../components/ArrowDown"));
const ScrollText = loadable(() => import("../components/ScrollText"));

const Roadmap = () => {
  const br_point = 800;
  const [width] = useWindowSize();

  return (
    <div className="roadmap">
      <div className="roadmap_inn">
        <ScrollText word={"Roadmap"} />

        <div className="rm1">
          <div className="rotating_txt_cont">
            <button className="rotating_txt button--surtur">
              <ArrowDown opacity={0.2} />
              <svg className="textcircle" viewBox="0 0 500 500">
                <defs>
                  <path
                    id="textcircle"
                    d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
                  />
                </defs>
                <text>
                  <textPath
                    xlinkHref="#textcircle"
                    aria-label="Updated Roadmap"
                    textLength="900"
                  >
                    Choice Roadmap - Choice Roadmap -
                  </textPath>
                </text>
              </svg>
            </button>
          </div>
        </div>

        <div className="rm2">
          <div className="rm_sec">
            <div className="rm_date">
              {width > br_point ? (
                <>
                  <span>
                    <i className="uil uil-asterisk"></i>
                  </span>
                  Q2 2022 -&nbsp;
                </>
              ) : (
                <>
                  <span>
                    <i className="uil uil-asterisk"></i>
                  </span>
                  Q2 2022 -&nbsp;Choice Charities
                </>
              )}
            </div>
            <div className="rm_desc">
              {width > br_point && (
                <p className="rm_desc_hd">Choice Charities</p>
              )}
              <p className="rm_desc_txt">
                The Choice Coin Network plans to launch Choice Charities, a
                charity hosted by Fortior Blockchain, for its native token. The
                goal of Choice Charities will be to identify charities and
                non-profit organizations that engage in democratic and equitable
                practices. Choice Coin holders will be able to use Choice to
                vote for Choice charitable contributions.
              </p>
            </div>
          </div>

          <div className="rm_sec">
            <div className="rm_date">
              {width > br_point ? (
                <>
                  <span>
                    <i className="uil uil-asterisk"></i>
                  </span>
                  Q2 2022 -&nbsp;
                </>
              ) : (
                <>
                  <span>
                    <i className="uil uil-asterisk"></i>
                  </span>
                  Q2 2022 -&nbsp;Voting Application
                </>
              )}
            </div>
            <div className="rm_desc">
              {width > br_point && (
                <p className="rm_desc_hd">Voting Application</p>
              )}
              <p className="rm_desc_txt">
                The Choice Coin Network plans to launch a full-stack voting
                application by the end of Q1 2022. This application will be an
                update over the current Fortior Voting Protocol developed by
                Fortior Blockchain, and will be live. It will allow any
                organization across the world to vote using Choice Coin and the
                Choice Coin Network. The launch of this interactive platform
                will enable Choice Coin to be used more widely for its use-case
                and spread decentralized voting as a legitimate form of
                governance.
              </p>
            </div>
          </div>

          <div className="rm_sec">
            <div className="rm_date">
              {width > br_point ? (
                <>
                  <span>
                    <i className="uil uil-asterisk"></i>
                  </span>
                  Presently -&nbsp;
                </>
              ) : (
                <>
                  <span>
                    <i className="uil uil-asterisk"></i>
                  </span>
                  Presently Ongoing
                </>
              )}
            </div>
            <div className="rm_desc">
              {width > br_point && <p className="rm_desc_hd">Ongoing</p>}
              <p className="rm_desc_txt">
                The Choice Coin Network plans to continue allocating resources
                and assets to its rewards programs. These rewards programs have
                been extremely effective over the past two months, with the
                network growing at an exponential rate with regards to academic
                output, social media presence, and development. The Choice Coin
                Community remains keen on growing its membership in the months
                to come.
              </p>
            </div>
          </div>

          {/*=========================*/}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
