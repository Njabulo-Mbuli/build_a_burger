import React, { Component } from 'react';
import axiosInstance from 'axios';
import Spinner from '../../components/Layout/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import WithErrorHandler from '../../hoc/WithErrorHandler';

class Orders extends Component{
	state={
		orders:null,
		loading:true
	}
	componentDidMount(){
		axiosInstance.get('https://build-a-burger-52744.firebaseio.com/orders.json')
			.then(response=>{
				let orders=response.data;
				this.setState(()=>{
					return {orders:orders,loading:false}
				});
			})
			.catch(error=>{
				this.setState({loading:false});
			});
	}

	render(){
		let orders=null
		if(this.state.loading)
		 orders=<Spinner/>
		
		if(!this.state.loading && this.state.orders)
			orders=Object.keys(this.state.orders).map(key=>{
				return <Order key={key} order={this.state.orders[key]}/>
			});
		return(
			<div style={{display:"flex", flexFlow:"row wrap", width:"70%", margin:"0 auto"}}>
				{orders}
			</div>
		);
	}
}

export default WithErrorHandler(Orders,axiosInstance);