import React, { Component } from 'react';
import bscScanLogo from '../images/bscscan.png';
import Iframe from 'react-iframe'

export default class Liquidity extends Component {
  intervalID;

  state = {
    current_price_usd: 0,
    holders: 0,
    balance_usd: 0,
    balance_wbnb: 0,
    market_cap: 0,
    circulating_supply: 0,
    total_supply: 0,
    symbol: "",
    exchange: "",
    pool_address: "",
    trades: 0,
    pair: "",

  }


  componentDidMount() {

    
 

    this.getData();
    var el = document.querySelectorAll('.sidebar__toggle--hide');
    for (var i = 0; i < el.length; i++) {
      el[i].addEventListener('click', function () {
        this.parentElement.classList.toggle('close');
      });
    }
  }
  componentWillUnmount() {
    clearTimeout(this.intervalID);
    var el = document.querySelectorAll('.sidebar__toggle--hide');
    for (var i = 0; i < el.length; i++) {
      el[i].removeEventListener('click', function () {
        this.parentElement.classList.toggle('close');
      });
    }
  }
  getRandomPrice() {
    return 10 + Math.round(Math.random() * 10000) / 100;
  }

  getData = () => {
    // this.setState({ data: [{"current_price_usd":"0.000000000000969","holders":1332,"balance_usd":3898,"balance_wbnb":"12.94","market_cap":44601,"circulating_supply":46027528650000000,"total_supply":100000000000000000}] });

    this.intervalID = setTimeout(this.getData.bind(this), 10000);


    fetch('https://api.astronomia.finance/basic/0x6AE97E66EeC23B4fDF77Cd4cA423ECfBD439c39e.json')
      .then(response => response.json())
      .then(data => {

        this.setState({
          balance_usd: (parseInt(data['liquidity_PriceUSD'])).toLocaleString('en-US', { maximumFractionDigits: 0, minimumFractionDigits: 0 }),
          balance_wbnb: (parseFloat(data['liquidity_PriceBNB'])).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }),
          market_cap: (parseInt(data['market_cap_PriceUSD'])).toLocaleString('en-US', { maximumFractionDigits: 0, minimumFractionDigits: 0 }),
          total_supply: '10.000.000',
          holders: data['holders'],
          symbol: data['symbol'],
          exchange: data['pairs'][0]['exchange'],
          pool_address: data['pairs'][0]['pool_address'],
          trades: data['pairs'][0]['trades'],
          pair: data['pairs'][0]['pair']
        });
        console.log('setState', this.state)
      });

  }

  convertPair(pair) {
    switch (pair) {
      case 'WBNB':
        pair = "BNB";
        break;
      default:
        break;
    }

    return pair;

  }


  render() {

 
    return (


      <div className="sidebar sidebar--left  open">
        <div className="sidebar__wrapper">
          <div className="sidebar__header">
            <div className="chart-sidebar">
              <div className="total__supplywrapper">
              <h3 class="head-title">Market Cap: </h3>
              <span className="text-muted small">(Includes locked, excludes burned)</span>
                  <p className="up pt-1 head__sum">${this.state.market_cap}</p>
               

                <div className="market-cap-wrap">
                <h4 class="head-title">Total Allocation</h4>
                <h3 class="head-title">Total Supply</h3>

                <p className="pt-1">{this.state.total_supply}</p>
                </div>

                <div className="market-cap-wrap">
                 <h3 class="head-title"> {this.state.symbol}/{this.convertPair(this.state.pair)} LP Holdings: </h3>

                  <p className="pt-1">
                  <a href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x6AE97E66EeC23B4fDF77Cd4cA423ECfBD439c39e" target="_blank" rel="noopener noreferrer">{this.state.exchange} </a>
                    <span> {this.state.balance_wbnb} {this.convertPair(this.state.pair)}</span> <span className="up">(${this.state.balance_usd})</span></p>
                </div>

                <div className="market-cap-wrap">
                <h3 class="head-title">Holders:</h3>
                  <p className="pt-1">{this.state.holders}</p>
                </div>
                {/*
                <div className="market-cap-wrap">
                  <p>Trades: <span className="text-muted"></span></p>
                  <p className="pt-1 up">{this.state.trades} </p>
                 </div>
                 */
                 }
 
                <div className="traders__wrapper">

                <h3 class="head-title">Block Explorer</h3>
                  <ul>



                    <li>
                      <a target="_blank" rel="noreferrer" href="https://bscscan.com/token/0x6ae97e66eec23b4fdf77cd4ca423ecfbd439c39e">
                        <img width="17px" height="17px" src={bscScanLogo} alt="trader-icon" />
                        HEXA Transactions
                      </a>
                    </li>
                    <li>
                      <a target="_blank" rel="noreferrer" href="https://bscscan.com/address/0x6ae97e66eec23b4fdf77cd4ca423ecfbd439c39e#code">
                        <img width="17px" height="17px" src={bscScanLogo} alt="trader-icon" />
                        HEXA Contract
                      </a>
                    </li>
                    <li>
                      <a target="_blank" rel="noreferrer" href="https://bscscan.com/token/0x6ae97e66eec23b4fdf77cd4ca423ecfbd439c39e#balances">
                        <img width="17px" height="17px" src={bscScanLogo} alt="trader-icon" />
                        HEXA Holders
                      </a>
                    </li>

                    <li>
                      <a target="_blank" rel="noreferrer" href="https://bscscan.com/token/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c?a=0x18e2758cC1e098760cceb32A90dBB272645AE726#tokenAnalytics">
                        <img width="17px" height="17px" src={bscScanLogo} alt="trader-icon" />
                        HEXA Chart
                      </a>
                    </li>

                    <li>
                      <a target="_blank" rel="noreferrer" href="https://bscscan.com/token/tokenholderchart/0x6ae97e66eec23b4fdf77cd4ca423ecfbd439c39e">
                        <img width="17px" height="17px" src={bscScanLogo} alt="trader-icon" />
                        HEXA Holder Chart
                      </a>
                    </li>

                    


                  </ul>
                </div>
 
<div className="ad"> 
                <Iframe
                frameBorder="0"
                data-aa="1735670" 
                src="//ad.a-ads.com/1735670?size=250x250" 
                style={{width:'250px', height:'250px', border:'0px', padding:'0', overflow:'hidden', backgroundColor: 'transparent'}}/> 
</div>
              </div>
            </div>
          </div>
        </div>
        <button className="sidebar__toggle sidebar__toggle--hide" type="button"></button>

      </div>

    );
  }
}

