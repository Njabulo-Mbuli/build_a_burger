import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Aux from './hoc/Auxillary';
import Checkout from './containers/Checkout/Checkout';
import {Link,Switch,Route}  from 'react-router-dom';

function App() {
  return (
    <Aux>
      <Layout>
      	<Switch>
	      	<Route path="/" exact component={BurgerBuilder}/>
	      	<Route path="/checkout" component={Checkout}/>
          <Route path="/orders" exact component={Orders}/>
      	</Switch>
      </Layout>
    </Aux>
  );
}

export default App;
