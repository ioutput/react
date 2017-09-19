import React, { Component } from 'react';
import {ListView,SearchBar } from 'antd-mobile';
import { Link } from 'react-router-dom';
import FootTabBar from './FootTabBar';
import datajson from './searchjuan.json';
const width = document.body.clientWidth;
const height = window.screen.availHeight; 
class CouponSearch extends Component {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
    this.state = {
        dataSource,
        _data:[],
        page:1,
        class:'',
        
      }
     
  }
  componentDidMount() {
    let data=[];
    let datas = data.concat(datajson.results.tbk_coupon);
    this.setState({dataSource:this.state.dataSource.cloneWithRows(datas)})
    //this.changeData(this.state.page,this.state.class)

  }
  changeData = (page,classes) => {
    let selfs = this;
    if(page ==6){
      return false;
    }
    fetch("")
      .then(function(response){
      return response.json()
    }).then(function(json) {
    if(page==1){
      let data=[];
      let datas = data.concat(json.results.tbk_coupon);
      selfs.state._data = selfs.state._data.concat(json.results.tbk_coupon);
      selfs.setState({dataSource:selfs.state.dataSource.cloneWithRows(datas)})
    }else{
      selfs.state._data = selfs.state._data.concat(json.results.tbk_coupon);
      selfs.setState({dataSource:selfs.state.dataSource.cloneWithRows(selfs.state._data)})
    }
     
    let pages = selfs.state.page+1
    selfs.setState({page:pages})
    })
  }
  goodslist = (item)=>{
      return (<Link to={{pathname:`goodsdetail/${item.num_iid}`,params:{data:item}}}  style={{backgroundColor: '#fff',width: width/2,float:'left',color:'rgb(102, 102, 102)',fontSize: '12px',overflow: 'hidden'  }}>
            <div><img style={{width: width/2-4,height: width/2-4}} src={item.pict_url}/></div>
            <div style={{width:width/2-8,overflow:'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap'}}>
            {item.user_type==1?<img style={{width:'20px',height:'12px'}} src="http://oss1.lanlanlife.com/f87493c5f309d8b282476c232df6bd4b_26x26.png"/>:''}{item.title}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',padding:'0.1rem',fontSize: '11px'}}>
              <span style={{color:'#b22222'}}>券后¥{(item.zk_final_price-item.commission_rate).toFixed(2)}</span>
              <del>¥{item.zk_final_price}</del>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',padding:'0.1rem'}}>
              <div style={{border:'1px solid #ff7f50'}}><span style={{color:'#fff',backgroundColor:'#ff7f50'}}>券</span>¥{item.commission_rate}</div>
              <span>已售{item.volume}</span>
            </div>
          </Link>);
   }
   searchSubmit=() =>{
  //this.changeData(1,this.state.class)
}
  onChange=(value)=>{
    //this.setState({class:value})
  }
   
  render() {
    
    return (
      <div>
        <SearchBar 
          placeholder="输入你想要的商品"
          focused={true}
          onCancel={() =>this.props.history.goBack()}
          onSubmit={() => this.searchSubmit()}
          onBlur={() => this.searchSubmit()}
          onChange={this.onChange}
           autoFocus />
        
        
        
         <ListView
           dataSource={this.state.dataSource}
           renderRow={this.goodslist}
           renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>{this.state.page==6?'已加载完.':'加载中...'}</div>)}
           useBodyScroll={true}
           horizontal={true}
           onEndReachedThreshold={0}
           onEndReached={()=>{this.changeData(this.state.page,this.state.class)}}
        />
       


      </div>

    );
  }
}

export default CouponSearch;
