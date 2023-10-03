import React, { useState } from 'react'
import BuySellCard from '../BuySellCard'
import { TVChartContainer } from '../TVChartContainer/index';
import MobileLiquidity from "./MobileLiquidity";
import Transaction from "../Transaction";
import { Navbar, Nav } from 'react-bootstrap';
import useWindowDimensions from "../../Helpers.js"



function BodyMobile() {



    const { height } = useWindowDimensions();

    const [symbol ] = useState('0xac51066d7bec65dc4589368da368b212745d63e8')

    const [view, setView] = useState('charts')
    //const [active, setActive] = useState('active')

    let newHeight = height-130
    let chartHeight = newHeight-59
 
    return (
        <div className="dashboard--mobile dashboard__wrapper" style={{ height: newHeight }}>
            <div className="dashboard--desktop">

                <main className="dashboard__main">
                    <div class="content-main-wrap">
                        <div class="dashboard__table">
                            <div class="dashboard__custom__table p-0">

                                {view === 'charts' && <div className="mobile--chart"><TVChartContainer height={chartHeight} symbol={symbol} /></div>}

                                {view === 'transactions' && <div className="mobile--trades"><Transaction height={newHeight}/></div>}

                                {view === 'liquidity' && <div className="mobile--liquidity"><MobileLiquidity /></div>}

                                {view === 'swap' && <div className="mobile--swap p-2"><BuySellCard /></div>}



                            </div>
                        </div>

                    </div>
                </main>

            </div>

            <Navbar className="dashboard--mobile" fixed="bottom">
                <Nav defaultActiveKey="#charts" className="me-auto">
                    <Nav.Link href="#charts" onClick={() => setView('charts')} className={view ? 'charts' : 'active'}><i className="fal fa-chart-bar"></i> <span>Chart</span></Nav.Link>
                    <Nav.Link href="#transactions" onClick={() => setView('transactions')} className={view ? 'transactions' : 'active'}><i className="fal fa-fire"></i> <span>Trades</span></Nav.Link>
                    <Nav.Link href="#liquidity" onClick={() => setView('liquidity')} className={view ? 'liquidity' : 'active'}><i className="fal fa-coins"></i> <span>Liquidity</span></Nav.Link>
                    <Nav.Link href="#swap" onClick={() => setView('swap')} className={view ? 'swap' : 'active'}><i className="fal fa-retweet-alt"></i> <span>Swap</span></Nav.Link>
                </Nav>
            </Navbar>

        </div>
    )
}
export default BodyMobile;