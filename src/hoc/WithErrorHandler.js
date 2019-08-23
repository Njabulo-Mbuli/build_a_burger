import React, {Component} from 'react';
import Modal from '../components/Layout/UI/Modal/Modal';
import Aux from './Auxillary';

const WithErrorHandler = (WrappedComponent,axios) =>{

	return class extends Component{

	state={
		error:null
	}

	componentWillMount(){
		axios.interceptors.request.use(req=>{
			this.setState(()=>{
				return {error:null}
			});
			return req;
		});

		axios.interceptors.response.use(res=> res, error =>{
			this.setState(()=>{
				return {error:error}
			});

		});
	}	
		
		errorConfirmedHander=()=>{
			this.setState({error:null});
		}

		render(){
		return(
			<Aux>
				<Modal show={this.state.error}
					hideModal={this.errorConfirmedHander}>
					<h1>Ooops!! Something went wrong...</h1>
					<h4 style={{color:"red"}}> Error: {this.state.error ? this.state.error.message : null}</h4>
					<h4 style={{color:"blue"}}>Would you like to try again?</h4>
				</Modal>
				<WrappedComponent {...this.props} />
			</Aux>
		);
	}
	}
}

export default WithErrorHandler;