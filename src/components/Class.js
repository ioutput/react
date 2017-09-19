import React, { Component } from 'react'
import { NavBar, Icon,Carousel } from 'antd-mobile'

export default class Class extends Component {
  state = {
    data: ['', '', ''],
    initialHeight: 200,
  }
  componentDidMount() {
   
  }
  render() {
    return (
      <div>
        <NavBar leftContent="返回"
          mode="dark"
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >我你他</NavBar>
        <div style={{display: 'flex'}}>
            <div style={{flexDirection:'column',width:'20%'}}>
               <div style={{width: '100%',borderBottomWidth: 1,height: '50px',textAlign:'center',alignItems:'center'}}>123</div>
               <div>123</div>
            </div>
        </div>
        
      </div>
    );
  }
}

