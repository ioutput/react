import React, { Component } from 'react';
import { NavBar, Icon,ListView,Tabs } from 'antd-mobile';
import { Link } from 'react-router-dom';
import FootTabBar from './FootTabBar';
import datajson from './juhs.json';
const width = document.body.clientWidth;
//const height = window.screen.availHeight; 
class Juhs extends Component {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
    this.state = {
        dataSource,
        _data:[],
        page:1,
        class:'全部',
        tabs:['全部','女装','男装','鞋靴','箱包','内衣配饰','手机数码','家电','珠宝配饰','美妆','家装','整车车品']
      }
     
  }
  
  
  componentDidMount() {
    let data=[];
    let datas = data.concat(datajson.result.model_list.items);
    this.setState({dataSource:this.state.dataSource.cloneWithRows(datas)})
    //this.changeData(1,this.state.class)

  }
  changeData = (page,classes) => {
    let selfs = this;
    
    fetch("")
      .then(function(response){
      return response.json()
    }).then(function(json) {console.log(json)
    if(page==1){
      let data=[];
      let datas = data.concat(json.result.model_list.items);
      selfs.state._data = selfs.state._data.concat(json.result.model_list.items);
      selfs.setState({dataSource:selfs.state.dataSource.cloneWithRows(datas)})
    }else{
      selfs.state._data = selfs.state._data.concat(json.result.model_list.items);
      selfs.setState({dataSource:selfs.state.dataSource.cloneWithRows(selfs.state._data)})
    }
     
    let pages = selfs.state.page+1
    selfs.setState({page:pages})
    })
  }
  linkurl = (url) => {
    window.location.href='https://t.asczwa.com/taobao?backurl='+encodeURIComponent(url)
  }
  goodslist = (item)=>{
      return (<div onClick={()=>this.linkurl(item.wap_url)} style={{backgroundColor: '#fff',width: width/2,float:'left',color:'rgb(102, 102, 102)',fontSize: '12px',overflow: 'hidden'  }}>
            <div><img style={{width: width/2-4,height: width/2-4}} src={item.pic_url_for_w_l}/></div>
            <div style={{width:width/2-8,overflow:'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap'}}>
            {item.title}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',padding:'0.1rem',fontSize: '11px'}}>
              <span style={{color:'#b22222'}}>¥{item.act_price}</span>
              <del>¥{item.orig_price}</del>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',padding:'0.1rem'}}>
              <div style={{border:'1px solid #ff7f50'}}><span style={{color:'#fff',backgroundColor:'#ff7f50'}}>{item.pay_postage=='true'?'包邮':''}</span>{item.price_usp_list.string}</div>
  
            </div>
          </div>);
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
          
        >淘抢购推荐</NavBar>
        <Tabs defaultActiveKey={this.state.class} onChange={this.classCallback} onTabClick={this.classTabclick} pageSize={5}>
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

export default Juhs;
