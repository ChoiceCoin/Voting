import _ from "lodash";
import $ from "jquery";
import "../styles/electionlist.css";
import loadable from "@loadable/component";
import { useQuery } from "react-query";
import axios from "axios";
import { URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";

import BarLoader from "react-spinners/BarLoader";

const Chart = loadable(() => import("../components/Chart"));

const ElectionList = () => {
  const darkTheme = useSelector((state) => state.status.darkTheme);

  const dispatch = useDispatch();

  const { isLoading, error, data } = useQuery("elections", () =>
    axios.get(`${URL}/elections`).then((response) => response.data.data)
  );

  const placeVote = (address, amount, election) => {
    if (!address) {
      alert("Select an option to vote!!");
      return;
    }

    dispatch({
      type: "modal_connect_vote",
      voteData: { address, amount, election },
    });
  };

  if (isLoading) {
    return (
      <>
        <div className="ptt_elt">
          <div className="ptt_elt_inn">
            <div className="ptt_hd">
              <p>Participate in Ongoing Elections</p>
            </div>
            <div
              style={{
                width: "100%",
                minHeight: "200px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontWeight: "500",
                color: "var(--wht)",
                justifyContent: "center",
                textTransform: "uppercase",
              }}
            >
              <p style={{ opacity: 0.5, marginBottom: "30px" }}>
                Loading elections...
              </p>

              <BarLoader
                color={darkTheme ? "#eee" : "#555"}
                loading={true}
                size={10}
                speedMultiplier={0.5}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) return "An error has occurred: " + error.message;

  // console.log(data);

  return (
    <div className="ptt_elt">
      <div className="ptt_elt_inn">
        <div className="ptt_hd">
          <p>Participate in Ongoing Elections</p>
        </div>
        <ul className="card_list">
          {data?.map((slug, index) => {
            const scores = slug?.candidates.map((data) =>
              data?.votes ? data?.votes : 0
            );
            const options = slug?.candidates.map((data) => data?.name);

            const totalScore = _.sum(scores);
            return (
              <div className="card_cont" key={index}>
                <div className="card_r1">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div className="card_elt_img">
                      {slug.process_image ? (
                        <img src={slug.process_image} alt="" />
                      ) : (
                        <i
                          className="uil uil-asterisk"
                          style={{ paddingLeft: "2px", paddingBottom: "2px" }}
                        />
                      )}
                    </div>
                    <div className="card_elt_tit">{slug.title}</div>
                  </div>

                  {/* <div className="electionEndTime">Ends on:</div> */}
                </div>

                <div className="card_elt_desc">{slug?.card_desc}</div>

                <div className="card_cand">
                  <div className="card_cand_hd">
                    <p>Candidates</p>

                    <div className="amountToCommit">
                      <p>Amount to commit:</p>
                      <input
                        type="number"
                        min="1"
                        placeholder="1"
                        className="amtToCommitInp"
                      />
                    </div>
                  </div>

                  <ul className="card_cand_list">
                    {slug?.candidates?.map((item, index) => (
                      <li className="cand_item" key={index}>
                        <div className="cand_img_cont">
                          {!!item.image ? (
                            <img src={item.image} alt="" />
                          ) : (
                            <i className="uil uil-asterisk"></i>
                          )}
                        </div>
                        <p className="cand_det">{item.name}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="chart_collap">
                    <Chart scores={scores} options={options} />
                    <ul className="cand_percent">
                      {slug?.card_cand?.map((item, index) => (
                        <li key={index}>
                          {Math.floor((item.cand_score / totalScore) * 100)}
                          %&nbsp;
                          {item.cand_det}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="vote_collap">
                    <div className="card_cand_hd">Options</div>
                    <ul className="vote_now_list">
                      {slug?.candidates?.map((item, index) => {
                        return (
                          <li key={index}>
                            <input
                              type="radio"
                              name="options"
                              value={item.address}
                            />

                            <div className="vote_img_cont">
                              {!!item.image ? (
                                <img src={item.image} alt="" />
                              ) : (
                                <i className="uil uil-asterisk"></i>
                              )}
                            </div>
                            <p>{item.name}</p>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="rec_vote_cont">
                      <button
                        className="record_vote"
                        onClick={(e) => {
                          var voteVal = $(e.target)
                            .closest(".card_cand")
                            .find(".vote_now_list");

                          var amountToSend = $(e.target)
                            .closest(".card_cand")
                            .find(".amtToCommitInp")
                            .val();

                          var amt = !!amountToSend
                            ? amountToSend
                            : slug.choice_per_vote;

                          placeVote(
                            $("input[name=options]:checked", voteVal).val(),
                            amt,
                            slug
                          );
                        }}
                      >
                        Submit vote
                      </button>
                    </div>
                  </div>

                  <div className="card_butts">
                    <button
                      onClick={(e) => {
                        $(".uil", e.target).toggleClass("uil-angle-up");

                        var voteNow = $(e.target)
                          .closest(".card_cand")
                          .find(".vote_collap");

                        if (!!voteNow.height()) {
                          voteNow.css({
                            maxHeight: "0px",
                            margin: "0px",
                          });
                        } else {
                          voteNow.css({
                            maxHeight: voteNow.get(0).scrollHeight + "px",
                            margin: "5px 0px 10px",
                          });
                        }
                      }}
                    >
                      Vote now <i className="uil uil-angle-down"></i>
                    </button>
                    <button
                      onClick={(e) => {
                        $(".uil", e.target).toggleClass("uil-angle-up");

                        var graph = $(e.target)
                          .closest(".card_cand")
                          .find(".chart_collap");

                        if (!!graph.height()) {
                          graph.css({
                            maxHeight: "0px",
                            marginTop: "0px",
                          });
                        } else {
                          graph.css({
                            maxHeight: graph.get(0).scrollHeight + "px",
                            marginTop: "20px",
                          });
                        }
                      }}
                    >
                      View Result <i className="uil uil-angle-down"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ElectionList;
