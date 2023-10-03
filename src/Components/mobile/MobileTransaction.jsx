import * as React from 'react';
import axios from 'axios'; 
import {Table, Button, Spinner} from 'react-bootstrap';
import Loader from '../Loader';
import Moment from 'react-moment';
 
function toPlainString(num) {
    return (''+ +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
      function(a,b,c,d,e) {
        return e < 0
          ? b + '0.' + Array(1-e-c.length).join(0) + c + d
          : b + c + d + Array(e-d.length+1).join(0);
      });
  }

 
export default class MobileTransaction extends React.PureComponent { 
	constructor(props) {
        super(props);
        this.state = {
            dataArr: [], 
            loading: true,
            items: 6,
            loadSpinner: false,
        };
        
      }
	async componentDidUpdate(prevProps, prevState, snapshot){
		
		//this.fetchData()
        
	}
	async componentDidMount() {
		this.fetchData()	      
	}

	componentWillUnmount() {
		clearTimeout(this.intervalID);
	}

  loadMore() { 

    this.setState({
      loadSpinner: <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
      />
    })
 
    setTimeout(function() {
      this.setState({
        loadSpinner: false,
        items: this.state.items + 5
      })
  }.bind(this), 1000);
 

 
  }

 
  

 

    async fetchData(){
        this.intervalID = setTimeout(this.fetchData.bind(this), 10000);
        
         
            let data = await axios.get(`https://api.astronomia.finance/basic/last_tx.json`)
          
            await this.sleep(5000);
            this.setState({
                dataArr: data.data,
                loading: false,
            });        

            console.log(this.state.dataArr)
       
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

	render() {

      
		return (


	<> 

<div class="dashboard--table table">
  <div class="tr th">
    <div class="td flex-grow-2 type d-none d-lg-block">
      #
    </div>
    <div class="td tokens justify-content-start">
     Tokens
    </div>
    <div class="td price justify-content-start">
      Traded
    </div>
    <div class="td priceToken justify-content-start d-none d-lg-block">
      Price/Token
    </div>
    <div class="td time justify-content-start">
      Time
    </div>
    <div class="td tx justify-content-start d-none d-lg-block">
      TX
    </div>
  </div>

<div className="scrollableTable"> 
              {this.state.loading ? <Loader text="Loading Transactions..."/> : 
               this.state.dataArr.slice(0, this.state.items).map((feature, index)=> {

          return  <div key={index} className="tr text-muted">

                  <div key={'td1'+index} className="td type d-none d-lg-block">
            
             <span className={feature.status=='BUY'?'up':'down'}> 
             <span><i className={feature.status=='BUY'?'fas fa-caret-up':'fas fa-caret-down'}></i></span> 
             <span>{feature.status}</span>
             { /* <span><Moment className="text-muted small" fromNow parse="YYYY-MM-DD HH:mm:ss">{feature.time[0]} {feature.time[1]}</Moment></span> */ }
             </span>
           
                  </div> 
                  <div key={'td2'+index} className="td tokens">
                   <span> 
                            <span className={feature.status=='BUY'?'up':'down'}>{feature.token}</span>        
                            <span>{feature.coin}</span>
                    </span>
                  </div>
                  <div key={'td3'+index} className="td price">
                  <span> 
                            <span className={feature.status=='BUY'?'up':'down'}>${feature.price}</span>
                            <span>{feature.price_bottom} BNB</span>
                 </span> 
                  </div>
                  <div key={'td4'+index} className="td priceToken d-none d-lg-block">
                  <span> 
                            <span className={feature.status=='BUY'?'up':'down'}>${feature.price_token}</span>
                            <span>Pc v2</span>
                   </span> 
                  </div>
                  <div key={'td5'+index} className="td time">
                  <span> 
                                <span>{feature.time[0]}</span>
                                <span>{feature.time[1]}</span>
                  </span> 
                  </div>
                  <div key={'td6'+index} className="td tx d-none d-lg-block">
                    <span>
                      
                      <span className="cut-text">{feature.hash.split('https://bscscan.com/tx/')}</span> 
                      <span><a className="track-value" target="_blank" href={feature.hash}>Track</a></span>

                      </span>
                  </div>
                </div>
        })
     } 
 </div>
 

</div>

<div className="d-flex justify-content-center mt-10 align-center">  
 
<a class="btn btn-progress load" onClick={() => this.loadMore()}>{this.state.loadSpinner} Load more trades</a>
   </div>
 

{ /* 

     <Table striped hover>
            <thead>
              <tr>
                <th scope="col" className="d-none d-lg-block">#</th>
                <th scope="col">Tokens</th>
                <th scope="col">Price</th>v
                <th scope="col">Price/Token</th>
                <th scope="col">Time</th>
                <th scope="col">Tx</th>
              </tr>
            </thead>
            <tbody>
            
            {this.state.loading ?  <th scope="row" colSpan="12"><Loader text="Loading Transactions..."/></th> : 
               this.state.dataArr.slice(0, this.state.items).map((feature, index)=> {
                  return <tr key={index}>
                        <th key={'td1'+index}  scope="row" className="d-none d-lg-block">                         
                            <p className={feature.status=='BUY'?'value-up':'value-down'}><span>{feature.status}</span></p>
                        </th>
                        <td key={'td2'+index}>
                        <p className={feature.status=='BUY'?'value-up':'value-down'}>
                            <span>{feature.token}</span>                            
                            <span>{feature.coin}</span>
                        </p>
                        </td>
                        <td key={'td3'+index}>
                        <p className={feature.status=='BUY'?'value-up':'value-down'}>
                            <span>${feature.price}</span>
                            <span>{feature.price_bottom} BNB</span>
                        </p>
                            
                        </td>
                        <td key={'td4'+index}>
                        <p className={feature.status=='BUY'?'value-up':'value-down'}>
                            <span>${feature.price_token}</span>
                            <span>Pc v2</span>
                        </p>
                        </td>
                        <td key={'td5'+index}>
                            <p className={feature.status=='BUY'?'value-up':'value-down'}>
                                <span>{feature.time[1]}</span>
                            </p>
                        </td>
                        <td key={'td6'+index}><a className="track-value" target="_blank" href={feature.hash}>Track</a></td>
                </tr>
               })
            }        
              
            </tbody>
            
          </Table>
*/
}
         
      
 
          </>
		);
	}
}
