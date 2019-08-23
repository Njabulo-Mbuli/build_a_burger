import React, {Component,Fragment} from 'react'
import Button from '../../../components/Layout/UI/Button/Button';
import axiosInstance from '../../../axios-order';

import Spinner from '../../../components/Layout/UI/Spinner/Spinner';
import './ContactData.css';
import Input from '../../../components/Layout/UI/Input/Input';
class ContactData extends Component{
	state={
		orderForm:{
					name:{
						elementType:'input',
						elementConfig:{
								type:'text',
								placeholder:'Your Name'
							},
						value:''
						},
					street:{
						elementType:'input',
						elementConfig:{
								type:'text',
								placeholder:'Street'
							},
						value:''
						},
					zipCode:{
						elementType:'input',
						elementConfig:{
								type:'text',
								placeholder:'ZIP Code'
							},
						value:''
						},
					country:{
						elementType:'input',
						elementConfig:{
								type:'text',
								placeholder:'Country'
							},
						value:''
						},
					email:{
						elementType:'input',
						elementConfig:{
								type:'email',
								placeholder:'Your E-Mail'
							},
						value:''
						},
					deliveryMethod:{
						elementType:'select',
						elementConfig:{
								options:[
									{value:'fastest',displayValue:'Fastest'},
									{value:'cheapest',displayValue:'Cheapest'}
								]
							},
						value:''
						}
			},
		loading:false
	}

	orderHandler =(event)=>{
		event.preventDefault();

		this.setState(()=>{
			return {loading:true}
		});
		
		const formData={};

		for(let formElementIdentifier in this.state.orderForm){
			formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
		}

		const order ={
			ingredients:this.props.ingredients,
			price:this.props.totalPrice,
			customer:formData
		}
		console.log("this is the formData :",this.state.orderForm);
		if(order.price>0)
		axiosInstance.post('/orders.json',order)
			.then(response=>{
				this.setState(()=>{
					this.props.history.push('/');
					return {loading:false}
				});
			})
			.catch(error=>{
				console.log("Some kind of error: ",error);
				this.setState(()=>{
					return {loading:false}
				});
			});
		else
			this.setState(()=>{
				return {loading:false}
			});
	}	

	inputChangedHandler=(event,inputIdentifier)=>{
		const updatedOrderForm={...this.state.orderForm}
		
		 const updatedFormElement ={...updatedOrderForm[inputIdentifier]}
		 
		 updatedFormElement.value=event.target.value;
		 updatedOrderForm[inputIdentifier]=updatedFormElement;
		 console.log("look here man: ",inputIdentifier);

		this.setState(()=>{
			return {orderForm:updatedOrderForm}
		});
	}
	render(){
		let formElementsArray = [];

		for(let key in this.state.orderForm){
			formElementsArray.push({
					id:key,
					config:this.state.orderForm[key]
				});
		}

		console.log("This is the formElementsArray: ",formElementsArray);

		let form =<Spinner/>

		if(!this.state.loading){
			form=(<Fragment>
				<h4>Enter your Contact Data</h4>
				<form onSubmit={this.orderHandler}>
					{

						formElementsArray.map(formElement=>{
						console.log("This is the form formElement id: ",formElement.id);
						return(<Input
							key={formElement.id} 
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							changed={(event)=>{this.inputChangedHandler(event,formElement.id)}}/>);
						
					})}
					<Button classing="Success">Order</Button>
				</form>
				</Fragment>);
		}
		return(
			<div className="ContactData">
				{form}
			</div>
		);
	}
}

export default ContactData;