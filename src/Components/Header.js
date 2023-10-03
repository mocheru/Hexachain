import React, { useState } from 'react'
import { useStore } from '../context/GlobalState'
import { Modal, Container, Navbar,  Badge } from 'react-bootstrap';
import metamaskIcon from '../images/metamask.png'
import { onConnected, getTokenBalane, CheckAllowance } from '../store/asyncActions'
import { setupBalance, setupTokenBalance } from '../store/actions'
import astronLogo from '../images/hexa2.png'
import astronIcon from '../images/hexa.png'
//import Omnibar from 'omnibar';
import {useMediaQuery} from 'react-responsive'
import DrawerMenu from './mobile/DrawerMenu'
//import { CSSTransitionGroup } from 'react-transition-group' // ES6

let Foo = ""
let Bar = ""
 
function inDev() { 

alert('In development!')

}
function Header() {
  const [{ accounts, network, tokenContract, splitAccountName }, dispatch] = useStore()
  const [connect, setConnect] = useState(false);
  const [networkName, setNetworkName] = useState()

  const [show, setShow] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const handleClose = () => {
    setShow(false)

  }
  const handleShow = () => {
    setShow(true)

  }
 

  const onConnect = async () => {
    if (network === 56) {
      setNetworkName("BSC")
      await onConnected(accounts, dispatch);
      await getTokenBalane(tokenContract, accounts, dispatch);
      await CheckAllowance(tokenContract, accounts, dispatch);
      setConnect(true)
    }
    else {
      setNetworkName("Wrong Network")
      setConnect(false)
      alert("Wrong Network! Change network to BSC Mainnet.")
    }

    handleClose()
  }
  const onDisconnet = () => {
    setConnect(false)
    dispatch(setupBalance(0))
    dispatch(setupTokenBalance(0))
    handleClose()
  }

 
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })


  return (
    <> 
    {isDesktopOrLaptop && <div className="top small">
      <div className="d-flex align-items-center justify-content-between py-2">
        <div className="flex align-items-center text-center">

           </div>
           <div className="flex items-center justify-center text-center">
            <a className="text-white hover:underline mx-3" href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x6ae97e66eec23b4fdf77cd4ca423ecfbd439c39e" target="_blank" rel="noreferrer">Buy</a>
            <a className="text-white hover:underline mx-3" href="https://app.astronomia.finance" target="_blank" rel="noreferrer">Charts</a>
            <a className="text-white hover:underline mx-3" href="https://docs.google.com/forms/d/e/1FAIpQLSe0GSmkkWaArYWz3IfkKVRzQ5-NHAM5kYTIpdi7KHigDFjeSA/viewform" target="_blank" rel="noreferrer">Airdrops</a>
            <a className="text-white hover:underline mx-3" href="https://donations.astronomia.finance" target="_blank" rel="noreferrer">Donations</a>
            <a className="text-white hover:underline mx-3" href="https://t.me/astronomiaBSC" target="_blank" rel="noreferrer">Telegram</a>
            </div>

    </div>
  </div> }

<Navbar className="header">  
 

      <Container className="d-flex justify-content-between" fluid>
 

        {isDesktopOrLaptop &&
        <Navbar.Brand href="/">
         <img src={astronLogo} alt=""/> <Badge bg="warning" className="beta badge badge-warning badge-sm">BETA</Badge>
        </Navbar.Brand>
          }
 

        { /*  
    <Nav className="flex-1" variant="pills" defaultActiveKey="/">
        <Nav.Link href="/">App</Nav.Link>
        <Nav.Link href="https://astronomia.finance" target="_blank">Home</Nav.Link>
 
  
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
 
        }
      </Nav>
<Omnibar placeholder="Enter keyword" extensions={[Foo, Bar]} />
      */ }

{isDesktopOrLaptop && <div className="header__omnibox">
          <div className="omnibox">
            <div className="omnibox__token omnibox-token">
              <div className="omnibox-token__image token-ico token-ico--network-bsc d-flex align-items-center">
                <img src={astronIcon} alt={astronIcon} style={{ width: '30px' }} />
              </div>
              <span className="omnibox-token__name" title="HEXA"><span className="title">HEXA</span><span className="network network--bsc">&nbsp;BSC</span></span>
             
              <div className="omnibox-token__data"><div className="omnibox-token__value"><span className="sign">$</span><span title="7.593680726582877e-13">0.0000000</span></div><div className="omnibox-token__delta"><sup className="delta delta--md sign-arr up" title="12.565661912461835">00.00%</sup></div></div>

               { /* <Omnibar onClick={inDev} placeholder="Search another Token..." className="omnibox omnisearch d-none d-lg-block" extensions={[Foo, Bar]}/> */ }
               <input onClick={inDev} placeholder="Search another Token..." className="form-control omnibox omnisearch d-none d-lg-block" extensions={[Foo, Bar]}/> 
               <div className="icon">
                <i className="fa fa-search"></i>
                </div>
            </div>
          </div>
        </div> }

        {isTabletOrMobile && <div className="mobile header__omnibox">
          <div className="omnibox">
            <div className="omnibox__token omnibox-token">
              <div className="omnibox-token__image token-ico token-ico--network-bsc d-flex align-items-center">
                <img src={astronIcon} alt={astronIcon} style={{ width: '30px' }} />
              </div>
              <span className="omnibox-token__name" title="HEXA"><span className="title">HEXA</span><span className="network network--bsc">&nbsp;BSC</span></span>
             
             { /*
              <div className="omnibox-token__data"><div className="omnibox-token__value"><span className="sign">$</span><span title="7.593680726582877e-13">0.0000000</span></div><div className="omnibox-token__delta"><sup className="delta delta--md sign-arr up" title="12.565661912461835">00.00%</sup></div></div>
               */
             } 
               <div className="icon">
                <i className="fa fa-search"></i>
                </div>
            </div>
          </div>
        </div> 
         
       }

 
              <div className="mobile--menu ">
 

        <div className="col-wallet-cs">
          {
            connect === true
              ?


              <div className="wallet d-flex align-items-center" style={{ color: 'white' }}>
                <span style={{ color: "#B8860B" }}>{networkName}</span>
                <span>
                  <button className="wallet--btn" onClick={handleShow} style={{
                    color: '#B8860B', backgroundColor: 'transparent',
                    border: '0px'
                  }}>
                    <i className="far fa-wallet"></i>
                  </button>
                </span>&nbsp;
                <span>{splitAccountName}</span>
              </div>
 
              :
              <div className="">


                <button className='wallet--btn' onClick={handleShow}>
                  <i className="far fa-wallet"></i>
                </button>
              </div>
          }
        </div>

        {isTabletOrMobile && <button className='mobile--btn wallet--btn' onClick={() => setShowMenu(!showMenu)}>
                  <i className="far fa-bars"></i>
                </button> }
                
        </div>

      </Container>

      <Modal show={show} dialogClassName={"my-modal provider-menu"} onHide={handleClose}>
  <Modal.Header closeButton style={{ backgroundColor: '#1E242C', color: 'white' }}>
    Select Wallet Provider
  </Modal.Header>
  <Modal.Body style={{ backgroundColor: '#1E242C', color: 'white' }}>
    <button className="provider" onClick={onConnect} style={{ border: '0px', backgroundColor: '#455161', color: 'white' }}>
      <span><img src={metamaskIcon} alt={metamaskIcon} width='30px' height='30px' /></span>
      <span style={{ marginLeft: '30px', color: 'white' }}>MetaMask</span>
      {
        connect === true ?
          <span style={{ marginLeft: '10px', fontSize: '12px', color: 'white' }}>{splitAccountName}</span> : null
      }
    </button>
  </Modal.Body>
  <Modal.Footer style={{ backgroundColor: '#1E242C', color: 'white' }}>
    {
      connect === false ?
      <div className="disclaimer small text-center">By connecting wallet you agree to the <span onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer' }}>Terms of Service</span> and <span onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer' }}>Privacy Policy</span></div>
        :
        null
    }
    {
      connect === true ?
        <button type="button" className="btn btn-danger" onClick={onDisconnet}>
          Disconnect
        </button>
        :
        null
    }
  </Modal.Footer>
</Modal>





{ /* 
      <CSSTransitionGroup
  transitionName="example"
  transitionAppear={true}
  transitionAppearTimeout={400}
  transitionEnterTimeout={400}
  transitionLeaveTimeout={400}
>
      {showMenu === true && <DrawerMenu setShowMenu={setShowMenu}/>}
      </CSSTransitionGroup>
*/ }
{showMenu === true && <DrawerMenu setShowMenu={setShowMenu}/>}
    </Navbar>
    </>
  )
}
export default Header;
