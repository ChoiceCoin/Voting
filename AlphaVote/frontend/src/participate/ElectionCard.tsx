import { useDispatch, useSelector } from "react-redux";
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
  ChoiceCoinAmountRow,
  CollapsedChart,
  LabelRow,
  VoteListWrapper,
  VoteNowList,
} from "./ElectionCard.styles";
import { collapseOrExpandElement } from "../utils/animation";
import {
  getAccountAssets,
  IAssetData,
  selectAddress,
  selectAssets,
  selectChain,
  selectConnector,
  selectWalletType,
} from "../store/walletSlice";
import { ASSET_ID } from "../constants";
import { apiGetTxnParams } from "../utils/api";
import algosdk from "algosdk";
import { sendWait, sign } from "../utils/walletUtils";
const Chart = loadable(() => import("../components/Chart"));

export interface Candidate {
  name: string;
  image: string;
  address: string;
  votes: number;
}
export interface Election {
  candidates: Candidate[];
  wallet: {
    address: "";
  };
  process_image?: string;
  title: string;
  slug: string;
  card_desc: string;
  choice_per_vote?: number;
  card_cand?: [
    {
      cand_score: number;
      cand_det: string;
    }
  ];
}

// TODO: need to pull out the types
const ElectionCard: React.FC<{
  scores: number[];
  options: [];
  election: Election;
}> = ({ scores, options, election }) => {
  // const [isVoteListCollapsed, setIsVoteListCollapsed] = useState(false); // show vote list by default
  // const [isChartCollapsed, setIsChartCollapsed] = useState(true);
  const isVoteListCollapsed = false; // show vote list by default
  const isChartCollapsed = true;
  const [voteOptionChosen, setVoteOptionChosen] = useState("");
  const [voteChoiceAmount, setVoteChoiceAmount] = useState("0");
  const assets = useSelector(selectAssets);
  const address = useSelector(selectAddress);
  const chain = useSelector(selectChain);
  const walletType = useSelector(selectWalletType);
  const connector = useSelector(selectConnector);

  const voteListWrapperRef = useRef() as MutableRefObject<HTMLInputElement>;
  const collapsedChartRef = useRef() as MutableRefObject<HTMLInputElement>;

  const dispatch = useDispatch();

  const totalScore = _.sum(scores);

  const submitVoteHandler = async () => {
    if (!voteOptionChosen) {
      alert("Select an option to vote!!");
      return;
    }

    // if the address trying to vote is the same as the election creator
    if (address === election.wallet.address) {
      alert("You cannot vote in an election you created");
      dispatch({ type: "close_vote_modal" });
      return;
    }

    // check if the voter address has Choice
    const containsChoice = assets
      ? assets.some((element: any) => element["id"] === ASSET_ID)
      : false;

    if (assets.length === 0 || !containsChoice) {
      alert("You need to opt into Choice Coin");
      dispatch({ type: "close_vote_modal" });
      return;
    }

    const choiceCoin =
      assets &&
      assets.find((asset: IAssetData) => asset && asset.id === ASSET_ID);

    if (choiceCoin && Number(voteChoiceAmount) * 100 > choiceCoin.amount) {
      alert("You do not have sufficient balance to make this transaction.");
      return;
    }

    if (choiceCoin && Number(voteChoiceAmount) < 0.01) {
      alert("Minimum is 0.01 Choice Coin.");
      return;
    }

    const suggestedParams = await apiGetTxnParams(chain);

    const _amount = Number(voteChoiceAmount) * 100;

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: address,
      to: voteOptionChosen,
      amount: _amount,
      assetIndex: ASSET_ID,
      suggestedParams,
    });

    const signedTxn = await sign([txn], walletType, connector);
    const result = await sendWait(signedTxn, chain);
    if (result["pool-error"])
      throw new Error("Failed: " + result["pool-error"]);

    // alert success
    alert("You have successfully placed your vote for this election");

    dispatch(getAccountAssets({ chain, address }));
  };

  const choiceAmountChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setVoteChoiceAmount(event.target.value);
  };

  // const voteClickHandler = () => {
  //   setIsVoteListCollapsed(!isVoteListCollapsed);
  // };

  // const viewResultClickHandler = () => {
  //   setIsChartCollapsed(!isChartCollapsed);
  // };

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

  if (!election) {
    return null;
  }

  return (
    <div className="card_cont">
      <div>
        <CollapsedChart
          isChartCollapsed={isChartCollapsed}
          ref={collapsedChartRef}
        >
          <Chart scores={scores} options={options} />
          <CandidatePercentage>
            {election?.candidates?.map((item, index) => (
              <li key={index}>
                {Math.floor((item.votes / totalScore) * 100)}
                %&nbsp;
                {item.name}
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
            {election?.candidates?.map((item, index) => {
              return (
                <li key={index}>
                  <input
                    type="radio"
                    id={election.slug + "-option-" + index}
                    name="options"
                    value={item.address}
                    onChange={onVoteOptionChosen}
                  />

                  <LabelRow htmlFor={election.slug + "-option-" + index}>
                    <div className="vote_img_cont">
                      {!!item.image ? (
                        <img src={item.image} alt="" />
                      ) : (
                        <i className="uil uil-asterisk"></i>
                      )}
                    </div>
                    <p>{item.name}</p>
                  </LabelRow>
                </li>
              );
            })}
          </VoteNowList>
          <ChoiceCoinAmountRow>
            <span className="card_cand_hd">Choice Coin Amount</span>
            <input
              type="number"
              value={voteChoiceAmount}
              onChange={choiceAmountChangeHandler}
            ></input>
          </ChoiceCoinAmountRow>

          <div className="rec_vote_cont">
            <button className="record_vote" onClick={submitVoteHandler}>
              Submit vote
            </button>
          </div>
        </VoteListWrapper>
        {/* Hide Vtte Now button */}
        {/* Hide View Result until voting is over */}
        {/* <div className="card_butts">
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
        </div> */}
      </div>
    </div>
  );
};

export default ElectionCard;
