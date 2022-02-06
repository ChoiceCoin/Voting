import React from "react";

function Payment() {
    return (
        <>
            <div className="flex justify-center">
                <div className="mt-8 flex flex-col xl:w-3/5 lg:w-3/5 w-full">
                    <label htmlFor="about" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                        <i><b>Separate Account Addresses with space</b></i>
                    </label>
                    <textarea id="about" name="about" className="border border-gray-300 dark:border-gray-700 pl-3 py-2 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent resize-none text-gray-800 dark:text-gray-100" placeholder="Account address with space inbetween  " rows={5} required  value={address} onChange={(e) => setAddress(e.target.value)} /><p className="w-full text-right text-xs text-gray-500 pt-1">Character Limit: 200</p>
                </div>
            </div>
            <div className="xl:w-3/4 2xl:w-4/5 w-full bg-white rounded-lg shadow">
                <div className="border rounded-lg border-gray-100">
                    <div className="py-4 md:py-6 pl-8">
                        <p className="text-base md:text-lg lg:text-xl font-bold leading-tight text-gray-800">Orders</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full whitespace-nowrap">
                            <thead>
                                <tr className="bg-gray-50 h-16 w-full text-sm leading-none text-gray-800">
                                    <th className="font-normal text-left pl-8">Date</th>
                                    <th className="font-normal text-left px-10 lg:px-6 xl:px-0">UserName</th>
                                    <th className="font-normal text-left px-10 lg:px-6 xl:px-0">Wallet Address</th>
                                    <th className="font-normal text-left px-10 lg:px-6 xl:px-0">Status</th>
                                    <th className="font-normal text-left">Transaction Id</th>
                                </tr>
                            </thead>
                            <tbody className="w-full">
                                <tr className="h-20 text-sm leading-none text-gray-800 border-b border-gray-100">
                                    <td className="pl-8">06/02/2020</td>
                                    <td className="font-medium px-10 lg:px-6 xl:px-0">
                                        Bolu
                                    </td>
                                    <td className="px-10 lg:px-6 xl:px-0">AWEFUBFNVKJNIFUEBVHJ7463V3CG3H3VG3</td>
                                    <td className="font-medium px-10 lg:px-6 xl:px-0">
                                        PASS
                                    </td>
                                    <td className="px-10 lg:px-6 xl:px-0">
                                        <p className="underline text-blue-500">YOGUWUKYSU4OO65MFRD4KUXN7LBPGGZ3PQSHWRQ7YNU2T4ZAQETA</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Payment;
