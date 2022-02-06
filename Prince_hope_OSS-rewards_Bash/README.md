# Prince's - Reward Implementatiion Software for (OSS)



## PROJECT DESCRIPTION
The project provides an easy to use way to create and store varibles that persisits and also makes use of the Algosdk which allows the processsing of transactions on the algorand network
## PREREQUISITES
- PureStake Api key
- Algorand Wallet address
- WEB BROWSER (fOR TESTING)
- NODE JS
- GIT
- AN UNDERSTANDING OF LOCALSTORAGE API

## RUN ON YOUR LOCAL MACHINE 
- `git clone` the repository
- `cd` into the repository 
 ```bash
 cd reward
 ```
 - ` Create` a `.env.local` file in the root directory
 ```bash
  touch .env.local
  # or
  echo .env.local 
  ```
  - Insert the following variables in the `env.local` file and fill in the env variables
  ```bash
  NEXT_PUBLIC_PURESTAKE_API_KEY =
  NEXT_PUBLIC_SEED_PHRASE =
  ```

- Install dependencies
 ```bash
   npm install 
   # or
   yarn add
 ```

- `Start` development server

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Functionalities
- [x] Admin can add active participants.
- [x] Admin can reward single address.
- [x] Admin can reward bulk address
- [x] Error Handling to prevent multiple address submissions.
- [x] Address Validation



## Technology used
- Next.js
- Tailwind.css
- Algosdk

## Preview video 
<a href="https://youtu.be/_XDG8E2U4Bc">Here</a>

[![Watch the video](./public/Choice.png)](https://youtu.be/_XDG8E2U4Bc)
## Preview the site
 <a href="https://vercel.com/prince-hope1975/rewards/9c7m5co8YPsWtVSLDSYdX9xmggX3">Here</a>

 ## About
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.