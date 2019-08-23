import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Spinner from '../../components/Layout/UI/Spinner/Spinner';
import ContactData from './ContactData/ContactData';
//import modal

class Checkout extends Component{
	state={
		ingredients:null,
		totalPrice:0
	}

	componentWillMount(){
		const query = new URLSearchParams(this.props.location.search);
		const ingredients={};
		for(let param of query.entries()){
			if(param[0]==="price")
			this.setState(()=>{
				return {totalPrice:param[1]}
			});
			else
			ingredients[param[0]] = +param[1];
		}
		this.setState(()=>{
			return {ingredients:ingredients}
		});
	}

	checkoutCancelledHandler=()=>{
		this.props.history.goBack();
	}

	checkoutContinuedHandler=()=>{
		this.props.history.replace('/checkout/contact-data');
	}

	render(){
		console.log("from checkout :",this.state.ingredients);
		let checkoutBurger=<Spinner/>;
		if(this.state.ingredients){
			checkoutBurger=<CheckoutSummary 
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
					ingredients={this.state.ingredients}/>;
		}
		return(
			<div>
				{checkoutBurger}
				<Route 
					path={this.props.match.path+'/contact-data'} 
					render={(props)=>(<ContactData 
									ingredients={this.state.ingredients}
									totalPrice={this.state.totalPrice} {...props}/>)}/>
			</div>
		);
	}
}

export default Checkout;