import React from 'react';
import Aux from '../../hoc/Auxillary';
import './DrawerToggle.css';
const DrawerToggle = (props) =>(
	<Aux>
		<div 
			className={"DrawerToggle"}
			onClick={props.toggleView}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</Aux>
);

export default DrawerToggle;