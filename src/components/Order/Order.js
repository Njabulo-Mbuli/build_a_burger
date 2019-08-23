import React from 'react';

import './Order.css';

const Order = (props) =>{
	console.log("These are the order props: ",props);
	let ingredients=Object.keys(props.order.ingredients)
								.map((key,value)=>{
									return props.order.ingredients[key]>0 ? <li key={key}>{key+"  x"+props.order.ingredients[key]}</li> : null;
								});
	return(
		<div className="Order">
			<p>Customer: {props.order.customer.name}</p>
			<p>Ingredients: </p>
			<ul style={{listStyle:'none'}}>
				{ingredients}
		   </ul>
			<p>Price: <strong>R {(+props.order.price).toFixed(2)}</strong></p>
		</div>);
}
export default Order;