import React from 'react';


const AccountContext = React.createContext({
    accounts: [],
    selectedAccount: null,
    addAccounts: () => null,
    addselectedAccount: () => null
})

export const AccountProvider = ({children}) => {
    const [accounts, setAccounts] = React.useState([])
    const [selectedAccount, setSelectedAccount] = React.useState({})

    const addAccounts = React.useCallback((data) => {
        setAccounts(data)
    }, [])


    const addselectedAccount = React.useCallback((data) => {
        setSelectedAccount(data)
    }, [])
    return(
        <AccountContext.Provider value={{accounts, selectedAccount, addAccounts, addselectedAccount}}>
            {children}
        </AccountContext.Provider>
    )

};


export const useAccountContext = () => React.useContext(AccountContext);