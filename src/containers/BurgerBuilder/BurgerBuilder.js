import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Layout/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios-order';
import Spinner from '../../components/Layout/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler';

const INGREDIENT_PRICES = {
	salad:0.5,
	cheese:0.4,
	meat:1.3,
	bacon:0.7
}

class BurgerBuilder extends Component{
	state={
		ingredients:null,
		totalPrice:4,
		purchasable:false,
		purchasing:false,
		loading:false,
		error:false
	}

	componentDidMount(){
		axiosInstance.get("/ingredients.json")
			.then(response=>{
				if(response)
				this.setState(()=>{
					return{ingredients:response.data}
				})
			}).catch(error=>{
				this.setState(()=>{
					return {error:true}
				});
		});
	}

	addIngredientHandler=(type)=>{

		const oldCount=this.state.ingredients[type];
		const updatedCount = oldCount+1;
		const updatedIngredients = {
			...this.state.ingredients
		};

		updatedIngredients[type]=updatedCount;

		const priceAddition =INGREDIENT_PRICES[type];
		const oldPrice= this.state.totalPrice;
		const newPrice=oldPrice+priceAddition;

		this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler=(type)=>{
	
		if(this.state.ingredients[type]<=0){
			return;
		}

		const updatedCount = this.state.ingredients[type]-1;
		const updatedIngredients = {
			...this.state.ingredients
		};

		updatedIngredients[type]=updatedCount;

		const priceDeduction =INGREDIENT_PRICES[type];
		const oldPrice= this.state.totalPrice;
		const newPrice=oldPrice-priceDeduction;
		
		this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	updatePurchaseState(ingredients){
		
		let sum=Object.keys(ingredients)
		.map(igKey=>{
			return ingredients[igKey]
		}).reduce((sum,el)=>{
			return sum+el;
		},0);

		
		this.setState({purchasable:sum>=1});
	}

	purchaseHandler = () => {
		this.setState({purchasing:!this.state.purchasing});
	}

	purchaseContinueHandler = () =>{
		//You can use the following to pass on data
		//to a component...
		const queryParams=[];

		queryParams.push('price='+this.state.totalPrice);
		for(let i in this.state.ingredients){
			queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
		}
		const queryString =queryParams.join('&');
		this.props.history.push({
			pathname:'/checkout',
			search: '?' + queryString
		});
	}

	render(){
		let orderSummary=null;

		const disableInfo={
			...this.state.ingredients 
		};
		
		for(let key in disableInfo){
			disableInfo[key]=disableInfo[key]<=0;
		}

		let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

		if (this.state.ingredients) {
			 burger=(
				<Aux>
					<Burger ingredients={this.state.ingredients}/> 
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientDeducted={this.removeIngredientHandler}
						disabled={disableInfo}
						price={this.state.totalPrice}
						purchasable={this.state.purchasable}
						order={this.purchaseHandler}
						style={{height:"100vh"}}/>
				</Aux>
						);
			 orderSummary = <OrderSummary 
						ingredients={this.state.ingredients}
						totalPrice={this.state.totalPrice}
						hideModal={this.purchaseHandler}
						continuePurchase={this.purchaseContinueHandler}/>
		}
		if(this.state.loading){
			orderSummary = <Spinner />;
		}
		return(

			<Aux>
				
				<Modal show={this.state.purchasing} hideModal={this.purchaseHandler}>
					{orderSummary}
				</Modal>

				{burger}
			</Aux>

		);
	}
}

export default WithErrorHandler(BurgerBuilder,axiosInstance);