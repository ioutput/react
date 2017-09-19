import React, { Component } from 'react';
import { NavBar, Icon,ListView,SegmentedControl,Tabs } from 'antd-mobile';
import { Link } from 'react-router-dom';
import FootTabBar from './components/FootTabBar';
import datajson from './juan.json';
const width = document.body.clientWidth;
const height = window.screen.availHeight; 
class App extends Component {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
    
    this.state = {
        dataSource,
        page:1,
        class:'全部',
        tabs:['全部','女装','男装','鞋靴','箱包','内衣配饰','手机数码','家电','珠宝配饰','美妆','家装','整车车品']
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
    if(classes !=='全部' && page ==6){
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
            {item.user_type==1?<img style={{width:'20px',height:'12px'}} src=""/>:''}{item.title}
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
   const TabPane = Tabs.TabPane;
    
    return (
      <div>
        <NavBar 
        iconName={null}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} onClick={()=>{this.props.history.push('search')}} />
          ]}
        >淘宝券推荐</NavBar>
        <Tabs onChange={this.classCallback} onTabClick={this.classTabclick} pageSize={5}>
          {this.state.tabs.map((item,key)=>(
            <TabPane tab={item} key={item}></TabPane>
          ))}
          
          
        </Tabs>
        
        
         <ListView
           dataSource={this.state.dataSource}
           renderRow={this.goodslist}
           renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>{this.state.page==6?'已加载完.':'加载中...'}</div>)}
           useBodyScroll={true}
           horizontal={true}
           onEndReachedThreshold={0}
           onEndReached={()=>{this.changeData(this.state.page,this.state.class)}}
        />
       
        <FootTabBar {...this.props} />

      </div>

    );
  }
}

export default App;
