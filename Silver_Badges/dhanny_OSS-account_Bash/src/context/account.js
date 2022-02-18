import React from 'react';
import { useNavigate } from 'react-router-dom';


const AccountContext = React.createContext({
    accounts: [],
    selectedAccount: null,
    addAccounts: () => null,
    addselectedAccount: () => null,
    signOutAccount: () => null
})

export const AccountProvider = ({children}) => {
    const navigate = useNavigate()
    const [accounts, setAccounts] = React.useState([])
    const [selectedAccount, setSelectedAccount] = React.useState({})

    const addAccounts = React.useCallback((data) => {
        setAccounts(data)
    }, [])


    const addselectedAccount = React.useCallback((data) => {
        setSelectedAccount(data)
    }, [])

    const signOutAccount = React.useCallback(() => {
        setSelectedAccount({})
        navigate('/')
    }, [navigate])
    return(
        <AccountContext.Provider value={{accounts, selectedAccount, addAccounts, addselectedAccount, signOutAccount}}>
            {children}
        </AccountContext.Provider>
    )

};


export const useAccountContext = () => React.useContext(AccountContext);