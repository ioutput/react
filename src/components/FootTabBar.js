import React, { Component } from 'react'
import { TabBar,Icon } from 'antd-mobile'
class FootTabBar extends Component {
  
    state = {
      selectedTab: 'index',
      hidden: false,
    }
  
    componentDidMount() {
    if(this.props.location.pathname.indexOf('taoqg')>=0){
      this.setState({selectedTab:'taoqg'})
    }else if(this.props.location.pathname.indexOf('juhs')>=0){
      this.setState({selectedTab:'juhs'})
    }
    else{
      this.setState({selectedTab:'index'})
    }
  }
  
  render() {
    return (
      <div style={{clear:'both'}}>
        <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        tabBarPosition="bottom"
        hidden={this.state.hidden}
      >
        <TabBar.Item
          title="券推荐"
          key="券推荐"
          icon={<Icon type="check" size="md" />
          }
          selectedIcon={<Icon type="check" size="md" />
          }
          selected={this.state.selectedTab === 'index'}
          onPress={() => {
            this.setState({
              selectedTab: 'index',
            });this.props.history.push('/');
          }}
          data-seed="index"
        >
          
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon type="up" size="md" />}
          selectedIcon={<Icon type="up" size="md" />}
          title="淘抢购"
          key="淘抢购"
          selected={this.state.selectedTab === 'taoqg'}
          onPress={() => {
            this.setState({
              selectedTab: 'taoqg',
            });this.props.history.push({pathname:'taoqg'});
          }}
          data-seed="taoqg"
        >
          
        </TabBar.Item>

       <TabBar.Item
          icon={<Icon type="ellipsis" size="md" />}
          selectedIcon={<Icon type="ellipsis" size="md" />}
          title="聚划算"
          key="聚划算"
          selected={this.state.selectedTab === 'juhs'}
          onPress={() => {
            this.setState({
              selectedTab: 'juhs',
            });this.props.history.push({pathname:'juhs'});
          }}
          data-seed="juhs"
        >
          
        </TabBar.Item>
        
      </TabBar>
        
      </div>
    );
  }
}

export default FootTabBar;
