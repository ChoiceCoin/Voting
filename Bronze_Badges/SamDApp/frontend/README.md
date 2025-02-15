# Choice Coin Voting DApp

## RUN ON YOUR LOCAL MACHINE 

- `npm install` to install dependencies

- `npm start` to start react scripts 

- live at - https://choice-coin-votingdapp.netlify.app/

## checks

- instead of `sign out` on the top navigation component, i added 
  a `disconnect` toggle functionality that only shows if the user successfully connect their wallet address then return `empty` or `null` if no user's wallet is connected. I also added it to the mobile query also, instead of just the button. This helps the user experience to know when their wallet is truly disconnected.

  - fixed the copy to clipboard functionality, noticed it does not show address copied when it is being clicked.

## live demo

![visuals](https://github.com/Samuellyworld/Voting_DApp/blob/voting-dapp/frontend/public/live-demo.gif)