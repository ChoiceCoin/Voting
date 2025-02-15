import {Algodv2, Indexer,isValidAddress } from "algosdk";
import * as dotenv from"dotenv"
import {generateCsv} from "./generatecsv"

dotenv.config()
const token={'X-API-key' : String(process.env.API_KEY)||'YOUR API KEY HERE'}
const indexerClient = new Indexer(token, "https://mainnet-algorand.api.purestake.io/idx2",'');//using mainnet indexer



let nexttoken='';
let numtx=1;
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export interface paymentType{
        "amount": number&bigint,
        "close-amount": string,
        "receiver": string
    }

export interface AssetTransferType{
        "amount": number&bigint,
        "asset-id": number|bigint,
        "close-amount": number,
        "receiver": string
}


interface transaction {
    "close-rewards": number|bigint,
      "closing-amount": number|bigint,
      "confirmed-round": number|bigint,
      "fee": number|bigint,
      "first-valid": number|bigint,
      "genesis-hash": string,
      "genesis-id": string,
      "id": string,
      "intra-round-offset": number|bigint,
      "last-valid": number|bigint,
      "asset-transfer-transaction": AssetTransferType,
      "payment-transaction": paymentType,
      "receiver-rewards": number|bigint,
      "round-time": number|bigint,
      "sender": string,
      "sender-rewards": number|bigint,
      "signature": {
        "sig": string
      },
      "tx-type": string
}


export interface transacationData{
    sender:string,
    info:AssetTransferType|paymentType
}


async function getTransactionHistory(address:string){
    if(!isValidAddress(address)){
        return "Invalid Address given"
    }
    let min_amount = 0;
    let transacationCount=0
    var transacationDataArray:transacationData[]=[]
    while (numtx>0){
        await sleep(150);
        let next_page=nexttoken
        let response = await indexerClient.searchForTransactions()
        .address(address)
        .currencyGreaterThan(min_amount)
        .limit(100)
        .nextToken(next_page)
        .do();
        let transactions:transaction[] = response['transactions'];
        transacationCount++
        numtx=transactions.length
        if (numtx > 0){
            var transactionData=transactions.map((transacation)=>{
                if(transacation['asset-transfer-transaction']){
                    return {
                        sender:transacation['sender'],
                        info:transacation['asset-transfer-transaction'],
                        count:(100*transacationCount)+transactions.indexOf(transacation)
                    }
                }else{
                    return {
                        sender:transacation['sender'],
                        info:transacation['payment-transaction'],
                        count:(100*transacationCount)+transactions.indexOf(transacation)
                    }
                }
                
            })
            transacationDataArray.push(...transactionData)
            nexttoken = response['next-token']; 
        }
    } 
    return transacationDataArray
    console.log("Transaction Information: " + JSON.stringify(transacationDataArray, undefined, 2));           
    }
      

(async ()=>{
    let address = "25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I";
    const data=await getTransactionHistory(address)
    if(typeof data == "string"){
        console.log(data)
    }else{
        await generateCsv(data.filter((transactionData)=>transactionData.info.receiver==address),"./Incoming.csv")//check if address is receiver and puts it in Incoming.csv file
        await generateCsv(data.filter((transactionData)=>transactionData.sender==address),"./Outgoing.csv")//check if address is sender and put it in Outgoing.csv file

    }

    
})().catch(e => {
    console.log(e);
    console.trace();
});