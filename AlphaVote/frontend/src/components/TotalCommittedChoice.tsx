import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  ChainType,
  IAssetData,
  selectAddress,
  selectAssets,
  selectChain,
} from "../store/walletSlice";
import { formatBigNumWithDecimals } from "../utils/stringUtils";
import { ASSET_ID } from "../constants";
import { useQuery } from "react-query";
import axios from "axios";
import { URL } from "../constants";
import { useEffect, useState } from "react";
import { indexerForChain } from "../utils/api";
import { Election } from "../participate/ElectionCard";
import { useWindowSize } from "@react-hook/window-size";

const TotalCommittedChoiceWrapper = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  align-self: center;
  line-height: 1;
  font-size: 13px;
  padding: 2.5px 4px;
  border: 1px solid;
  border-radius: 4px;
  margin-right: 8px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const getChoiceCoinData = (assets: IAssetData[], chain: ChainType) => {
  const choiceCoinAsaId = ASSET_ID; // testnet
  const choiceCoin =
    assets &&
    assets.find((asset: IAssetData) => asset && asset.id === choiceCoinAsaId);
  return choiceCoin;
};

const TotalCommittedChoice = () => {
  const { isLoading, error, data } = useQuery("elections", () =>
    axios.get(`${URL}/elections`).then((response) => response.data.data)
  );
  const address = useSelector(selectAddress);
  const assets = useSelector(selectAssets);
  const chain = useSelector(selectChain);
  const choiceCoin = getChoiceCoinData(assets, chain);
  const [
    userTotalCommittedChoiceToVoting,
    setUserTotalCommittedChoiceToVoting,
  ] = useState<bigint>(BigInt(0));
  const [width] = useWindowSize();

  useEffect(() => {
    if (!data) {
      return;
    }
    const algoIndexer = indexerForChain(chain);
    const voteAddressList = (data as unknown as Election[])
      .map((election) => election.candidates)
      .flat()
      .map((candidate) => candidate.address);
    algoIndexer
      .lookupAccountTransactions(address)
      .do()
      .then(({ transactions }) => {
        // axfer is asset transfer
        // Choice coin voting tx is under this type
        const userSentChoiceTxns = transactions
          .filter(
            (txn: any) =>
              txn["tx-type"] === "axfer" &&
              txn["asset-transfer-transaction"]["asset-id"] === ASSET_ID
          )
          .map((txn: any) => ({
            receiver: txn["asset-transfer-transaction"].receiver,
            amount: txn["asset-transfer-transaction"].amount,
          }))
          .filter((userSentChoiceTx: { receiver: string; amount: number }) =>
            voteAddressList.includes(userSentChoiceTx.receiver)
          );
        const _totalCommittedChoice = userSentChoiceTxns
          .filter((userSentChoiceTx: { receiver: string; amount: number }) =>
            voteAddressList.includes(userSentChoiceTx.receiver)
          )
          .reduce(
            (
              previousValue: number,
              currentTx: { receiver: string; amount: number }
            ) => previousValue + currentTx.amount,
            0
          );
        setUserTotalCommittedChoiceToVoting(BigInt(_totalCommittedChoice));
      });
  }, [chain, data, address]);

  if (!data || isLoading || !address || !choiceCoin) return <></>;

  if (error) {
    console.error(`An error has occurred: ${(error as ErrorEvent).message}`);
    return <></>;
  }

  return (
    <TotalCommittedChoiceWrapper isMobile={width < 768}>
      Committed:{" "}
      {data &&
        formatBigNumWithDecimals(
          userTotalCommittedChoiceToVoting,
          choiceCoin.decimals
        )}{" "}
      {choiceCoin.unitName || "units"}
    </TotalCommittedChoiceWrapper>
  );
};

export default TotalCommittedChoice;
