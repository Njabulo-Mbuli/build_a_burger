import React, {Component} from 'react';
import './Layout.css';
import Aux from '../../hoc/Auxillary';
import Toolbar from '../Navigation/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
 	state={
		showSideDrawer:false
	}

	sideDrawerClosedHandler= () =>{
		this.setState((prevState)=>{
			return	{showSideDrawer:!prevState.showSideDrawer}
		});
	}
	render(){
	return <Aux>
				<Toolbar toggleView={this.sideDrawerClosedHandler}/>
				<SideDrawer show={this.state.showSideDrawer}
					toggleView={this.sideDrawerClosedHandler}/>
				<main className="Content">
					{this.props.children}
				</main>
			</Aux>
	}
}
export default Layout;