(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/knowledge/detail"],{"02d8":function(t,e,n){"use strict";n.r(e);var a=n("e6d3"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},"45e2":function(t,e,n){"use strict";(function(t){n("b822"),n("921b");a(n("66fd"));var e=a(n("a778"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"550d":function(t,e,n){},"95a5":function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}))},a778:function(t,e,n){"use strict";n.r(e);var a=n("95a5"),i=n("02d8");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("d8f7");var c,u=n("f0c5"),s=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);e["default"]=s.exports},d8f7:function(t,e,n){"use strict";var a=n("550d"),i=n.n(a);i.a},e6d3:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("c7aa"));function i(t){return t&&t.__esModule?t:{default:t}}var o={onShareAppMessage:function(t){return"button"===t.from?(console.log("点击了页面的转发按钮"),console.log(t.target)):console.log("点击了原生转发"),{title:this.content.title,path:"/pages/service/detail?id="+this.biId}},data:function(){return{biId:"",authKey:"",content:"",contentTxt:"",contentArr:[],video_src:"",path:"pages/knowledge/detail"}},onLoad:function(e){this.authKey=t.getStorageSync("authKey"),this.biId=e.id,e.scene&&(this.biId=e.scene),this.getListDetail()},computed:{backImage:function(){return this.static+this.content.cover_src}},methods:{getListDetail:function(){var e=this,n=this;t.request({url:this.http+"knowledge/detail/"+this.biId,method:"GET",header:{authKey:this.authKey},data:{},success:function(t){if(200==t.data.code){e.content=t.data.data,e.video_src=e.static+t.data.data.video_src;var i=(0,a.default)(t.data.data.content);i.forEach((function(t){n.adjustimg(t)})),e.contentTxt=i}}})},adjustimg:function(t){var e=this;t.name&&"img"==t.name?t.attrs["style"]="margin: 6px 0;width:100%;":t.name&&t.children&&t.children.length>0&&t.children.forEach((function(t){e.adjustimg(t)}))},collect:function(e){var n=this;t.request({url:this.http+"collection/append/"+e,method:"GET",header:{authKey:this.authKey},data:{},success:function(e){200==e.data.code&&(t.showToast({title:"收藏成功",icon:"none",mask:!1,duration:1500}),n.getListDetail())}})},cancel:function(e){var n=this;t.request({url:this.http+"collection/remove/"+e,method:"GET",header:{authKey:this.authKey},data:{},success:function(e){if(200==e.data.code){t.showToast({title:"取消收藏成功",icon:"none",mask:!1,duration:1500});var a=n.getListDetail();console.log(a)}}})}}};e.default=o}).call(this,n("543d")["default"])}},[["45e2","common/runtime","common/vendor"]]]);