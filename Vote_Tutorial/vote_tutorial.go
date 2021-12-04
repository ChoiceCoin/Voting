package main

import (
	"context"
	"fmt"

	"github.com/algorand/go-algorand-sdk/client/v2/algod"
	"github.com/algorand/go-algorand-sdk/client/v2/common"
	"github.com/algorand/go-algorand-sdk/crypto"
	"github.com/algorand/go-algorand-sdk/future"
	"github.com/algorand/go-algorand-sdk/mnemonic"
)

// Voting using Choice Coin
// A map to building decision software on Algorand
// Overview
//
// This Tutorial is a guide to building voting technology on Algorand using Choice Coin.
// Choice Coin is an Algorand Standard Asset (ASA) for solving the decentralized governance problem, which refers to the lack of a secure and autonomous process for decentralized organizations to make decisions.
// This Tutorial focuses on getting started with Decentralized Decisions, an open source voting software powered by Choice Coin.

// Requirements
//
// All requirements for this Tutorial can be found in the [go.mod](https://github.com/ChoiceCoin/Voting/blob/main/Choice_Coin_Voting/go.mod) file on the Choice Coin GitHub.
// To install the requirements run:

// go mod download

// Background
//
// Collective decision making is an important and essential part of groups across the world.
// Governments, corporations, charities, and many other organizations use voting as a means for making decisions impacting collections of people. Indeed, voting happens across industry – from corporate shareholder meetings to political elections.
// Fundamentally, voting is a method by which collective information is processed to determine consensus and make decisions.

// The purpose of Choice Coin is to allow decentralized organizations to govern themselves and control digital assets in an equitable fashion. More and more, organizations developing projects in Decentralized Finance (DeFi), Non-Fungible Tokens (NFTs), and blockchain networks need a way to govern. Contrary to centralized systems, which are inherently hierarchical and pyramid like in nature, decentralized systems distribute power and decision making across global networks in a fair fashion. Thus, there exists a need for a way decentralized organizations can make decisions across distributed ledgers.

// Decentralized Decisions is a software designed to meet this need and provide a ready to use decentralized voting application using Choice Coin on the Algorand Network.
// The Decentralized Decisions software is open source and available on GitHub.
// The main programming language used for Decentralized Decisions development is Python, however the software may be written in other languages too, such as JavaScript, Go.

// Steps
//
// 1. Import Algorand Go-SDK
// Start by importing the necessary dependencies from the Algorand Go-SDK.

const algodAddress = "https://testnet-algorand.api.purestake.io/ps2"
const algodToken = "" // replace me
const assetID = 21364625

const voterAddress = ""                        // replace me
var voterPhrase, _ = mnemonic.ToPrivateKey("") // replace me

func main() {
	headers := []*common.Header{
		{"X-API-Key", algodToken},
	}

	// create an algod client
	algodClient, err := algod.MakeClientWithHeaders(algodAddress, algodToken, headers)
	if err != nil {
		fmt.Printf("Error creating algodClient -> %s\n", err)
		return
	}
	// get algodClient status
	status, err := algodClient.Status().Do(context.Background())
	if err != nil {
		fmt.Printf("error getting algod status: %s\n", err)
		return
	}
	fmt.Printf("AlgodClient Status: Up!\nLast Round: %d\n", status.LastRound)

	// Vote
	vote(algodClient)

	// Check results of the first decision
	checkResultOne(algodClient)

	// Check results of the second decision
	checkResultZero(algodClient)
}

func vote(algodClient *algod.Client) {
	// Get the voting choice from the user
	var voter string
	fmt.Printf("Vote 0 for zero and vote 1 for one:  ")
	fmt.Scanf("%s", &voter)

	if voter == "1" {
		// amount to send.
		var amount uint64 = 100

		// address to represent decision "1"
		voteAddress := "" // replace me

		// a note to accompany the transaction with
		note := []byte("Thanks for voting 1")

		// Get the suggested transaction parameters
		txParams, err := algodClient.SuggestedParams().Do(context.Background())
		if err != nil {
			fmt.Printf("Error getting suggested tx params -> %s\n", err)
			return
		}

		txn, err := future.MakeAssetTransferTxn(voterAddress, voteAddress, amount, note, txParams, "", assetID)
		if err != nil {
			fmt.Printf("Error performing asset transfer -> %s\n", err)
			return
		}
		txnID, signedTxn, err := crypto.SignTransaction(voterPhrase, txn)
		if err != nil {
			fmt.Printf("Failed to sign transaction -> %s\n", err)
			return
		}
		txnResponse, err := algodClient.SendRawTransaction(signedTxn).Do(context.Background())
		if err != nil {
			fmt.Printf("Failed to send transaction -> %s\n", err)
			return
		}
		fmt.Printf("Submitted transaction... %s\nThanks for Voting 1...\nTxID: %s", txnResponse, txnID)
	} else if voter == "0" {
		// amount to send
		var amount uint64 = 100

		// address to represent decision "1"
		voteAddress := "" // replace me

		// a note to accompany the transaction with
		note := []byte("Thanks for voting 0")

		// Get the suggested transaction parameters
		txParams, err := algodClient.SuggestedParams().Do(context.Background())
		if err != nil {
			fmt.Printf("Error getting suggested tx params -> %s\n", err)
			return
		}

		txn, err := future.MakeAssetTransferTxn(voterAddress, voteAddress, amount, note, txParams, "", assetID)
		if err != nil {
			fmt.Printf("Error performing asset transfer -> %s\n", err)
			return
		}
		txnID, signedTxn, err := crypto.SignTransaction(voterPhrase, txn)
		if err != nil {
			fmt.Printf("Failed to sign transaction -> %s\n", err)
			return
		}
		txnResponse, err := algodClient.SendRawTransaction(signedTxn).Do(context.Background())
		if err != nil {
			fmt.Printf("Failed to send transaction -> %s\n", err)
			return
		}
		fmt.Printf("Submitted transaction... %s\nThanks for Voting 0...\nTxID: %s", txnResponse, txnID)
	}
}

func checkResultOne(algodClient *algod.Client) {
	address := "" //replace me
	accountInfo, err := algodClient.AccountInformation(address).Do(context.Background())
	if err != nil {
		fmt.Printf("Error occured while retrieving account info for address: %s\nError ->%s\n", address, err)
		return
	}

	// loops through the assets in the specified address
	for _, asset := range accountInfo.Assets {
		if assetID == asset.AssetId {
			fmt.Printf("Account %s has %d\n", address, asset.Amount)
			break
		}
	}

	// where the specified address does not contain the required ASA
	fmt.Printf("Account %s must opt in to Asset ID %d\n", address, assetID)
}

func checkResultZero(algodClient *algod.Client) {
	address := "" //replace me
	accountInfo, err := algodClient.AccountInformation(address).Do(context.Background())
	if err != nil {
		fmt.Printf("Error occured while retrieving account info for address: %s\nError ->%s\n", address, err)
		return
	}

	// loops through the assets in the specified address
	for _, asset := range accountInfo.Assets {
		if assetID == asset.AssetId {
			fmt.Printf("Account %s has %d\n", address, asset.Amount)
			break
		}
	}

	// where the specified address does not contain the required ASA
	fmt.Printf("Account %s must opt in to Asset ID %d\n", address, assetID)
}
