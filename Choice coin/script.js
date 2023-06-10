/** @format */

// Retrieve AlgoSigner sdk from the browser
const { AlgoSigner } = window;
const connectWallet = document.querySelector(".button1");
const ConnectAccount = async () => {
  //Check  if AlgoSigner is installed
  if (!AlgoSigner) {
    return alert("Kindly install AlgoSigner");
  }

  //Connect Account if AlgoSigner is installed
  await AlgoSigner.connect()
    .then((d) => {})
    .catch((e) => console.log("error in connection"));
};
connectWallet.addEventListener("click", async (e) => {
  await ConnectAccount();
  connectWallet.value = "Connected";
});
