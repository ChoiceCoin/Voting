# Afiniki's - OSS Bash implementation
## PROJECT DESCRIPTION
The project is used to store details of outstanding members of Choice Coin DAO and  disburse payment to tbe addresses

## PREREQUISITES to run
- Node.js
- Git

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
  REACT-APP_PURESTAKE_API_KEY =
  REACT-APP_SEED_PHRASE =
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
- [x] Error Hansling to prevent multiple address submissions.
- [x] Address Validation



## Technology used
- React.js
- Css modules
- Algosdk

## Preview video 
<a href="https://youtu.be/zHEAjYn_ZqQ">Here</a>

## Preview the site 
<a href="https://hungry-pike-c35b25.netlify.app/">Here</a>
