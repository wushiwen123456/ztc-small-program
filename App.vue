<template>
	<view>
		
	</view>
</template>
<script>
	import Vue from 'vue'
	import common from 'common/common.js'
	export default {
		data() {
			return {
				popo:true,
			};
		},
		onLaunch: function () {
			// console.log('App Launch')
			// this.wlogin();
		},
		onShow: function () {
			// console.log('App Show')
		},
		onHide: function () {
			// console.log('App Hide')
		},
		methods:{
			wlogin:function(){
				const that = this
				uni.login({
					provider: 'weixin',
				    success(res){
					  console.log(res.code,'login')
					  var data = res.code
					   
				    if (res.code) {
				      // 发起网络请求
					  that.wtokener(data)
					wx.request({
					  url: "https://zct.51kdd.com/index.php",
					  method: "GET",
					  data: {
					    code: res.code
					  }
					})
					
				    } else {
				      console.log('登录失败！' + res.errMsg)
				    }
				  }
				})
			},
		}
	}
</script>

<style>
		@import "./common/uni.css";
	/*每个页面公共css */
	.ell {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.ell2 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
    .red{
		color: #dd3e34;
	}
	.gray{
		color: #999;
	}
	.buttonR{
		background-color: #dd3e34;
	    border-radius: 6upx;
		font-size: 32upx;
	    color: #ffffff;
		width: 92%;
		padding: 10upx 0;
		margin: 20upx 0;
		margin-left: 4%;
		text-align: center;
	}
	img{
		width: 100%;
		height: 100%;
	}
	/* 列表 */
	.list{
		background-color: #fff;
		padding: 0 30upx;
		margin-top: 20upx;
	}
	.list .listn{
		border-bottom: 1upx solid #f3f3f3;
		position: relative;
		padding: 20upx 0;
		color: #333333;
	}
	.list .listn .left{
		font-size: 24upx;
	}
	.list .listn .right{
		position: absolute;
		top:20upx;
		right: 0;
		font-size: 24upx;
	}
	.list .listn:nth-last-child(1){
		border-bottom: none;
	}
	.right{
		position: absolute;
		top:0upx;
		right: 0;
	}
	.invite{
		background-color: #dd3e34;
	    border-radius: 6upx;
		font-size: 28upx;
	    color: #ffffff;
		padding: 10upx 20upx;
	}
	.borderG{
		border-radius: 6upx;
	    border: solid 1upx #999999;
		font-size: 28upx;
	    color: #333333;
		padding: 10upx 20upx;
	}
	.fixedB{
		width: 100%;
		position: fixed;
		bottom: 0;
		background-color: #fff;
		height: 100upx;
		line-height: 100upx;
		text-align: right;
	}
	.fixedB span{
		margin-right: 30upx;
	}
	.fixSure{
		width: 100%;
		position: fixed;
		bottom: 0;
		background-color: #fff;
		height: 100upx;
		line-height: 100upx;
		display: flex;
	}
	.fixSure .door{
		width: 65%;
		line-height: 100upx;
		padding-left: 30upx;
		font-size: 30upx;
	}
	.fixSure .door .red{
		margin-left: 10upx;
	}
	.fixSure .service{
		width: 35%;
		height: 100%;
		background-color: #dd3e34;
		font-size: 36upx;
		letter-spacing: 2upx;
	    color: #ffffff;
		line-height: 100upx;
		text-align: center;
	}
	.pop{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		z-index: 99999;
	}
	.pop .popN{
		background-color: #fff;
		border-radius: 10upx;
		text-align: center;
		padding: 30upx 0;
		width: 76%;
		position: absolute;
		left: 12%;
		top:30%;
	}
	.pop .popN .content{
		color: #45456c;
		border-bottom: 1upx solid #ededed;
		padding-bottom: 30upx;
	}
	.pop .popN .content view{
		font-size: 36upx;
	}
	.pop .popN .content img{
		width: 66upx;
		height: 66upx;
	}
	.pop .popN .close{
		text-align: right;
	}
	.pop .popN .close img{
		width: 46upx;
		height: 46upx;
		margin-right: 30upx;
	}
	.pop .popN .red{
		padding-top: 30upx;
		font-size: 36upx;
	}
	.kk{
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	.kk .image{
		width: 228upx;
	    height: 228upx;
	}
	.kk .tit{
		font-size: 30upx;
		color: #666666;
		margin-top: 20upx;
	}
	.load-more{
		margin-top: 30upx;
	}
</style>
