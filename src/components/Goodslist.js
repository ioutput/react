import React from 'react'
import { Link } from 'react-router-dom';
const width = document.body.clientWidth;
const linkurl = (url) => {
  window.location.href='https://t.asczwa.com/taobao?backurl='+encodeURIComponent(url)
}
export function Indexlist (item)  {
    return (
        <Link to={{pathname:`goodsdetail/${item.num_iid}`,params:{data:item}}}  style={{backgroundColor: '#fff',width: width/2,float:'left',color:'rgb(102, 102, 102)',fontSize: '12px',overflow: 'hidden'  }}>
          <div><img style={{width: width/2-4,height: width/2-4}} alt={item.title} src={item.pict_url}/></div>
          <div style={{width:width/2-8,overflow:'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap'}}>
          {item.user_type===1?<img style={{width:'20px',height:'12px'}} alt={item.title} src="http://oss1.lanlanlife.com/f87493c5f309d8b282476c232df6bd4b_26x26.png"/>:''}{item.title}
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'0.1rem',fontSize: '11px'}}>
            <span style={{color:'#b22222'}}>¥{(item.zk_final_price-item.coupon_info.slice(item.coupon_info.indexOf('减')+1).replace('元','')).toFixed(2)}</span>
            <del>¥{item.zk_final_price}</del>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'0.1rem'}}>
            <div style={{border:'1px solid #ff7f50'}}><span style={{color:'#fff',backgroundColor:'#ff7f50'}}>券</span>{item.coupon_info.slice(item.coupon_info.indexOf('减')+1).replace('元','')}元</div>
            <span>已售{item.volume}</span>
          </div>
        </Link>
        );
}
export function Couponlist (item) {
  return (
      <div onClick={()=>linkurl(item.click_url)} style={{backgroundColor: '#fff',width: width/2,float:'left',color:'rgb(102, 102, 102)',fontSize: '12px',overflow: 'hidden'  }}>
        <div><img style={{width: width/2-4,height: width/2-4}} alt={item.title} src={item.pic_url}/></div>
        <div style={{width:width/2-8,overflow:'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap'}}>
        {item.title}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',padding:'0.1rem',fontSize: '11px'}}>
          <span style={{color:'#b22222'}}>¥{item.zk_final_price}</span>
          <del>¥{item.reserve_price}</del>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',padding:'0.1rem'}}>
          <div style={{border:'1px solid #ff7f50'}}><span style={{color:'#fff',backgroundColor:'#ff7f50'}}>总数</span>{item.total_amount}</div>
          <span>已售{item.sold_num}</span>
        </div>
      </div>
      );
}
export function Julist (item) {
  return (
    <div onClick={()=>linkurl(item.wap_url)} style={{backgroundColor: '#fff',width: width/2,float:'left',color:'rgb(102, 102, 102)',fontSize: '12px',overflow: 'hidden'  }}>
      <div><img style={{width: width/2-4,height: width/2-4}} alt={item.title} src={item.pic_url_for_w_l}/></div>
      <div style={{width:width/2-8,overflow:'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap'}}>
      {item.title}
      </div>
      <div style={{display:'flex',justifyContent:'space-between',padding:'0.1rem',fontSize: '11px'}}>
        <span style={{color:'#b22222'}}>¥{item.act_price}</span>
        <del>¥{item.orig_price}</del>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',padding:'0.1rem'}}>
        <div style={{border:'1px solid #ff7f50'}}><span style={{color:'#fff',backgroundColor:'#ff7f50'}}>{item.pay_postage==='true'?'包邮':''}</span>{item.price_usp_list.string}</div>

      </div>
    </div>
      );
}
