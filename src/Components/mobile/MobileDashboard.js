import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
 


const mobileChart = () => {
    return alert('mobileChart')
}

const mobileLiquidity = () => {
    return alert('mobileLiquidity') 
}


function MobileDashboard() {

return (

<Navbar className="dashboard--mobile" fixed="bottom">
<Nav className="me-auto">
        <Nav.Link href="#home" className="active" onClick={mobileChart}><i className="fal fa-chart-bar"></i> <span>Chart</span></Nav.Link>
        <Nav.Link href="#home" onClick={mobileLiquidity}><i className="fal fa-coins"></i> <span>Liquidity</span></Nav.Link>
        <Nav.Link href="#home"><i className="fal fa-fire"></i> <span>Transactions</span></Nav.Link>
        <Nav.Link href="#home"><i className="fal fa-retweet-alt"></i> <span>Swap</span></Nav.Link>
</Nav>
</Navbar>

)
}
export default MobileDashboard;  