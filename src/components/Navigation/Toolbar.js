import React from 'react';
import './Toolbar.css';
import Logo from '../Logo';
import NavigationItems from './NavigationItems/NavigationItems'
import Radium from 'radium';
import DrawerToggle from './DrawerToggle'

const Toolbar = (props) =>(
	<header className="Toolbar">
		<DrawerToggle toggleView={props.toggleView}/>
		<Logo height="80%"/>
		<nav>
			<NavigationItems mediaType="DesktopOnly"/>
		</nav>
	</header>
);

export default Radium(Toolbar);