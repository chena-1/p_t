import React from 'react';
import { BrowserRouter , Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import './styles/styles.css';
import Footer from './components/Footer'
//components
import ShopScreen from './screens/ShopScreen'
import Signin from './screens/SigninScreen';
import Signup from './screens/SignupScreen';
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
//admin
import ProductListScreen from './screens/ProductListScreen'
import ShoeListScreen from './screens/ShoeListScreen'

//user
import ProfileScreen from './screens/ProfileScreen'
import OrderScreen from './screens/OrderScreen'
import PaymentScreen from './screens/PaymentScreen'
function App() {
  return (
    <BrowserRouter>
      <Header/>

      <Switch>
            <Route path="/" exact component={ShopScreen}/>
            <Route path="/signin" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/product/:product" exact component={ProductScreen} />
            <Route path='/cart'  exact component={CartScreen} />
          
            {/**user */}
            <Route path="/profile" exact component={ProfileScreen} />
            <Route path="/order" exact component={OrderScreen} />
            <Route path="/payment" exact component={PaymentScreen} />
            {/**admin */}
        
            <Route path="/products/list/:page?" exact component={ProductListScreen} />
            <Route path="/shoes/list/:product" exact component={ShoeListScreen} />
        </Switch>
        <Footer/>
      </BrowserRouter>
   
  );
}

export default App;
