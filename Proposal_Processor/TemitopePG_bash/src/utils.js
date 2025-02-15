//import React from 'react';
// working with import and export 
const isArrayEmpty = (arr) => {
    if(arr !== undefined && arr !== null && arr.length > 0) {
        return  false ;
    }
    return true;

}

const dumpLogs= (message) => {
    console.log(message);
}

export {isArrayEmpty, dumpLogs}
