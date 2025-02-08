import React, { useState } from 'react';

const TextField = () => {
    const [address, setAddress] = useState('');
    // while(i < 5){
    //     console.log(i);
    //     i++;
    //     }
  return (
      <div className="flex justify-center">
        <div className="mt-8 flex flex-col xl:w-3/5 lg:w-3/5 w-full">
            <label htmlFor="about" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                <i><b>Paste Your Account Address(es) with space in between</b></i>
            </label>
            <textarea id="about" name="about" className="border border-gray-300 dark:border-gray-700 pl-3 py-2 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent resize-none text-gray-800 dark:text-gray-100" placeholder="26BN7MNMTUDZL5HTQ63C36APXUUSZJBNXYNJB5UW5ENHLOQJLWL7ZPICOU 26BN7MNMTUDZL5HTQ63C36APXUUSZJBNXYNJB5UW5ENHLOQJLWL7ZPICOU 26BN7MNMTUDZL5HTQ63C36APXUUSZJBNXYNJB5UW5ENHLOQJLWL7ZPICOU" rows={5} required  value={address} onChange={(e) => setAddress(e.target.value)} /><p className="w-full text-right text-xs text-gray-500 pt-1">Character Limit: 200</p>
        </div>
    </div>
)};

export default TextField;
