import React, { Component } from 'react'
import { NavBar, Icon,Carousel,Button,Toast } from 'antd-mobile'
import copy from 'copy-to-clipboard'
const width = window.screen.availWidth;
const height = window.screen.availHeight;
class GoodsDetail extends Component {
  
      state = {
        data: this.props.location.params.data,
        images:this.props.location.params.data.small_images.string,
        initialHeight: 200,
        kouling:''
      }
      
      copylink=()=>{
        fetch('https://2.ketengds.com/tbk/itemskey?title='+this.props.location.params.data.title+'&url='+this.props.location.params.data.coupon_click_url+'&logo='+this.props.location.params.data.pict_url).then(function(response) {
          return response.json()
        }).then(function(json) {
          copy(json.data.model);Toast.info('复制成功')
        })
      }
      turnlink=()=>{
        window.location.href='https://t.asczwa.com/taobao?backurl='+encodeURIComponent(this.state.data.coupon_click_url);
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
        >商品详情</NavBar>
        <Carousel
          className="my-carousel"
          autoplay={true}
          infinite
          selectedIndex={0}
          swipeSpeed={35}
      
        >
          {this.state.images.map((item,key) => (
            <a href="http://www.baidu.com" key={key} >
              <img
                src={item}
                style={{width:width,height:width}}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  
                }}
              />
            </a>
          ))}
        </Carousel>
        <div>{this.state.data.title}</div>
            <div style={{display:'flex',padding:'0.1rem',fontSize: '11px'}}>
              <span style={{color:'#b22222',marginRight: '0.5rem'}}>券后¥421</span>
              <del style={{color:'#888'}}>¥42</del>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',padding:'0.1rem'}}>
              <div style={{border:'1px solid #ff7f50',color:'#ff7f50'}}><span style={{color:'#fff',backgroundColor:'#ff7f50'}}>券</span>¥21</div>
              <span>已售1</span>
            </div>
            <div style={{width:'100%',height:'50px',display: 'block'}}></div>
            <div style={{maxWidth:'640px',height:'50px',position:'fixed',bottom:0,display: 'flex'}}>
              <Button size="large" onClick={this.copylink} style={{width:width/2-5,backgroundColor: '#d2691e',color:'#fff'}}>复制淘口令</Button>
              <Button size="large" onClick={this.turnlink} style={{width:width/2-5,backgroundColor: '#dc143c',color:'#fff'}}> 直接领取</Button>
            </div>
      </div>
    );
  }
}

export default GoodsDetail;
