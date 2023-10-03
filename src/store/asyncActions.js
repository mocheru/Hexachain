import {
    getSplitAccountName,
    getAllowance,
    setupEstBuyToken,
    setupEstSellToken,
    setupWeb3,
    setupNetwork,
    setupContract,
    setupTokenContract,
    setupBalance,
    setupTokenBalance,
    addEthereumAccounts,
    web3LoadingError,
  } from "./actions";
  import Web3 from "web3";
  import { ROUTER_ABI, ROUTER_ADDRESS } from "../contract/Router";
  import { TOKEN_ABI, TOKEN_ADDRESS } from "../contract/TokenContract";
  
  let web3;
  
  export const loadBlockchain = async (dispatch) => {
    try {
      console.log("Web3 = ", Web3);
      console.log("Web3.givenProvider = ", Web3.givenProvider);
  
      if (Web3.givenProvider) {
        web3 = new Web3(Web3.givenProvider);
        await Web3.givenProvider.enable();
        dispatch(setupWeb3(web3));
  
        const accounts = await web3.eth.getAccounts();
        dispatch(addEthereumAccounts(accounts));
        await web3.eth.net.getId().then((res) => dispatch(setupNetwork(res)));
  
        const contract = new web3.eth.Contract(ROUTER_ABI, ROUTER_ADDRESS);
        dispatch(setupContract(contract));
  
        const tokenContract = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);
        dispatch(setupTokenContract(tokenContract));
        console.log(tokenContract.methods);
  
        dispatch(
          getSplitAccountName(
            String(accounts[0]).slice(0, 5) +
              "..." +
              String(accounts[0]).slice(38, String(accounts[0]).length)
          )
        );
  
        window.ethereum.on("accountsChanged", async function (accounts) {
          dispatch(addEthereumAccounts(accounts));
          web3.eth.getBalance(accounts[0], function (err, res) {
            let balance = web3.utils.fromWei(res, "ether");
            dispatch(setupBalance(balance));
          });
          const receipt = await tokenContract.methods
            .balanceOf(accounts[0])
            .call({ from: accounts[0] });
          dispatch(setupTokenBalance(receipt));
  
          dispatch(
            getSplitAccountName(
              String(accounts[0]).slice(0, 5) +
                "..." +
                String(accounts[0]).slice(38, String(accounts[0]).length)
            )
          );
        });
      } else {
        dispatch(
          web3LoadingError(
            "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"
          )
        );
      }
    } catch (error) {
      console.log("Error in loading Web3 = ", error);
      if (error.code === 4001) {
        dispatch(web3LoadingError(error.message));
      }
    }
  };
  
  export const onConnected = async (accounts, dispatch) => {
    web3.eth.getBalance(accounts[0], function (err, res) {
      let balance = web3.utils.fromWei(res, "ether");
      dispatch(setupBalance(balance));
    });
  };
  
  export const getTokenBalane = async (contract, accounts, dispatch) => {
    const receipt = await contract.methods.balanceOf(accounts[0]).call({
      from: accounts[0],
    });
    console.log("TOken Balance = ", receipt);
    dispatch(setupTokenBalance(receipt));
  };
  
  export const CheckAllowance = async (contract, accounts, dispatch) => {
    const receipt = await contract.methods
      .allowance(accounts[0], ROUTER_ADDRESS)
      .call({ from: accounts[0] });
    dispatch(getAllowance(receipt));
    console.log("Allowance = ", receipt);
  };
  
  export const Approving = async (contract, accounts, transaction, dispatch) => {
    await contract.methods
      .approve(ROUTER_ADDRESS, transaction)
      .send({ from: accounts[0] });
    const updateAllowance = await contract.methods
      .allowance(accounts[0], ROUTER_ADDRESS)
      .call({ from: accounts[0] });
    dispatch(getAllowance(updateAllowance));
    console.log("Updated Allowance = ", updateAllowance);
  };
  
  export const getEstimatedAmount = async (contract, accounts, transaction, dispatch) => {
    if (
      transaction.value !== null &&
      transaction.value !== undefined &&
      transaction.value !== isNaN
    ) {
      const receipt = await contract.methods
        .getAmountsOut(
          String(web3.utils.toWei(String(transaction.value), "ether")),
          transaction.path
        )
        .call({ from: accounts[0] });
      dispatch(setupEstBuyToken(receipt[1]));
      console.log(receipt[1]);
    }
  };
  
  export const getEstimatedSellAmount = async (
    contract,
    accounts,
    transaction,
    dispatch
  ) => {
    if (
      transaction.value !== null &&
      transaction.value !== undefined &&
      transaction.value !== isNaN
    ) {
      const receipt = await contract.methods
        .getAmountsOut(
          String(web3.utils.toWei(String(transaction.value), "gwei")),
          transaction.path
        )
        .call({ from: accounts[0] });
      dispatch(setupEstSellToken(String(receipt[1])));
      console.log(receipt[1]);
    }
  };
  
  export const SwapBNBToToken = async (contract, accounts, transaction, dispatch) => {
    console.log("before transaction");
    const receipt = await contract.methods
      .swapExactETHForTokens(
        transaction.amountOutMin,
        transaction.path,
        transaction.to,
        transaction.deadline
      )
      .send({
        from: accounts[0],
        value: web3.utils.toHex(
          web3.utils.toWei(String(transaction.value))
        ),
      });
    console.log("after  transaction ", receipt);
  };
  
  export const SwapTokenToBNB = async (contract, accounts, transaction, dispatch) => {
    console.log("before transaction");
    const receipt = await contract.methods
      .swapExactTokensForETHSupportingFeeOnTransferTokens(
        String(web3.utils.toWei(String(transaction.amountIn), "gwei")),
        transaction.amountOutMin,
        transaction.path,
        transaction.to,
        transaction.deadline
      )
      .send({
        from: accounts[0],
      });
    console.log("after  transaction ", receipt);
  };
  