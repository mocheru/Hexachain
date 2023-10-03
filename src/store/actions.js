
export const getSplitAccountName = (bal)=> {
    return {
        type: 'GET_SPLIT_ACCOUNT_NAME',
        payload: bal
    };
}

export const getAllowance = (bal)=> {
    return {
        type: 'GET_ALLOWANCE',
        payload: bal
    };
}

export const setupEstBuyToken = (bal)=> {
    return {
        type: 'SETUP_EST_BUY_TOKEN',
        payload: bal
    };
}

export const setupEstSellToken = (bal)=> {
    return {
        type: 'SETUP_EST_SELL_TOKEN',
        payload: bal
    };
}

export const setupTokenBalance = (bal)=> {
    return {
        type: 'SETUP_TOKEN_BALANCE',
        payload: bal
    };
}

export const setupBalance = (bal)=> {
    return {
        type: 'SETUP_BALANCE',
        payload: bal
    };
}

export const setupContract = (transaction)=> {
    return {
        type: 'SETUP_CONTRACT',
        payload: transaction
    };
}

export const setupTokenContract = (transaction)=> {
    return {
        type: 'SETUP_TOKEN_CONTRACT',
        payload: transaction
    };
}

export const setupNetwork = (network)=> {
    return {
        type: 'SETUP_NETWORK',
        payload: network
    };
}

export const setupWeb3 = (web3) => {
    return {
        type: 'SETUP_WEB3',
        payload: web3
    };
}

export const addEthereumAccounts = (accounts) => {
    return {
        type: 'ADD_ETHEREUM_ACCOUNTS',
        payload: accounts
    };
}

export const web3LoadingError = (errorMessage) => {
    return {
        type: 'WEB3_LOADING_ERROR',
        errorMessage: errorMessage
    };
}