import React, { Component } from 'react';
import { NavBar, Icon,ListView,Tabs } from 'antd-mobile';
import {Julist} from '../components/Goodslist';
import api from '../api';

class Juhs extends Component {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
    this.state = {
        dataSource,
        _data:[],
        page:1,
        class:'全部',
        tabs:['全部','女装','男装','鞋靴','箱包','内衣配饰','手机数码','家电','珠宝配饰','美妆','家装','整车车品'],
        height: document.documentElement.clientHeight-138
      }
     
  }
  
  
  componentDidMount() {
    
    this.changeData(1,this.state.class)

  }
  changeData = (page,classes) => {
    let selfs = this;
    
    fetch(api.api_url+"/tbk/juhuasuan?page="+page+'&class='+classes)
      .then(function(response){
      return response.json()
    }).then(function(json) {
      if(json.result.total_item ===0){
        let result = [];
        selfs.setState({dataSource:selfs.state.dataSource.cloneWithRows(result)});
      }else{
        if(page===1){
          let data=[];
          let datas = data.concat(json.result.model_list.items);
          selfs.state._data = selfs.state._data.concat(json.result.model_list.items);
          selfs.setState({dataSource:selfs.state.dataSource.cloneWithRows(datas)})
        }else{
          selfs.state._data = selfs.state._data.concat(json.result.model_list.items);
          selfs.setState({dataSource:selfs.state.dataSource.cloneWithRows(selfs.state._data)})
        }
      }
    
     
    let pages = selfs.state.page+1
    selfs.setState({page:pages})
    })
  }
  
   classCallback=(key) =>{
    this.changeData(1,key)
  }
  classTabclick=(key) =>{
    let ss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({page:1,class:key,dataSource:ss,_data:[]})
  }
  priceChange(){
    return (
      <div style={{display: 'flex',height: '0.87rem',backgroundColor: '#fff',borderBottomWidth: 2,borderBottomColor: '#000'}}>
          <div style={{display: 'block',width: '100%',height: '100%',textAlign:'center',lineHeight: '0.87rem'}}>综合</div>
          <div style={{display: 'block',width: '100%',height: '100%',textAlign:'center',lineHeight: '0.87rem'}}>销量</div>
          <div style={{color:'#b22222',display: 'flex',width: '100%',height: '100%',textAlign:'center',lineHeight: '0.87rem'}}>
            价格
            <div>
              <div style={{color:'#b22222',height: '0.1rem'}}><Icon type='up' size="xs"/></div>
              <div style={{color:'#000',height: '0.1rem'}}><Icon type='down' size="xxs"/></div>
            </div>
          </div>
        </div>
    )
   }
  render() {
   let tabs = this.state.tabs
    
    return (
      <div>
        <NavBar>聚推荐</NavBar>
        <Tabs tabs={tabs} defaultActiveKey={this.state.class} onChange={this.classCallback} onTabClick={this.classTabclick} pageSize={5} renderTab={tab => <span>{tab}</span>}>
        </Tabs>
         <ListView
           dataSource={this.state.dataSource}
           renderRow={Julist}
           renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>{this.state.page===6?'已加载完.':'加载中...'}</div>)}
           onEndReachedThreshold={10}
           onEndReached={()=>{this.changeData(this.state.page,this.state.class)}}
           style={{
            height: this.state.height,
            overflow: 'auto',
          }}
        />

      </div>

    );
  }
}

export default Juhs;
