import React from 'react';
import './SideDrawer.css';
import Logo from '../../Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../Layout/UI/Backdrop/Backdrop';
import Auxillary from '../../../hoc/Auxillary';

const SideDrawer = (props) =>{
	let attachedClasses = ["SideDrawer","Open"]
	if(!props.show){
		attachedClasses=["SideDrawer","Closed"];
	}
	return(
		<Auxillary>
		<Backdrop show={props.show} hideModal={props.toggleView}/>
		<div className={attachedClasses.join(" ")}>
			<Logo height="11%"/>
			<nav>
			<NavigationItems/>
			</nav>
		</div>
		</Auxillary>
	);
}

export default SideDrawer;