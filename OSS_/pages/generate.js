import algosdk from "algosdk";
import algo from "../assets/algoS.png";
import Image from "next/image";

export default function FirstPost() {
  //This helps in connecting the client with the algorand network
  const algoServer = "https://testnet-algorand.api.purestake.io/ps2";
  const algoPort = "";
  const token = {
    "X-API-Key": "YpG0KO7uiT6GkDZF2u4ng1poAqgQG3Zs3Wkv2f5L", //Your APi key here
  };
  try {
    let keys = algosdk.generateAccount(); // generates an acct
    let mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
    let algoClient = new algosdk.Algodv2(token, algoServer, algoPort);
    let secret_key = algosdk.mnemonicToSecretKey(mnemonic);
    const amount = async () => {
      return await algoClient.accountInformation(keys.addr).do();
    };
    console.log(amount());
  } catch (error) {}
  return (
    <>
      <div class="w-full bg-white shadow rounded border border-transparent hover:border-blue-500 cursor-pointer">
        <div class="h-40v w-full imge-bg flex flex-col justify-between p-4"></div>

        <div class="p-4">
          <div className="w-full flex justify-center">
            <Image
              src={algo}
              width={300}
              height={120}
              alt="Algo Picture"
              className="flex justify-self-center"
            />
          </div>
          <h2>Back up your account using a recovery passphrase</h2>
          <p>
            Without your recovery passphrase, if you lose your device the app,
            you will parmanently lose access to your Algorand account.
          </p>
          <div className="w-full flex justify-center p-3">
            <h3>
              <b>Passphrase</b>
            </h3>
          </div>
          <p className="p-10">{mnemonic}</p>
          <div class="flex items-center justify-between">
            <h1 class="text-gray-600 font-medium" id="algo"></h1>
            <button class="text-gray-500 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
          <h2 className="flex flex-wrap">Address: {secret_key.addr}</h2>
          <h2>amount: {amount.amount} 0</h2>
          <p class="text-gray-400 text-sm my-1" id="key"></p>
          <span
            id="con"
            class="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium"
          >
            Successfully Generated
          </span>
        </div>
      </div>
    </>
  );
}
