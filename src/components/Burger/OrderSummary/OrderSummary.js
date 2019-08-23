import React, { Component } from 'react';
import Auxillary from '../../../hoc/Auxillary';
import Button from '../../Layout/UI/Button/Button';

class OrderSummary extends Component{
	//This could be a functional component doesnt need to be a class
	componentWillUpdate(){
		console.log("order summary will update");
	}
	render(){
		let ingredientSummary=null;
		if (this.props.ingredients) {
			 ingredientSummary = Object.keys( this.props.ingredients )
				.map(igKey=>{
					return <li key={igKey}>
								<span style={{textTransform:'capitalize'}}>{igKey}</span>:<strong>{this.props.ingredients[igKey]}</strong>
							</li>
			});
		}

		return(
		<Auxillary>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p>Price: <strong>R {this.props.totalPrice.toFixed(2)}</strong></p>
			<p>Continue to checkout?</p>
			<Button classing={'Danger'} clicked={this.props.hideModal}>CANCEL</Button>
			<Button classing={"Success"} clicked={this.props.continuePurchase}>CONTINUE</Button>
		</Auxillary>
		);
	}
}

export default OrderSummary;