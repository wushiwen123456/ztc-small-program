(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/knowledge/knowledge"],{2539:function(t,e,o){"use strict";(function(t){o("b822"),o("921b");n(o("66fd"));var e=n(o("6d2e"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},"27d4":function(t,e,o){"use strict";var n,a=function(){var t=this,e=t.$createElement,n=(t._self._c,o("1557")),a=o("5dd8"),s=o("1a5a"),i=o("74f5"),r=o("b8d8"),c=o("29de");t.$mp.data=Object.assign({},{$root:{m0:n,m1:a,m2:s,m3:i,m4:r,m5:c}})},s=[];o.d(e,"b",(function(){return a})),o.d(e,"c",(function(){return s})),o.d(e,"a",(function(){return n}))},"6d2e":function(t,e,o){"use strict";o.r(e);var n=o("27d4"),a=o("c973");for(var s in a)"default"!==s&&function(t){o.d(e,t,(function(){return a[t]}))}(s);o("af2d");var i,r=o("f0c5"),c=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],i);e["default"]=c.exports},af2d:function(t,e,o){"use strict";var n=o("d698"),a=o.n(n);a.a},c973:function(t,e,o){"use strict";o.r(e);var n=o("de9b"),a=o.n(n);for(var s in n)"default"!==s&&function(t){o.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},d698:function(t,e,o){},de9b:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(o("4795"));a(o("66fd"));function a(t){return t&&t.__esModule?t:{default:t}}function s(t,e,o,n,a,s,i){try{var r=t[s](i),c=r.value}catch(u){return void o(u)}r.done?e(c):Promise.resolve(c).then(n,a)}function i(t){return function(){var e=this,o=arguments;return new Promise((function(n,a){var i=t.apply(e,o);function r(t){s(i,n,a,r,c,"next",t)}function c(t){s(i,n,a,r,c,"throw",t)}r(void 0)}))}}var r=function(){o.e("components/uni-load-more").then(function(){return resolve(o("37d8"))}.bind(null,o)).catch(o.oe)},c={components:{uniLoadMore:r},data:function(){return{tabBars:"",scrollLeft:0,tabIndex:0,authKey:"",symbolId:"",lists:"",loadingType:0,next:-1,start:0,size:15,record:!1,bottom:!1,packets:!1,user:!1,give:"",token:"",userInfo:"",$static:"",pullDown:!1,promotion:!1,activity:!0,keyword:""}},onLoad:function(e){this.token=e.token,this.$static=this.static,this.token?this.packets=!0:this.packets=!1,this.authKey=t.getStorageSync("authKey"),this.authKey&&this.checkSession(),this.requestLearn()},onShow:function(){this.userInfo=t.getStorageSync("userInfo"),this.authKey&&this.coup(),this.keyword=t.getStorageSync("keyword"),this.keyword&&(t.setStorageSync("keyword",""),console.log("----------------------------------------"),console.log(this.keyword),this.start=0,this.requestLearnList())},onPullDownRefresh:function(){this.start=0,this.keyword=t.getStorageSync("keyword"),this.requestLearnList(),this.pullDown=!0},onReachBottom:function(){console.log("reach bottom"),2!=this.loadingType&&this.requestLearnList(!1)},methods:{search:function(){t.navigateTo({url:"/pages/knowledge/search"})},getElSize:function(e){return console.log(e),new Promise((function(o,n){t.createSelectorQuery().select("#"+e).fields({size:!0,scrollOffset:!0},(function(t){o(t)})).exec()}))},tapTab:function(t){var e=this;return i(n.default.mark((function o(){var a,s;return n.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:if(e.symbolId=t.currentTarget.id,console.log(e.symbolId),e.tabIndex!==t.target.dataset.current){o.next=6;break}return o.abrupt("return",!1);case 6:return o.next=8,e.getElSize("tab-bar");case 8:a=o.sent,s=a.scrollLeft,e.scrollLeft=s,e.isClickChange=!0,e.tabIndex=t.target.dataset.current;case 13:e.start=0,e.requestLearnList();case 15:case"end":return o.stop()}}),o)})))()},coup:function(){var e=this;t.request({url:this.http+"home/showCoupon",method:"GET",header:{authKey:this.authKey},data:{token:this.authKey},success:function(t){200==t.data.code&&(e.give=t.data.data)}})},btn:function(){var e=this;t.request({url:this.http+"home/receiveCoupon",method:"GET",header:{authKey:this.authKey},data:{token:this.token},success:function(o){200==o.data.code&&(t.showToast({title:"领取优惠成功",icon:"none",mask:!1,duration:1500}),e.packets=!1)}})},wxGetUserInfo:function(e){var o=this;if(!e.detail.iv)return t.showToast({title:"您取消了授权,登录失败",icon:"none"}),!1;var n=e.detail.userInfo,a=e.detail.encryptedData,s=e.detail.iv;t.login({provider:"weixin",success:function(e){console.log(e.code,"login");e.code;e.code?t.request({url:o.http+"user/token",method:"GET",data:{login_code:e.code,encrypted_data:a,iv:s},success:function(e){var a=e.data.data.authkey;o.authKey=a,o.userInfo=n,t.setStorageSync("authKey",a),t.setStorageSync("userInfo",n),o.user=!1}}):console.log("登录失败！"+e.errMsg)}})},close:function(e){1==e?this.packets=!1:(this.user=!1,t.showToast({title:"未微信授权",icon:"none",mask:!1,duration:1500}))},goActivity:function(){t.navigateTo({url:"/pages/service/detail?id=28"})},closeActivity:function(){this.activity=!1},closePromotion:function(){this.promotion=!1},goService:function(){t.switchTab({url:"/pages/service/service"}),this.promotion=!1},haveOrder:function(){var e=this;t.request({url:this.http+"order/list",method:"GET",header:{authKey:this.authKey},data:{},success:function(t){if(200==t.data.code){var o=t.data.data.list;0==o.length&&(e.promotion=!0)}}})},requestLearn:function(){var e=this,o=this;t.request({url:this.http+"knowledge/category",method:"GET",header:{authKey:this.authKey},data:{},success:function(t){200==t.data.code&&(o.tabBars=t.data.data,o.symbolId=t.data.data[0].id,e.requestLearnList())}})},checkSession:function(){var e=this;t.request({url:this.http+"user/checkSession",method:"POST",header:{authKey:this.authKey},data:{},success:function(o){101==o.data.code&&(e.authKey="",t.setStorageSync("authKey",""))}})},requestLearnList:function(){var e=this,o=arguments.length>0&&void 0!==arguments[0]&&arguments[0];o&&t.showLoading({title:"加载中"});var n=this,a="?start="+this.start+"&size="+this.size+"&keyword="+this.keyword;n.loadingType=1,t.request({url:this.http+"knowledge/list"+a,method:"GET",header:{authKey:this.authKey},data:{category_id:n.symbolId},success:function(o){var a=o.data.data;if(200==o.data.code){var s=a.list;0==s.length&&(s=[]),0==n.start&&(n.lists=[]),n.lists=n.lists.concat(s),0==n.lists.length?n.record=!0:n.record=!1,n.start=a.next,0==s.length||s.length<e.size||-1==n.start?n.loadingType=2:n.loadingType=0}e.pullDown&&(t.stopPullDownRefresh(),e.pullDown=!1)},fail:function(){console.log("请求失败")},complete:function(){o&&t.hideLoading()}})},collect:function(e){var o=this;t.request({url:this.http+"collection/append/"+e.id,method:"GET",header:{authKey:this.authKey},data:{},success:function(n){console.log(n.data),200==n.data.code?(e.is_collect=1,t.showToast({title:"收藏成功",icon:"none",mask:!1,duration:1500})):101==n.data.code&&(t.setStorageSync("userInfo",""),t.setStorageSync("authKey",""),o.user=!0)}})},cancel:function(e){t.request({url:this.http+"collection/remove/"+e.id,method:"GET",header:{authKey:this.authKey},data:{},success:function(o){console.log(o.data),200==o.data.code&&(t.showToast({title:"取消收藏成功",icon:"none",mask:!1,duration:1500}),e.is_collect=0)}})},goDetail:function(e){t.navigateTo({url:"/pages/knowledge/detail?id="+e})},lower:function(){2!=this.loadingType&&this.requestLearnList(!1)}}};e.default=c}).call(this,o("543d")["default"])}},[["2539","common/runtime","common/vendor"]]]);