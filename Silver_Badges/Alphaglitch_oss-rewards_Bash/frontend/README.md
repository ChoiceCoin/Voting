## Reward Payment

Reward payment system for Choicecoin Community participants.

## Problem

There has been a need for a platform through which Active Participants of the Choicecoin Open Source Development Community can be rewarded. This platform would handle multiple transactions at once enabling faster and easier disbursement of rewards.

## Solution

The React App whose code is contained in this repo was created to handle Reward Payment.
There is a page to for partcipants to supply their data to the one who rewards tasks and a page to reward tasks.

## Run Steps

- Input Reward name
- Supply the addreses to be rewarded seperated by commas. Note that the reward is sent once to each address even when the same address is supplied multiple times
- Input amount of choice to be sent to each address and then submit. A table shows the status of the transaction for each of the addresses supplied.

## Backend

The data from the "/form" page is sent to the backend server which then stores the data in an array. On the reward page or home page, all participants' data are fetched from the endpoint "/data" and used to filter wallet adresses for rewards.
