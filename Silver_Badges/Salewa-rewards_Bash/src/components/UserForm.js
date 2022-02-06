import React, { useRef } from "react";
import { Link } from "react-router-dom";
const UserForm = () => {
    let form = useRef(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        const form_data = new FormData(form.current);
        let payload = {};
        form_data.forEach(function (value, key) {
            payload[key] = value;
        });
        // console.log("payload", payload);
        // Place your API call here to submit your payload.
    };
    return (
        <div>
            <div>
                <form ref={form} onSubmit={handleSubmit} className="container mx-auto bg-white shadow rounded">
                    <div>
                        <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
                            <div className="flex items-center w-11/12 mx-auto">
                                <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Choice Participant Form</p>
                                <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                                </div>
                            </div>
                        </div>
                        <div className="w-11/12 mx-auto">
                            <div className="container mx-auto">
                                <div className="my-8 mx-auto xl:w-full xl:mx-0">
                                    <div className="xl:flex lg:flex md:flex flex-wrap justify-between">
                                        <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                                            <label htmlFor="FirstName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                                Full Name
                                            </label>
                                            <input type="text" name="firstName" required id="FirstName" className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100" placeholder ='Full Name'/>
                                        </div>
                                        <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                                            <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                            Discord ID
                                            </label>
                                            <input type="text" id="LastName" name="lastName" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100" placeholder='Discord Username'  />
                                        </div>
                                        <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                                            <label htmlFor="City" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                            Role
                                            </label>
                                            <div className="border border-gray-300 dark:border-gray-700 shadow-sm rounded flex relative">
                                                <select type="text" name="city" required id="City" className="bg-white dark:bg-gray-800 appearance-none z-10 pl-3 py-3 w-full text-sm border border-transparent focus:outline-none focus:border-indigo-700  text-gray-800 dark:text-gray-100 rounded">
                                                <option value="Switzerland">No Role Yet</option>
                                                    <option value="Switzerland">Developer</option>
                                                    <option value="America">Community Participant</option>
                                                    <option value="Australia">Leader</option>
                                                    <option value="Switzerland">Captain</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                                            <label htmlFor="StreetAddress" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                            GitHub url
                                            </label>
                                            <input type="text" id="StreetAddress" name="streetAddress" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100" placeholder="www.github.com/username" />
                                        </div>
                                        <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                                            <label htmlFor="Country" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                            Twitter Handler
                                            </label>
                                            <input type="text" id="Country" name="country" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100" placeholder="twitter username" />
                                        </div>
                                        <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                                            <div className="flex items-center pb-2">
                                                <label htmlFor="ZIP" className="text-sm font-bold text-gray-800 dark:text-gray-100">
                                                Wallet Address
                                                </label>
                                            </div>
                                            <input type="text" id="ZIP" name="zip" className="border border-red-400 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100" placeholder="26BN7MNMTUDZL5HTQ63C36APXUUSZJBNXYNJB5UW5ENHLOQJLWL7ZPICOU" />
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full py-4 sm:px-12 px-4 bg-gray-100 dark:bg-gray-700 mt-6 flex justify-center rounded-bl rounded-br">
                            <button className="btn text-sm focus:outline-none text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-500 py-2 px-6 mr-4 rounded hover:bg-gray-200 transition duration-150 ease-in-out">Restore</button>
                            <Link to='/payment'>
                                <button className="bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm focus:outline-none" type="submit">
                                    Save
                                </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            ;
        </div>
    );
};
export default UserForm;
