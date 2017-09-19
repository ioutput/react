import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Tabs,Icon,NavBar,List,InputItem } from 'antd-mobile'

const TabPane = Tabs.TabPane;
class Login extends Component {
  
    state = {
      selectedTab: 'index',
      hidden: false,
    }
  
  
  
  render() {

    return (
      <div>
      <NavBar leftContent="返回"
          mode="dark"
          onLeftClick={() => this.props.history.goBack()}
          rightContent={
            <Link to="register" style={{color:'#fff'}}>注册</Link>
          }
        >账号登录</NavBar>
        <Tabs defaultActiveKey="1" >
      <TabPane tab="账号登录" key="1">
        <List>
          <InputItem
            clear
            placeholder="auto focus in Alipay client"
            autoFocus
          >账号</InputItem>
          <InputItem
            clear
            placeholder="click the button below to focus"
            
          >密码</InputItem>
         
        </List>
      </TabPane>
      <TabPane tab="短信登录" key="2">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
          Content of Second Tab
        </div>
      </TabPane>
      
    </Tabs>
        
      </div>
    );
  }
}

export default Login;
