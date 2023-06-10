// Retrieve AlgoSigner sdk from the browser
const { AlgoSigner } = window;

//define the adddresses
const red_address = "";
const blue_address = "";

//Get  DOM Elements
const submitBtn = document.querySelector(".submit");
const connectWallet = document.querySelector(".connect");
const yes = document.querySelector(".yes-btn");
const no = document.querySelector(".no-btn");

let yesOrNo = "";
const setValue = (value) => {
	yesOrNo = value;
};
//Function to Connect User's Account
const ConnectAccount = async () => {
	//Check  if AlgoSigner is installed
	if (!AlgoSigner) {
		return alert("Please install AlgoSigner");
	}

	//Connect Account if AlgoSigner is installed
	await AlgoSigner.connect()
		.then((d) => {})
		.catch((e) => console.log("error in connection"));
};

// Sign the Transaction
const signTransaction = async (receiver = blue_address) => {
	const txn = await AlgoSigner.algod({
		ledger: "TestNet",
		path: "/v2/transactions/params",
	})
		.then((e) => {
			return e;
		})
		.catch((e) => console.log("error in algod"));

	//retrieve account details
	const account = await AlgoSigner.accounts({
		ledger: "TestNet",
	})
		.then((value) => value[0])
		.then((result) => {
			const { address } = result;
			return address;
		})

		.catch((e) => console.log("cannot retrieve accounts"));

	//Transaction signature
	await AlgoSigner.sign({
		from: account,
		to: receiver,
		amount: document.querySelector("hi"),
		note: "voting",
		fee: txn["min-fee"],
	})
		.then(() => console.log("complete"))
		.catch((e) => console.log("error", e));
};

connectWallet.addEventListener("click", async (e) => {
	await ConnectAccount();
	connectWallet.value = "Connected";
});

submitBtn.addEventListener("click", (e) => {
	console.log("welcome user");

	//checks to see if the user click an option
	if (!yesOrNo) {
		alert("Please click either yes or no");
		return;
	}
	if (yesOrNo == "Yes") {
		signTransaction(blue_address);
	}
	if (yesOrNo == "No") {
		signTransaction(red_address);
	}
	alert(`Transaction successful in successful in ${yesOrNo}`);
});
