(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderDetail/orderDetail"],{"068a":function(t,e,n){"use strict";n.r(e);var a=n("cdcb"),c=n("587c");for(var o in c)"default"!==o&&function(t){n.d(e,t,(function(){return c[t]}))}(o);n("2e87");var r,u=n("f0c5"),i=Object(u["a"])(c["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=i.exports},"0c7e":function(t,e,n){},"2e87":function(t,e,n){"use strict";var a=n("0c7e"),c=n.n(a);c.a},"587c":function(t,e,n){"use strict";n.r(e);var a=n("74bd"),c=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=c.a},"74bd":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{biId:"",content:"",authKey:"",free:""}},onLoad:function(e){this.authKey=t.getStorageSync("authKey"),this.biId=e.id,this.getListDetail(),console.log(e.id)},methods:{getListDetail:function(){var e=this;t.request({url:this.http+"order/detail/"+this.biId,method:"GET",header:{authKey:this.authKey},data:{},success:function(t){if(console.log(t.data),200==t.data.code){var n=t.data.data;n.product.cover=e.static+n.product.cover,e.content=n,e.free=n.sku.fee_reduce_count}}})},copy:function(e){t.setClipboardData({data:e,success:function(){t.showToast({title:"复制成功",icon:"none",duration:1500})}})},reser:function(){t.navigateTo({url:"/pages/reservationService/reservationService"})}}};e.default=n}).call(this,n("543d")["default"])},"7b25":function(t,e,n){"use strict";(function(t){n("b822"),n("921b");a(n("66fd"));var e=a(n("068a"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},cdcb:function(t,e,n){"use strict";var a,c=function(){var t=this,e=t.$createElement,a=(t._self._c,n("74f5")),c=n("0d83");t.$mp.data=Object.assign({},{$root:{m0:a,m1:c}})},o=[];n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}))}},[["7b25","common/runtime","common/vendor"]]]);