import React from 'react';
import './Input.css';

const Input = (props) =>{

	let inputElement = null;
	console.log("The element types we are getting",props.value);
	switch(props.elementType){
		case('input'):
			inputElement=<input 
						onChange={props.changed}
						className="InputElement" {...props.elementConfig}/>;
			break;
		case('textarea'):
			inputElement=<textarea 
							onChange={props.changed}
						className="InputElement" {...props.elementConfig}/>;
			break;
		case('select'):
			inputElement=<select 
							onChange={props.changed}
							className="InputElement">
							{
								props.elementConfig.options.map(option=>(
										<option
											key={option.value}>
											{option.displayValue}
										</option>
							))}
						 </select>
			break;
	}

	return(
		<div className="Input">
			<label className="Label">{props.label}</label>
			{inputElement}
		</div>
	);
}

export default Input;