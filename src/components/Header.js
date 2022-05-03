import React from 'react';
import './Header.css';
import image1 from '../images/1.jpg';
import image2 from '../images/2.jpg';
import image3 from '../images/3.jpg';

function Header(props) { 
  return(
    <div>
      <ul className="header">
        <li className="header_tag_left">Airline Search</li>
        <li className="header_tag_left">Price Tracking</li>
        <li className="header_tag_left">Support</li>
        <div className="header_items_right">
          <li className="header_tag_right">Register</li>
          <li className="header_tag_right">Log in</li>
        </div>
      </ul>
      <ImageContainer/>
    </div>
  );
}

function ImageContainer(props) {
  return (
    <div id="container">
      <div id="photo">
        < img src={image1} alt="" />
        < img src={image2} alt="" />
        < img src={image3} alt="" />
        < img src={image1} alt="" />
      </div>
    </div>
  );
}

export default Header;