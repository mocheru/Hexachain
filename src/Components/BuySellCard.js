import React, { useState } from 'react'
import { useStore } from '../context/GlobalState'
import bnbIcon from '../images/bnbLogo.png'
import astronIcon from '../images/hexa.png'
import { bnb, bnbAddress } from '../TokenData/Info'
import { astronName, astronAddress } from '../TokenData/Info'
import { SwapBNBToToken, SwapTokenToBNB, getEstimatedAmount, getEstimatedSellAmount, Approving } from '../store/asyncActions'
import Loader from './Loader';

function BuySellCard() {
    //const [defaultSymbol, setDefaultSymbol] = useState("BUSD")
    const [{ balance, tokenBalance, routerContract, accounts, estBuyToken, estSellToken, approved, tokenContract }, dispatch] = useStore()

    const [tokenAmount0, setTokenAmount0] = useState(0)
    const [tokenAmount1, setTokenAmount1] = useState(0)

    const [isTransactionInProcess, setTransactionInprocess] = useState(false);
    //const [buySell, setBuySell] = React.useState(false)


    const handlePercent = (per, id, amount) => {
        if (id === "auto0") {
            setTokenAmount0(document.getElementById(id).value = parseFloat((amount * per) / 100).toFixed(3))
            try {
                const newTransaction = {
                    path: [
                        bnbAddress,
                        astronAddress
                    ],
                    value: (amount * per) / 100
                }
                getEstimatedAmount(routerContract, accounts, newTransaction, dispatch)

            } catch (error) {
                console.log("error trax = ", error);

            }
        }
        else {
            setTokenAmount1(document.getElementById(id).value = parseFloat((amount * per) / 100).toFixed(3))
            try {
                const newTransaction = {
                    path: [
                        astronAddress,
                        bnbAddress
                    ],
                    value: Number(parseFloat((amount * per) / 100).toFixed(2))
                }
                getEstimatedSellAmount(routerContract, accounts, newTransaction, dispatch)

            } catch (error) {
                console.log("error trax = ", error);

            }
        }

    }

    const onBuy = async (e) => {
        e.preventDefault();
        if (document.getElementById('buyBtn').value === "Insufficient Balance") {
            alert("Insufficient Balance")
        }
        else {
            try {
                setTransactionInprocess(true)
                const newTransaction = {
                    amountOutMin: 0,
                    path: [
                        bnbAddress,
                        astronAddress
                    ],
                    to: accounts[0],
                    deadline: Math.floor(Date.now() / 1000) + 60 * 20,
                    value: tokenAmount0
                }
                await SwapBNBToToken(routerContract, accounts, newTransaction, dispatch);
                setTransactionInprocess(false);
                document.getElementById('auto0').value = ''
                window.location.reload()
            } catch (error) {
                console.log("error trax = ", error);
                setTransactionInprocess(false);
            }
        }
    }


    const onSell = async (e) => {
        e.preventDefault();
        if (document.getElementById('sellBtn').value === "Insufficient Balance") {
            alert("Insufficient Balance")
        }
        else if (document.getElementById('sellBtn').value === "Approve") {
            try {
                setTransactionInprocess(true)
                const newTransaction = String('115792089237316195423570985008687907853269984665640564039457584007913129639935')
                await Approving(tokenContract, accounts, newTransaction, dispatch);
                setTransactionInprocess(false);
                window.location.reload()
            } catch (error) {
                console.log("error trax = ", error);
                setTransactionInprocess(false);
            }
        }
        else if (document.getElementById('sellBtn').value === "Sell") {
            try {
                setTransactionInprocess(true)
                const newTransaction = {
                    amountIn: tokenAmount1,
                    amountOutMin: 0,
                    path: [
                        astronAddress,
                        bnbAddress
                    ],
                    to: accounts[0],
                    deadline: Math.floor(Date.now() / 1000) + 60 * 20,
                }
                await SwapTokenToBNB(routerContract, accounts, newTransaction, dispatch);
                setTransactionInprocess(false);
                window.location.reload()
            } catch (error) {
                console.log("error trax = ", error);
                setTransactionInprocess(false);
            }
        }

    }

    const textHandle = () => {
        if (document.getElementById('sellBtn').value === "Insufficient Balance") {
            document.getElementById('sellBtn').value = "Insufficient Balance";
        }
        else if (Number(parseFloat(approved / Math.pow(10, 18))) >= Number(tokenAmount1)) {
            document.getElementById('sellBtn').value = "Sell";
        }
        else {
            document.getElementById('sellBtn').value = "Approve";
        }
    }





    return (
        <div className="tradeform">
            <div className="text-center">
 
                {isTransactionInProcess && <Loader text="Connecting to Wallet..."/>}
            </div>
            <div className="tradeform-field__progress mb-3">
                <ul>
                    <li><button className="percentBtn btn-progress--cell disabled">Auto</button></li>
                    <li><button className="percentBtn btn-progress--cell disabled">Pancake V1</button></li>
                    <li><button className="percentBtn btn-progress--cell active">Pancake V2</button></li>
                    
                    
                </ul>
            </div>


                <div className=''>

                    {/* BUY  */}
                    <div className='tradeform-tab__content'>
                        <div className="text-center"><p className="tradeform-field--header d-block mt-0 mb-3">Buy</p></div>
                        <div className="tradeform-field__header d-flex align-items-center justify-content-between mx-1">
                            <label className="tradeform-field__title mb-0">From</label>
                            <label className="tradeform-field__rates text-end mb-0">{String(parseFloat(balance).toFixed(2)).slice(0, 13)} <span className="sign ms-1"> BNB</span></label>
                        </div>
                        <div className='input-group form-group mt-2 d-block mb-0'>
                            <div className='tradeform-combo tradeform-combo--selector'>
                                <div className='tradeform-combo__token'>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text hv-29313a" style={{
                                            color: 'white',
                                            minWidth: '100px', maxWidth: '130px', border: '0', fontSize: '12px', padding: '7px'
                                        }}>
                                            <img src={bnbIcon} alt={bnbIcon} style={{ width: '25px', height: '25px', borderRadius: '50%' }} />
                                            &nbsp; {bnb} &nbsp;
                                            {/* 
                                            <button className="btn-arr-fix hv-29313a" style={{ border:'0px',height: 'auto'}}>
                                                <i className="arrow down"></i>
                                            </button>
                                        }
                                        */}
                                        </span>
                                    </div>
                                </div>
                                <div className='tradeform-combo__query'>
                                    <input type="number" id="auto0" className="form-control tradeform-field__input" required placeholder="0.000"
                                        onChange={(e) => {
                                            e.preventDefault()

                                            if (e.target.value !== 0 && e.target.value !== undefined) {

                                                setTokenAmount0(e.target.value);

                                                try {
                                                    const newTransaction = {
                                                        path: [
                                                            bnbAddress,
                                                            astronAddress
                                                        ],
                                                        value: e.target.value
                                                    }
                                                    getEstimatedAmount(routerContract, accounts, newTransaction, dispatch)

                                                } catch (error) {
                                                    console.log("error trax = ", error);

                                                }
                                            }
                                            if (e.target.value === 0) {
                                                document.getElementById('auto1').value = 0
                                            }
                                        }} />
                                </div>
                            </div>
                        </div>


                        <div className="tradeform-field__progress">
                            <ul>
                                <li>
                                    <button className="btn-progress--cell percentBtn" type="button" onClick={() => handlePercent(25, 'auto0', balance)}>25%</button>
                                </li>
                                <li>
                                    <button className="btn-progress--cell percentBtn" type="button" onClick={() => handlePercent(50, 'auto0', balance)}>50%</button>
                                </li>
                                <li>
                                    <button className="btn-progress--cell percentBtn" type="button" onClick={() => handlePercent(75, 'auto0', balance)}>75%</button>
                                </li>
                                <li>
                                    <button className="btn-progress--cell percentBtn" type="button" onClick={() => handlePercent(100, 'auto0', balance)}>100%</button>
                                </li>
                            </ul>
                        </div>

                        <p className='tradeform-field__title d-block mt-4'>To</p>
                        <div className='input-group form-group mt-2 d-block mb-0'>
                            <div className='tradeform-combo tradeform-combo--selector'>
                                <div className='tradeform-combo__token'>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text hv-29313a" style={{
                                            color: 'white',
                                            minWidth: '100px', maxWidth: '130px', border: '0', fontSize: '12px', padding: '7px'
                                        }}>

                                            <img src={astronIcon} alt={astronIcon} style={{ width: '25px', height: '25px', borderRadius: '50%' }} />
                                            &nbsp; {astronName} &nbsp;


                                            <button className='btn-arr-fix hv-29313a' style={{ border: '0px', height: 'auto' }}>
                                                <i className="arrow down"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div className='tradeform-combo__query'>
                                    <input type="number" disabled="true" id="auto1" value={parseFloat(estBuyToken / Math.pow(10, 9)).toFixed(3)} className="form-control tradeform-field__input" required placeholder="0.0" />
                                </div>
                            </div>

                        </div>

                        <div className='tradeform-field__button'>
                            <input className="tradeform-field--button buy--btn" type="submit" value={Number(balance) >= Number(tokenAmount0) ? "Buy" : "Insufficient Balance"}
                                id="buyBtn" onClick={onBuy} />


                        </div>


                    </div>




                    {/* SELL*/}
                    <div className='tradeform-tab__content mt-30'>

                        <div className='text-center'><p className='tradeform-field--header d-block mt-0  mb-3'>Sell</p></div>
                        <div className="tradeform-field__header d-flex align-items-center justify-content-between mx-1">
                            <label className='tradeform-field__title mb-0'>From</label>
                            <label className='tradeform-field__rates text-end mb-0'>{String(parseFloat(tokenBalance / Math.pow(10, 9)).toFixed(2)).slice(0, 13)}&nbsp;ASTRON</label>
                        </div>

                        <div className='input-group form-group mt-2 d-block mb-0'>
                            <div className='tradeform-combo tradeform-combo--selector'>
                                <div className='tradeform-combo__token'>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text hv-29313a" style={{
                                            color: 'white',
                                            minWidth: '100px', maxWidth: '130px', border: '0', fontSize: '12px', padding: '7px'
                                        }}>

                                            <img src={astronIcon} alt={astronIcon} style={{ width: '25px', height: '25px', borderRadius: '50%' }} />
                                            &nbsp; {astronName} &nbsp;

                                            <button className="btn-arr-fix hv-29313a" style={{ border: '0px', height: 'auto' }}>
                                                <i className="arrow down"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div className='tradeform-combo__query'>
                                    <input type="number" id="auto2" className="form-control tradeform-field__input" required placeholder="0.0"
                                        onChange={(e) => {
                                            e.preventDefault()
                                            if (e.target.value !== 0 && e.target.value !== undefined) {
                                                setTokenAmount1(e.target.value);

                                                try {
                                                    const newTransaction = {
                                                        path: [
                                                            astronAddress,
                                                            bnbAddress
                                                        ],
                                                        value: e.target.value
                                                    }
                                                    getEstimatedSellAmount(routerContract, accounts, newTransaction, dispatch)

                                                } catch (error) {
                                                    console.log("error trax = ", error);

                                                }
                                            }
                                            if (e.target.value === 0) {
                                                document.getElementById('auto3').value = 0
                                            }
                                        }} />
                                </div>
                            </div>
                        </div>

                        <div className='tradeform-field__progress'>
                            <ul>
                                <li>
                                    <button className="percentBtn btn-progress--cell" onClick={() => handlePercent(25, 'auto2', parseFloat(tokenBalance / Math.pow(10, 9)).toFixed(4))}>25%</button>
                                </li>
                                <li>
                                    <button className="percentBtn btn-progress--cell" onClick={() => handlePercent(50, 'auto2', parseFloat(tokenBalance / Math.pow(10, 9)).toFixed(4))}>50%</button>
                                </li>
                                <li>
                                    <button className="percentBtn btn-progress--cell" onClick={() => handlePercent(75, 'auto2', parseFloat(tokenBalance / Math.pow(10, 9)).toFixed(4))}>75%</button>
                                </li>
                                <li>
                                    <button className="percentBtn btn-progress--cell" onClick={() => handlePercent(100, 'auto2', parseFloat(tokenBalance / Math.pow(10, 9)).toFixed(4))}>100%</button>
                                </li>
                            </ul>
                        </div>

                        <p className='tradeform-field__title d-block mt-4 mb-0'>To</p>
                        <div className='input-group form-group mt-2 d-block'>
                            <div className='tradeform-combo tradeform-combo--selector'>
                                <div className='tradeform-combo__token'>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text hv-29313a" style={{
                                            color: 'white',
                                            minWidth: '100px', maxWidth: '130px', border: '0', fontSize: '12px', padding: '7px'
                                        }}>
                                            <img src={bnbIcon} alt={bnbIcon} style={{ width: '25px', height: '25px', borderRadius: '50%' }} />
                                            &nbsp; {bnb} &nbsp;
                                            {/* 
                                            <button style={{backgroundColor:'#455161', border:'0px', height:'auto'}}>
                                                <i className="arrow down"></i>
                                            </button>
                                        }
                                        */}
                                        </span>
                                    </div>
                                </div>
                                <div className='tradeform-combo__query'>
                                    <input type="number" disabled="true" id="auto3" value={parseFloat(estSellToken / Math.pow(10, 18)).toFixed(10)} className="form-control tradeform-field__input" required placeholder="0.0" />
                                </div>
                            </div>

                        </div>
                        <div className='tradeform-field__button'>

                            <input className='tradeform-field--button sell--btn' type="submit" value={Number(tokenAmount1) <= Number(parseFloat(tokenBalance / Math.pow(10, 9)).toFixed(4)) ? "Sell" : "Insufficient Balance"} id="sellBtn"
                                onClick={onSell} onMouseMove={textHandle} />

                        </div>

                    </div>



                    <style>
                        {`
                input[type='number']::placeholder
                {   
                 text-align: right;      /* for Chrome, Firefox, Opera */
                }
                :-ms-input-placeholder
                { 
                    text-align: right;      /* for IE 10-11 */
                }
                ::-webkit-input-placeholder
                {    
                    text-align: right;      /* for IE Edge */
                }

                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }

                /* Firefox */
                input[type=number] {
                -moz-appearance: textfield;
                }

                .arrow {
                    border:5px solid white;
                    border-width: 0 3px 3px 0;
                    display: inline-block;
                    padding: 3px;

                }
                .up {
                    transform: rotate(-135deg);
                    -webkit-transform: rotate(-135deg);
                }
                  
                .down {
                    transform: rotate(45deg);
                    -webkit-transform: rotate(45deg);
                }

                .percentBtn{
                    background-color: #455161;
                    color: white;
                    border: 0px;
                    border-radius: 5px;
                    margin-left: 2px;
                    width : 0%;
                    font-size: auto;
                }

                .flex-container{
                    display: flex;
                }

                

                `}
                    </style>

                </div>

            </div>
            )
}
            export default BuySellCard;