import React, { Component } from 'react';
import './Modal.css';
import Auxillary from '../../../../hoc/Auxillary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
	
	shouldComponentUpdate(nextProps,nextState){
		return nextProps.show!==this.props.show || nextProps.children!==this.props.children;
	}

	componentWillUpdate(){
		console.log("component modal will update");
	}
	render(){
		return	<Auxillary>
			<Backdrop show={this.props.show}
				hideModal={this.props.hideModal}/>
			<div
				style={{transform:this.props.show?'translateY(-10vh)':'translateY(-120vh)',
						opacity:this.props.show?'1':'0'}} 
				className="Modal">
				{this.props.children}
			</div>

			</Auxillary>
	}
}

export default Modal;