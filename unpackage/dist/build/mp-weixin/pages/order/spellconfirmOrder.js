(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/spellconfirmOrder"],{3960:function(t,e,o){"use strict";o.r(e);var i=o("d439"),n=o.n(i);for(var a in i)"default"!==a&&function(t){o.d(e,t,(function(){return i[t]}))}(a);e["default"]=n.a},"47cd":function(t,e,o){"use strict";var i=o("a524"),n=o.n(i);n.a},5349:function(t,e,o){"use strict";o.r(e);var i=o("ebd9"),n=o("3960");for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);o("47cd");var s,c=o("f0c5"),u=Object(c["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);e["default"]=u.exports},5524:function(t,e,o){"use strict";(function(t){o("b822"),o("921b");i(o("66fd"));var e=i(o("5349"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},a524:function(t,e,o){},d439:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{specificat:!1,item:[],list:"",current:0,counpId:"",show:"",invite_code:""}},onLoad:function(e){this.authKey=t.getStorageSync("authKey");try{this.item=JSON.parse(decodeURIComponent(e.data))}catch(o){this.item=JSON.parse(e.data)}console.log(this.item),this.coupons()},methods:{discounts:function(){this.specificat=!0},coupons:function(){var e=this;t.request({url:this.http+"home/coupons",method:"GET",header:{authKey:this.authKey},data:{type:0},success:function(t){if(console.log(t.data),200==t.data.code&&(e.list=t.data.data.list,console.log(e.list),""!=e.list)){e.show=t.data.data.list[0].amount+"元优惠券";var o=t.data.data.list[0].amount;e.counpId=t.data.data.list[0].id,e.item.amount=e.item.amount-o}}})},radioChange:function(t){for(var e=0;e<this.list.length;e++)if(this.list[e].id===t.target.value){this.current=e;break}},choose:function(t){1==t?(this.specificat=!1,this.show="不使用优惠券",this.counpId="",this.item.amount=this.item.amount):(this.specificat=!1,this.show=t.amount+"元优惠券",this.counpId=t.id,this.item.amount=this.item.amount-t.amount,console.log(this.item))},discountsClose:function(){this.specificat=!1},pay:function(){t.request({url:this.http+"assemble/create",method:"POST",header:{authKey:this.authKey},data:{product_id:this.item.product.id,sku_id:this.item.sku.id,category_id:this.item.category.id,coupon_id:this.counpId},success:function(e){if(console.log(e.data),200==e.data.code){var o=e.data.data;t.login({provider:"weixin",success:function(e){e.code?wx.request({url:"https://zct.51kdd.com/index.php",data:{code:e.code},success:function(e){console.log(e.data),console.log(o,o.timestamp),wx.requestPayment({timeStamp:o.timestamp,nonceStr:o.noncestr,package:o.package,signType:"MD5",paySign:o.paysign,success:function(e){console.log(e),t.showToast({title:"购买成功",icon:"none",duration:1500}),t.navigateTo({url:"/pages/groupSuccess/spellGroup?id="+o.order_id})},fail:function(e){t.showToast({title:"支付失败",icon:"none",duration:1500})},complete:function(t){console.log(t)}})}}):console.log("获取用户登录态失败！"+e.errMsg)}})}}})}}};e.default=o}).call(this,o("543d")["default"])},ebd9:function(t,e,o){"use strict";var i,n=function(){var t=this,e=t.$createElement,i=(t._self._c,o("74f5"));t.$mp.data=Object.assign({},{$root:{m0:i}})},a=[];o.d(e,"b",(function(){return n})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return i}))}},[["5524","common/runtime","common/vendor"]]]);