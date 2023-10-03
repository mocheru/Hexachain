const reducer = (state, action) => {
    switch(action.type) {
      
      case 'GET_SPLIT_ACCOUNT_NAME':
        return {
          ...state,
          splitAccountName: action.payload
      }

      case 'GET_ALLOWANCE':
        return {
          ...state,
          approved: action.payload
      }

      case 'SETUP_EST_BUY_TOKEN':
        return {
          ...state,
          estBuyToken: action.payload
      }

      case 'SETUP_EST_SELL_TOKEN':
        return {
          ...state,
          estSellToken: action.payload
      }

      case 'SETUP_TOKEN_BALANCE':
        return {
          ...state,
          tokenBalance: action.payload
      }

      case 'SETUP_BALANCE':
        return {
          ...state,
          balance: action.payload
      }

      case 'SETUP_CONTRACT':
        return {
          ...state,
          routerContract: action.payload
      }
      
      case 'SETUP_TOKEN_CONTRACT':
        return {
          ...state,
          tokenContract: action.payload
      }

      case 'SETUP_NETWORK':
        return {
          ...state,
          network: action.payload
      }
      case 'SETUP_WEB3':
        return {
          ...state,
          web3: action.payload,
          web3LoadingErrorMessage: "",
          web3Loadded: true
        }
      
      case 'ADD_ETHEREUM_ACCOUNTS':
        return {
          ...state,
          accounts: action.payload
        }
      case 'WEB3_LOADING_ERROR':
        return {
          ...state,
          web3LoadingErrorMessage: action.errorMessage,
          web3Loadded: false
        }
      default:
        return state;
    }
  }
  export default reducer;