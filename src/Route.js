import React, { Component } from 'react';
import { Route,Switch } from 'react-router-dom'

import GoodsDetail from './views/GoodsDetail'
import Login from './views/Login'
import CouponSearch from './views/CouponSearch'
import TaoQiangGou from './views/TaoQiangGou'
import Juhs from './views/Juhs'
import App from './App'
class Routes extends Component {
  render() {
    return (
		<div>
		<Switch>
			<Route exact path="/" component={App}></Route>
			<Route path="/goodsdetail/:id" component={GoodsDetail}></Route>
			<Route path="/login" component={Login}></Route>
			<Route path="/search" component={CouponSearch}></Route>
			<Route path="/taoqg" component={TaoQiangGou}></Route>
			<Route path="/juhs" component={Juhs}></Route>
	   </Switch>
	 </div>
  	
	)
  }
}
export default Routes
