import { ClickAwayListener } from '@material-ui/core';
import React from 'react'
import { Navbar, ButtonGroup, Button } from 'react-bootstrap';


function BuySellButtons() {

return (

<Navbar className="dashboard--mobile" fixed="bottom">
<ButtonGroup aria-label="BuySell" fixed="bottom">
  <Button className="buy_button btn-progress--cell percentBtn" variant="success">Buy</Button>
  <Button className="sell_button btn-progress--cell percentBtn" variant="danger">Sell</Button>
</ButtonGroup>
</Navbar>

)
}
export default BuySellButtons;