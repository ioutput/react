import React, { Component } from 'react';
import { Route,BrowserRouter } from 'react-router-dom'
import GoodsDetail from './components/GoodsDetail'
import Login from './components/Login'
import Class from './components/Class'
import CouponSearch from './components/CouponSearch'
import TaoQiangGou from './components/TaoQiangGou'
import Juhs from './components/Juhs'
import App from './App'
class Routes extends Component {
  render() {
    return (
	<BrowserRouter>
     <div>
	  <Route exact path="/" component={App}></Route>
	   <Route path="/goodsdetail/:id" component={GoodsDetail}></Route>
	   <Route path="/login" component={Login}></Route>
	   <Route path="/search" component={CouponSearch}></Route>
	   <Route path="/taoqg" component={TaoQiangGou}></Route>
	   <Route path="/juhs" component={Juhs}></Route>
	   <Route path="/class" component={Class}></Route>
	 </div>
  	</BrowserRouter>
	)
  }
}
export default Routes
