import React from 'react';
import DummyData from '../DummyData/data';

const ProposalContext = React.createContext({
    proposals: [],
    updateproposals: () => null,
    getAllProposals: () => null,
})

export const ProposalProvider = ({children}) => {
    const [proposals, setProposals] = React.useState([])
    const [index, setIndex] = React.useState(5)

    const updateProposals = React.useCallback((data) => {
        data['id'] = index
        setIndex(index + 1)
        setProposals((prev) => [...prev, data])
    }, [index])

    const getAllProposals = React.useCallback(() => {
        setProposals(DummyData)
    }, [])

    return(
        <ProposalContext.Provider value={{proposals, updateProposals, getAllProposals}}>
            {children}
        </ProposalContext.Provider>
    )

};


export const useProposalContext = () => React.useContext(ProposalContext);