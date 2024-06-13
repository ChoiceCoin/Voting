// Retrieve AlgoSigner sdk from the browser
const { AlgoSigner } = window;

// Get the connect button
const wallet = document.querySelector(".connect");

// function to connect wallet
const connectWallet = async () => {
  // Firstly check if algosigner is already installed
  if (!AlgoSigner) {
    return alert("Kindly install Algosigner");
  }
  // Connect Account if Algosigner is installed
  await AlgoSigner.connect()
    .then((d) => {
      console.log("Wallet Connected!");
    })
    .catch((e) => console.log("Error in connection"));
};

wallet.addEventListener("click", async (e) => {
  await connectWallet();
  wallet.value = "Connected";
});
