import React from 'react'

function Footer() {

return (

<div class="main__footer d-none d-lg-block">
    
    <div class="footer">
        <div class="footer__header">
            <div class="footer-meta"><span class="footer__copyright">© {new Date().getFullYear()} Hexachain Token BSC · HEXA · Version Beta 1.0</span>
 
            </div>
            </div>
            <div class="footer__links footer-links">
                <ul class="footer-links__list">
                    <li class="footer-links__item"><a href="https://app.astronomia.finance" target="_blank" rel="noopener noreferrer">App</a></li>
                    <li class="footer-links__item"><a href="https://astronomia.finance" target="_blank" rel="noopener noreferrer">Home</a></li>
                    <li class="footer-links__item"><a href="https://donations.astronomia.finance" target="_blank" rel="noopener noreferrer">Donations</a></li>
                    <li class="footer-links__item"><a href="https://astronomia.finance/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>
                    <li class="footer-links__item"><a href="https://astronomia.finance/privacy" target="_blank" rel="noopener noreferrer">Privacy</a></li>
                    <li class="footer-links__item"><a href="https://astronomia.finance/contact" target="_blank" rel="noopener noreferrer">Contact</a></li>
                    </ul>
                 </div>
               </div>
            </div>

)
}
export default Footer;