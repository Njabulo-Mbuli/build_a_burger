import React from 'react';
import burgerLogo from '../assets/images/burger-logo.png';
import './Logo.css';
import Radium from 'radium';

const Logo = (props) =>(
	<div className="Logo" style={{height:props.height}}>
		<img src={burgerLogo} alt='my burger'/>
	</div>
);

export default Radium(Logo);