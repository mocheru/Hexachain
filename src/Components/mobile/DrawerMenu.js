import React, { Component } from 'react';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import astronLogo from '../../images/astronomia.png'


export default class DrawerMenu extends Component {


    render() {
      
        return (
       
            <>


            <Navbar role="mobile" className="drawer--menu"> 
 
 <div class=" header d-flex"> 
    <Navbar.Brand href="#home"><img src={astronLogo} alt="Astronomia"/> <Badge bg="warning" className="beta badge badge-warning badge-sm">BETA</Badge></Navbar.Brand> 
    
    <div className="mobile--menu ">
            
 
                <button className='mobile--btn wallet--btn' onClick={() => this.props.setShowMenu(false)}>
                  <i className="far fa-times"></i>
                </button>
    </div>
    </div>
    <Nav className="me-auto" style={{height: this.props.height, overflowY: 'auto'}}>
 

      <Nav.Link  className="text-white hover:underline mx-3" href="https://bscscan.com/token/0x6ae97e66eec23b4fdf77cd4ca423ecfbd439c39e" target="_blank" rel="nofollow">BSCScan</Nav.Link>
      <Nav.Link  className="text-white hover:underline mx-3" href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x6ae97e66eec23b4fdf77cd4ca423ecfbd439c39e" target="_blank" rel="nofollow">Buy</Nav.Link>
      <Nav.Link  className="text-white hover:underline mx-3" href="https://app.astronomia.finance" target="_blank" rel="nofollow">Charts</Nav.Link>
      <Nav.Link className="text-white hover:underline mx-3" href="https://docs.google.com/forms/d/e/1FAIpQLSe0GSmkkWaArYWz3IfkKVRzQ5-NHAM5kYTIpdi7KHigDFjeSA/viewform" target="_blank" rel="nofollow">Airdrops</Nav.Link>
      <Nav.Link  className="text-white hover:underline mx-3" href="https://donations.astronomia.finance" target="_blank" rel="nofollow">Donations</Nav.Link>
      <Nav.Link  className="text-white hover:underline mx-3" href="https://t.me/astronomiaBSC" target="_blank" rel="nofollow">Telegram</Nav.Link>
 
      <Nav.Link  className="text-white hover:underline mx-3" href="https://astronomia.finance" target="_blank" rel="noopener noreferrer">Home</Nav.Link>
      <Nav.Link  className="text-white hover:underline mx-3" href="https://donations.astronomia.finance" target="_blank" rel="noopener noreferrer">Donations</Nav.Link>
      <Nav.Link  className="text-white hover:underline mx-3" href="https://astronomia.finance/terms" target="_blank" rel="noopener noreferrer">Terms of Service</Nav.Link>
                   <Nav.Link  className="text-white hover:underline mx-3" href="https://astronomia.finance/privacy" target="_blank" rel="noopener noreferrer">Privacy</Nav.Link>
                   <Nav.Link  className="text-white hover:underline mx-3" href="https://astronomia.finance/contact" target="_blank" rel="noopener noreferrer">Contact</Nav.Link>


    </Nav>
 
        
 
            </Navbar>


            </>
        )
    }


}