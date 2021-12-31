import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  ChainType,
  getAccountAssets,
  IAssetData,
  killSession,
  selectAddress,
  selectAssets,
  selectChain,
  selectConnector,
} from "../store/walletSlice";
import { ellipseAddress, formatBigNumWithDecimals } from "../utils/stringUtils";
import { ASSET_ID } from "../constants";
import { useEffect, useState } from "react";
import { useWindowSize } from "@react-hook/window-size";

const AccountInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  line-height: 1;
  font-size: 13px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;
const AssetInfo = styled.div<{ isMobile: boolean }>`
  margin-right: 8px;
  padding: 2.5px 4px;
  border: 1px solid;
  border-radius: 4px;
`;
const ConnectedAddressWrapper = styled.div`
  display: flex;
  align-items: center;
  button {
    padding: 1.22px 4px;
    color: #333;
    background-color: #aaa;
    margin-left: 4px;
  }
`;
const Address = styled.div`
  align-self: center;
  line-height: 1;
  padding: 0 0 0 8px;
  border: 1px solid;
  border-radius: 4px;
  overflow: hidden;
`;

export const getChoiceCoinData = (assets: IAssetData[], chain: ChainType) => {
  const choiceCoinAsaId = ASSET_ID; // testnet
  const choiceCoin =
    assets &&
    assets.find((asset: IAssetData) => asset && asset.id === choiceCoinAsaId);
  return choiceCoin;
};

export const getAlgoAssetData = (assets: IAssetData[]) => {
  let nativeCurrency =
    assets && assets.find((asset: IAssetData) => asset && asset.id === 0);
  if (nativeCurrency === undefined || nativeCurrency == null) {
    nativeCurrency = {
      id: 0,
      amount: BigInt(0),
      creator: "",
      frozen: false,
      decimals: 2,
      name: "Algo",
      unitName: "Algo",
    };
  }
  return nativeCurrency;
};

const AccountInfo = () => {
  const connector = useSelector(selectConnector);
  const address = useSelector(selectAddress);
  const assets = useSelector(selectAssets);
  const chain = useSelector(selectChain);
  // eslint-disable-next-line
  const nativeCurrency = getAlgoAssetData(assets);
  const choiceCoin = getChoiceCoinData(assets, chain);
  const [width] = useWindowSize();
  const [isMobile, setIsMobile] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if connection is already established
    console.log("address: ", address);
    if (connector && address && address.length > 0) {
      dispatch(getAccountAssets({ chain, address }));
    }
  }, [address]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setIsMobile(width < 768);
  }, [width]);

  if (!(connector && address)) return <></>;

  return (
    <AccountInfoWrapper>
      {choiceCoin && (
        <AssetInfo isMobile={isMobile}>
          <span>Balance:</span>{" "}
          {formatBigNumWithDecimals(choiceCoin.amount, choiceCoin.decimals)}{" "}
          {choiceCoin.unitName || "units"}
        </AssetInfo>
      )}
      {/* Hide Algo balance on header for now */}
      {/* <AssetInfo>
        {formatAlgoWithDecimals(nativeCurrency.amount, nativeCurrency.decimals)}{" "}
        {nativeCurrency.unitName || "units"}
      </AssetInfo> */}
      <ConnectedAddressWrapper>
        <Address>
          {ellipseAddress(address)}
          <button onClick={() => dispatch(killSession())}>
            <i className="fas fa-times"></i>
          </button>
        </Address>
      </ConnectedAddressWrapper>
    </AccountInfoWrapper>
  );
};

export default AccountInfo;
