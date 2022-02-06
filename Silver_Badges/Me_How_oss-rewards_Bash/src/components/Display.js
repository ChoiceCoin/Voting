import React, { useState } from "react";
// import { sendPaymentTransaction } from '../utils';

// import algosdk from "algosdk";
// const algo = require('../utils.js')

// const ACCOUNT = process.env.ACCOUNT;
const MNEMONIC = process.env.REACT_APP_MNEMONIC;
const server = process.env.REACT_APP_SERVER;
const port = process.env.REACT_APP_PORT;
const token = {
    'X-API-Key': process.env.REACT_APP_TOKEN
}
console.log(`THE SERVER ${server}  THE PORT =${port} AND THE TOKEN ${token} and ${MNEMONIC}`)


const Display = () => {
    const [amount, setAmount] = useState(0);
    // const [loading, setLoading] = useState(Boolean);
    const [address, setAddress] = useState('');

    function CountAccts(str) {
        str = str.replace(/(^\s*)|(\s*$)/gi,"");
        str = str.replace(/[ ]{2,}/gi," ");
        str = str.replace(/\n /,"\n");
        return str.split(' ').length;
     }
    const people = [
        {
            name: 'Discord Username',
            address: 'Wallet Address',
            status: 'Sucess',
            role: 'Developer',
        },
          {
            name: 'Jane Cooper',
            address: '26BN7MNMTUDZL5HTQ63C36APXUUSZJBNXYNJB5UW5ENHLOQJLWL7ZPICOU',
            status: 'Failed',
            role: 'Admin',
          },
      ]
      const SendChoice = (e) => {
        // setLoading(true)
        e.preventDefault();
        const NumberOfAcctAdresses = CountAccts(address)
        const ArrayAcctAdresses = address.split(" ");
        let i = 0
        while(i < NumberOfAcctAdresses){
            // sendPaymentTransaction(MNEMONIC, ArrayAcctAdresses[i], amount)
            console.log(` ${i} I AM THE ListAdresses ==>>> ${ArrayAcctAdresses[i]}`)
            i++;
        }
        // algo.sendPaymentTransaction(MNEMONIC, to, amount )
        // setLoading(false)
      }
    return (
        <>
        <div className="flex justify-center">
            <div className="mt-8 flex flex-col xl:w-3/5 lg:w-3/5 w-full">
                <label htmlFor="about" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                    <i><b>Paste Your Account Address(es) with space in between</b></i>
                </label>
                <textarea id="about" name="about" className="border border-gray-300 dark:border-gray-700 pl-3 py-2 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent resize-none text-gray-800 dark:text-gray-100" placeholder="26BN7MNMTUDZL5HTQ63C36APXUUSZJBNXYNJB5UW5ENHLOQJLWL7ZPICOU 26BN7MNMTUDZL5HTQ63C36APXUUSZJBNXYNJB5UW5ENHLOQJLWL7ZPICOU 26BN7MNMTUDZL5HTQ63C36APXUUSZJBNXYNJB5UW5ENHLOQJLWL7ZPICOU" rows={5} required  value={address} onChange={(e) => setAddress(e.target.value)} /><p className="w-full text-right text-xs text-gray-500 pt-1">Character Limit: 200</p>
            </div>
        </div>
        <div className="py-20 container mx-auto overflow-x-auto">
            <div className="flex flex-col lg:flex-row p-8 justify-between items-start lg:items-stretch w-full">
                <div className="w-full lg:w-1/4 xl:w-1/3 flex flex-col lg:flex-row items-start lg:items-center">
                    <div className="w-full relative mb-2 lg:mb-0 lg:mr-4">
                        <div className="absolute text-gray-600 dark:text-gray-400 flex items-center pl-4 h-full"><b>$</b></div>
                        <label htmlFor="Choice Amount" className="hidden" />
                        <input id="Choice Amount" className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-12 text-sm border-gray-300 dark:border-gray-200 rounded border" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Search" />
                    </div>
                </div>
                <div className="w-full lg:w-3/4 xl:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-between">
                    <button className="focus:shadow-outline-gray border border-transparent w-auto lg:w-1/4 my-2 lg:my-0 lg:ml-2 xl:ml-4 bg-indigo-700 transition focus:outline-none focus:border-gray-800 focus:shadow-outline-gray duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-sm" onClick={(e) => SendChoice(e)}>Send Choice</button>
                </div>
            </div>

            <table className="w-full shadow text-left bg-white dark:bg-gray-800">
                <thead>
                    <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8 bg-indigo-100">
                        <th className="py-5 pl-2 sm:pl-10 w-1/4 text-base dark:text-gray-100 text-gray-800">Discord Username</th>
                        <th className="py-5 w-1/4 text-base dark:text-gray-100 text-gray-800 text-center pr-8">Wallet Address</th>
                        <th className="py-5 w-1/4 text-base dark:text-gray-100 text-gray-800 text-center">Status</th>
                        <th className="py-5 w-1/4 text-base dark:text-gray-100 text-gray-800 text-center sm:pr-10">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map((person, i) => (
                        <tr  key={i} className="border-b border-gray-200">
                        <td className="pl-2 sm:pl-10 pr-2 py-4">
                            <div className="flex items-center">
                                <div className="pl-4">
                                    <p className="dark:text-gray-100 text-gray-800 text-xs sm:text-sm">{person.name}</p>
                                </div>
                            </div>
                        </td>
                        <td className="pr-2 pt-4 pb-5 text- gray-800 text-xs sm:text-sm">
                            <div className="xl:pl-32 flex flex-col">
                                <div>
                                    <p className="dark:text-gray-100 text-gray-800 text-xs sm:text-sm pb-1">{person.address}</p>
                                </div>
                            </div>
                        </td>
                        <td className="pr-2 pt-4 pb-5 text-green-400 text-xs sm:text-sm text-center">
                        {person.status === 'Sucess' ?
                            <button className="bg-gray-200 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-green-700 px-5 py-1 text-sm">{person.status}</button>
                            :
                            <button className="bg-gray-200 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:border-gray-800 focus:shadow-outline-gray hover:bg-red-300 rounded text-red-700 px-5 py-1 text-sm">{person.status}</button>
                        }
                        </td>
                        <td className="pt-4 pb-5 dark:text-gray-100 text-gray-800 pr-2 sm:pr-10 text-xs sm:text-sm text-center">{person.role}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};
export default Display;
