import React, { useEffect,createContext, useReducer, useContext } from 'react';
import AppReducer from '../store/AppReducer';
import { loadBlockchain } from '../store/asyncActions';
// Initial state
const initialState = {
  web3: null,
  accounts: [],
  web3LoadingErrorMessage:"",
  web3Loadded: false,
  network: "",
  routerContract : "",
  balance: 0,
  tokenContract : "",
  tokenBalance : 0,
  estBuyToken : 0,
  estSellToken : 0,
  approved : 0,
  splitAccountName : "" 
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    useEffect(()=> {
        loadBlockchain(dispatch);
    },[])    
    

    return (<GlobalContext.Provider value={[state,dispatch]}>
                {children}
            </GlobalContext.Provider>);
}

export const useStore = () => useContext(GlobalContext);