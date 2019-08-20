import React, { Component } from 'react'
import { TabBar,Icon } from 'antd-mobile'
import TaoQiangGou from './views/TaoQiangGou'
import Juhs from './views/Juhs'
import Index from './views/Index'
class App extends Component {
  
    state = {
      selectedTab: 'index',
      hidden: false,
    }
  
  
  
  render() {
    return (
      <div style={{position: 'fixed', height: '100%', width: '100%',top: 0}}>
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
            });
          }}
          data-seed="index"
        >
          <Index/>
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
            });
          }}
          data-seed="taoqg"
        >
          <TaoQiangGou/>
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
            });
          }}
          data-seed="juhs"
        >
          <Juhs/>
        </TabBar.Item>
        
      </TabBar>
        
      </div>
    );
  }
}

export default App;
