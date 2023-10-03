import React, { useState } from 'react'
import { TVChartContainer } from '../Components/TVChartContainer/index';
import Liquidity from "./Liquidity";
import Volume from "./Volume";
import Transaction from "./Transaction";

function Body() {



    const [symbol ] = useState('0xac51066d7bec65dc4589368da368b212745d63e8')
    return (
        <div className="dashboard__wrapper">
            <div className="dashboard--desktop">
                <aside className="dashboard__sidebar dashboard__sidebar--left">
                    <Liquidity />
                </aside>



                <main className="dashboard__main">
                    <div class="content-main-wrap">
                        <div class="dashboard__table">
                            <div class="dashboard__custom__table">

                                <TVChartContainer symbol={symbol} />
                            </div>
                        </div>
                        <div class="dashboard__table">
                            <div class="dashboard__table">
                                <div class="dashboard__custom__table">
                                    <Transaction />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <aside class="dashboard__sidebar dashboard__sidebar--right d-none d-lg-block">
                    <Volume />
                </aside>
            </div>



        </div>
    )
}
export default Body;