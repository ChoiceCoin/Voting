import algosdk from "algosdk";
import { IAssetData } from "../store/walletSlice";

export enum ChainType {
  MainNet = "MainNet",
  TestNet = "TestNet",
}

const mainNetClient = new algosdk.Algodv2("", "https://algoexplorerapi.io", "");
const testNetClient = new algosdk.Algodv2("", "https://testnet.algoexplorerapi.io", "");
const mainNetIndexer = new algosdk.Indexer("", "https://algoexplorerapi.io/idx2", "");
const testNetIndexer = new algosdk.Indexer("", "https://testnet.algoexplorerapi.io/idx2", "");

export function clientForChain(chain: ChainType): algosdk.Algodv2 {
  switch (chain) {
    case ChainType.MainNet:
      return mainNetClient;
    case ChainType.TestNet:
      return testNetClient;
    default:
      throw new Error(`Unknown chain type: ${chain}`);
  }
}

export function indexerForChain(chain: ChainType): algosdk.Indexer {
  switch (chain) {
    case ChainType.MainNet:
      return mainNetIndexer;
    case ChainType.TestNet:
      return testNetIndexer;
    default:
      throw new Error(`Unknown chain type: ${chain}`);
  }
}

export async function apiGetAccountAssets(
  chain: ChainType,
  address: string,
): Promise<IAssetData[]> {
  const client = clientForChain(chain);

  const accountInfo = await client
    .accountInformation(address)
    .setIntDecoding(algosdk.IntDecoding.BIGINT)
    .do();

  const algoBalance = accountInfo.amount as bigint;
  const assetsFromRes: Array<{
    "asset-id": bigint;
    amount: bigint;
    creator: string;
    frozen: boolean;
  }> = accountInfo.assets;

  const assets: IAssetData[] = assetsFromRes.map(({ "asset-id": id, amount, creator, frozen }) => ({
    id: Number(id),
    amount,
    creator,
    frozen,
    decimals: 0,
  }));

  assets.sort((a, b) => a.id - b.id);

  await Promise.all(
    assets.map(async asset => {
      const { params } = await client.getAssetByID(asset.id).do();
      asset.name = params.name;
      asset.unitName = params["unit-name"];
      asset.url = params.url;
      asset.decimals = params.decimals;
    }),
  );

  assets.unshift({
    id: 0,
    amount: algoBalance,
    creator: "",
    frozen: false,
    decimals: 6,
    name: "Algo",
    unitName: "Algo",
  });

  return assets;
}

export async function apiGetTxnParams(chain: ChainType): Promise<algosdk.SuggestedParams> {
  const params = await clientForChain(chain)
    .getTransactionParams()
    .do();
  return params;
}

export async function apiSubmitTransactions(
  chain: ChainType,
  stxns: Uint8Array[],
): Promise<number> {
  const { txId } = await clientForChain(chain)
    .sendRawTransaction(stxns)
    .do();
  return await waitForTransaction(chain, txId);
}

async function waitForTransaction(chain: ChainType, txId: string): Promise<number> {
  const client = clientForChain(chain);

  let lastStatus = await client.status().do();
  let lastRound = lastStatus["last-round"];
  while (true) {
    const status = await client.pendingTransactionInformation(txId).do();
    if (status["pool-error"]) {
      throw new Error(`Transaction Pool Error: ${status["pool-error"]}`);
    }
    if (status["confirmed-round"]) {
      return status["confirmed-round"];
    }
    lastStatus = await client.statusAfterBlock(lastRound + 1).do();
    lastRound = lastStatus["last-round"];
  }
}
