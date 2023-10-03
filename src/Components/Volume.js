import React, { Component } from 'react';
//import Header from './Volume/Header'
import BuySellCard from './BuySellCard'

export default class Volume extends Component {
    intervalID;

    state = {
        data: [],
        volumePrice:0,
        percent:0
    }

    componentDidMount() {
    this.getData();
    }

    componentWillUnmount() {
    /*
        stop getData() from continuing to run even
        after unmounting this component. Notice we are calling
        'clearTimeout()` here rather than `clearInterval()` as
        in the previous example.
    */
    clearTimeout(this.intervalID);
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
           volumePrice:(parseFloat(data['volume24hUSD'])).toLocaleString('en-US', {maximumFractionDigits: 2,minimumFractionDigits:2 }),
           percent:(parseFloat(data['volumeChange24h']*100)).toLocaleString('en-US', {maximumFractionDigits: 2,minimumFractionDigits:2 })
         });
         console.log('setState',this.state)
       });
   }


    render() {
      let sss = "sign-arr up";
      if(this.state.percent<0){
          sss = "sign-arr down";
      }
      return (
        <div className="sidebar sidebar--right  open">  
                
                <div className="sidebar__wrapper">
                  <div className="sidebar__header">
                    <div className="chart-sidebar">
                        <h3 className="head-title">Trading Volume, 24h</h3>
                        <div className="head__sum mt-1">
                              <span className="sign-sum">
                                <span className="sign">$</span>
                                <span className="number">{this.state.volumePrice}</span>
                              </span>
                              <span className={sss}>
                              {this.state.percent}%
                              </span>
                         </div>
                     </div>
                    <div className="chart-sidebar">                    
                        <div className="">
                          
                          <BuySellCard/>
                        </div>
                    </div>
                  </div>
                </div>
  
                <button className="sidebar__toggle sidebar__toggle--hide" type="button"></button>
                
              </div>
      );
    }
}
  