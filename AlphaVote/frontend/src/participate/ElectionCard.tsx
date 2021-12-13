import { useDispatch } from "react-redux";
import _ from "lodash";
import loadable from "@loadable/component";
import React, {
  ChangeEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CandidatePercentage,
  CollapsedChart,
  VoteListWrapper,
  VoteNowList,
} from "./ElectionCard.styles";
import { collapseOrExpandElement } from "../utils/animation";
import { title } from "process";
const Chart = loadable(() => import("../components/Chart"));

// TODO: need to pull out the types
const ElectionCard: React.FC<{
  scores: [];
  options: [];
  slug: {
    candidates: [
      {
        name: string;
        image: string;
        address: string;
      }
    ];
    process_image: string;
    title: string;
    card_desc: string;
    choice_per_vote: number;
    card_cand: [
      {
        cand_score: number;
        cand_det: string;
      }
    ];
  };
}> = ({ scores, options, slug }) => {
  const [isVoteListCollapsed, setIsVoteListCollapsed] = useState(true);
  const [isChartCollapsed, setIsChartCollapsed] = useState(true);
  const [voteOptionChosen, setVoteOptionChosen] = useState("");

  const voteListWrapperRef = useRef() as MutableRefObject<HTMLInputElement>;
  const collapsedChartRef = useRef() as MutableRefObject<HTMLInputElement>;

  const dispatch = useDispatch();

  const totalScore = _.sum(scores);

  const submitVoteHandler = () => {
    if (!voteOptionChosen) {
      alert("Select an option to vote!!");
      return;
    }

    console.log("address: ", voteOptionChosen);
    console.log("amount: ", slug.choice_per_vote);

    dispatch({
      type: "modal_connect_vote",
      voteData: {
        address: voteOptionChosen,
        amount: slug.choice_per_vote,
        election: slug,
      },
    });
  };

  const voteClickHandler = () => {
    setIsVoteListCollapsed(!isVoteListCollapsed);
  };

  const viewResultClickHandler = () => {
    setIsChartCollapsed(!isChartCollapsed);
  };

  const onVoteOptionChosen = (event: ChangeEvent<HTMLInputElement>) => {
    setVoteOptionChosen(event.target.value);
  };

  const collapseOrExpandVoteList = useCallback(() => {
    if (voteListWrapperRef && voteListWrapperRef.current) {
      collapseOrExpandElement(voteListWrapperRef.current, isVoteListCollapsed);
    }
    // eslint-disable-next-line
  }, [isVoteListCollapsed, voteListWrapperRef.current]);

  const collapseOrExpandChart = useCallback(() => {
    if (collapsedChartRef && collapsedChartRef.current) {
      collapseOrExpandElement(collapsedChartRef.current, isChartCollapsed);
    }
    // eslint-disable-next-line
  }, [isChartCollapsed, collapsedChartRef.current]);

  useEffect(() => collapseOrExpandVoteList(), [collapseOrExpandVoteList]);
  useEffect(() => collapseOrExpandChart(), [collapseOrExpandChart]);

  if (!slug) {
    return null;
  }

  return (
    <div className="card_cont">
      <div className="card_r1">
        <div className="card_elt_img">
          <img src={slug.process_image} alt="" />
        </div>
        <div className="card_elt_tit">{slug.title}</div>
      </div>

      <div className="card_elt_desc">{slug?.card_desc}</div>

      <div className="card_cand">
        <div className="card_cand_hd">
          <p>Candidates</p>
          <p>Amt:&nbsp;{slug?.choice_per_vote}</p>
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

        <CollapsedChart isChartCollapsed={isChartCollapsed}>
          <Chart scores={scores} options={options} />
          <CandidatePercentage>
            {slug?.card_cand?.map((item, index) => (
              <li key={index}>
                {Math.floor((item.cand_score / totalScore) * 100)}
                %&nbsp;
                {item.cand_det}
              </li>
            ))}
          </CandidatePercentage>
        </CollapsedChart>

        <VoteListWrapper
          isVoteListCollapsed={isVoteListCollapsed}
          ref={voteListWrapperRef}
        >
          <div className="card_cand_hd">Options</div>
          <VoteNowList>
            {slug?.candidates?.map((item, index) => {
              const id = title.slice(
                0,
                title.length > 16 ? title.length / 2 : title.length
              );
              return (
                <li key={index}>
                  <input
                    type="radio"
                    id={id}
                    name="options"
                    value={item.address}
                    onChange={onVoteOptionChosen}
                  />

                  <label className="vote_img_cont" htmlFor={id}>
                    {!!item.image ? (
                      <img src={item.image} alt="" />
                    ) : (
                      <i className="uil uil-asterisk"></i>
                    )}
                  </label>
                  <p>{item.name}</p>
                </li>
              );
            })}
          </VoteNowList>

          <div className="rec_vote_cont">
            <button className="record_vote" onClick={submitVoteHandler}>
              Submit vote
            </button>
          </div>
        </VoteListWrapper>

        <div className="card_butts">
          <button onClick={voteClickHandler}>
            Vote now
            <i
              className={`uil ${
                isVoteListCollapsed ? "uil-angle-down" : "uil-angle-up"
              }`}
            ></i>
          </button>
          <button onClick={viewResultClickHandler}>
            View Result
            <i
              className={`uil ${
                isChartCollapsed ? "uil-angle-down" : "uil-angle-up"
              }`}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElectionCard;
