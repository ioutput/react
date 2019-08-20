import React, { Component } from 'react';
import {ListView,SearchBar } from 'antd-mobile';
import {Indexlist} from '../components/Goodslist';
import api from '../api';

class CouponSearch extends Component {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
    this.state = {
        dataSource,
        _data:[],
        page:1,
        class:'',
        height: document.documentElement.clientHeight-138
      }
     
  }
  
  changeData = (page,classes) => {
    let selfs = this;
    if(page ===6){
      return false;
    }
    fetch(api.api_url+"/tbk/items?page="+page+'&class='+classes)
      .then(function(response){
      return response.json()
    }).then(function(json) {
      if(json.total_results ===0){
        let result = [];
        selfs.setState({dataSource:selfs.state.dataSource.cloneWithRows(result)});
      }else{
        if(page===1){
          let data=[];
          let datas = data.concat(json.results.tbk_coupon);
          selfs.state._data = selfs.state._data.concat(json.results.tbk_coupon);
          selfs.setState({dataSource:selfs.state.dataSource.cloneWithRows(datas)})
        }else{
          selfs.state._data = selfs.state._data.concat(json.results.tbk_coupon);
          selfs.setState({dataSource:selfs.state.dataSource.cloneWithRows(selfs.state._data)})
        }
      }
    
     
    let pages = selfs.state.page+1
    selfs.setState({page:pages})
    })
  }
  
  searchSubmit=() =>{
    this.changeData(1,this.state.class)
  }
  onChange=(value)=>{
    this.setState({class:value})
  }
   
  render() {
    let dataSource = this.state.dataSource
    let page = this.state.page
    return (
      <div>
        <SearchBar 
          placeholder="输入你想要的商品"
          focused={true}
          onCancel={() =>this.props.history.goBack()}
          onSubmit={() => this.searchSubmit()}
          onBlur={() => this.searchSubmit()}
          onChange={this.onChange}
          cancelText="取消"
          autoFocus />
         <ListView
           dataSource={dataSource}
           renderRow={Indexlist}
           renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>{page===6?'已加载完.':'加载中...'}</div>)}
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

export default CouponSearch;
