import React, { Component } from 'react';
import { NavBar, Icon,ListView,Tabs } from 'antd-mobile';
import {Couponlist} from '../components/Goodslist';
import api from '../api';

class TaoQiangGou extends Component {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
    this.state = {
        dataSource,
        _data:[],
        page:1,
        class:'11',
        tabs:['00','08','10','11','12','13','14','15','17','19','21','22','23'],
        height: document.documentElement.clientHeight-138
      }
     
  }
  
  componentDidCatch() {
    let d = new Date();let h = d.getHours();let ss;
    if(this.state.tabs.indexOf(h)>=0){
      this.setState({class:h})
    }else{
      for(let i=0;i<this.state.tabs.length;i++){
        if(parseInt(h)>parseInt(this.state.tabs[i])){
          ss = this.state.tabs[i-1]
        }
      }
    }
    this.setState({class:ss})
  }
  componentDidMount() {
    
    this.changeData(1,this.state.class)

  }
  changeData = (page,classes) => {
    let selfs = this;
    
    fetch(api.api_url+"/tbk/taoqianggou?page="+page+'&time='+classes)
      .then(function(response){
      return response.json()
    }).then(function(json) {
      if(json.total_results ===0){
        let result = [];
        selfs.setState({dataSource:selfs.state.dataSource.cloneWithRows(result)});
      }else{
        if(page===1){
          let data=[];
          let datas = data.concat(json.results.results);
          selfs.state._data = selfs.state._data.concat(json.results.results);
          selfs.setState({dataSource:selfs.state.dataSource.cloneWithRows(datas)})
        }else{
          selfs.state._data = selfs.state._data.concat(json.results.results);
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
        <NavBar>抢推荐</NavBar>
        <Tabs tabs={tabs} defaultActiveKey={this.state.class} onChange={this.classCallback} onTabClick={this.classTabclick} pageSize={5} renderTab={tab => <span>{`${tab}:00`}</span>}>
        </Tabs>
        
        
         <ListView
           dataSource={this.state.dataSource}
           renderRow={Couponlist}
           renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>{this.state.page===6?'已加载完.':'加载中...'}</div>)}
           onEndReachedThreshold={0}
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

export default TaoQiangGou;
