import * as csv from 'fast-csv';
import * as fs from 'fs';
import { transacationData,AssetTransferType,paymentType } from '.';

type fileLocation="./Incoming.csv"|"./Outgoing.csv"
const CHOICE_ASSET_ID = 297995609;

//to check type of transaction
function isAssetType(transacationinfo:paymentType|AssetTransferType): transacationinfo is AssetTransferType {
    return (transacationinfo as AssetTransferType)['asset-id'] !== undefined;
  }

export async function generateCsv(data:transacationData[],fileLocation:fileLocation){
    const csvStream = csv.format({ headers: true });
    const csvfile=fs.createWriteStream(fileLocation)
    csvStream.pipe(csvfile)
    if(fileLocation=="./Incoming.csv"){
    data.forEach((transactionData)=>{
        var obj={
            Sender:transactionData.sender,
            Amount:transactionData.info.amount/1000000,
            Asset:"ALGO"
        }
        //checks if transaction type is Asset transfer
        if(isAssetType(transactionData.info)){
            obj['Asset']=(transactionData.info['asset-id']==CHOICE_ASSET_ID) ? "CHOICE COIN" : String(transactionData.info['asset-id'])
        }
        csvStream.write(obj)
    })
    }else{
        data.forEach((transactionData)=>{
            var obj={
                Receiver:transactionData.info.receiver,
                Amount:transactionData.info.amount/1000000,
                Asset:"ALGO"
            }
            if(isAssetType(transactionData.info)){
                obj['Asset']=(transactionData.info['asset-id']==CHOICE_ASSET_ID) ? "CHOICE COIN" : String(transactionData.info['asset-id'])
            }
            csvStream.write(obj)//write to file
        })
    }
    csvStream.end();
    
}
