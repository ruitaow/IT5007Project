import React from 'react';
import './Footer.css';


function Footer(props) {
    return(
        <div className='footer'>
            <div className='copyright'>
                <p>A warm helper accompanying with your smooth travel experience.</p>
                <p>Copyright © 2022 EasyFlight | Design: Lin Zichao & Wang Ruitao</p>
                <p>SoC, National University of Singapore</p>
            </div>
            <h4>CONTACT US</h4>
            <p>wangruitao24@outlook.com</p>
            <p>OR</p>
            <p>joe.linzc@gmail.com</p>
        </div>
    );
}

export default Footer;