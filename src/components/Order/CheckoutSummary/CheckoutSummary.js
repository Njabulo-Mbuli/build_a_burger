import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../Layout/UI/Button/Button';
import './CheckoutSummary.css';

const CheckoutSummary=(props)=>{
	console.log("From the checkout summary props: ",props.ingredients);
	return(
		<div className={"CheckoutSummary"}>
			<h1>We hope it tastes good :)</h1>
			<div style={{width:'100%', margin:'auto'}}>
				<Burger ingredients={props.ingredients}/>
			</div>
			<Button 
				clicked={props.checkoutCancelled}
				classing="Danger">Cancel</Button>
			<Button 
				clicked={props.checkoutContinued}
				classing="Success">Continue</Button>
		</div>
	);
}
export default CheckoutSummary;