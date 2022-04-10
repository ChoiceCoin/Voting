## Download and Build on local
## Cd into the right directory

This helps in generating two csv files that contains received and sent rransaction respectively fetching data directly from the algorand blockchain

Install node dependencies
```bash
   npm install
```

Enter your API key

```bash
  const token={'X-API-key' : String(process.env.API_KEY)||'YOUR API KEY HERE'}
```

Enter the address constant.For this example it is set to "25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I"

```bash
  let address = "YOUR ADDRESS HERE"
```

To generate 2 csv files(Incoming.csv for incoming transactions and Outgoing.csv for outgoing transactions)

```bash
   npx ts-node index.ts
```
