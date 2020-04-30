<template>
	<view class="mine">
		<view class="mine-head">
			<view class="headImg"><img :src="userInfo.avatarUrl" alt=""></view>
			<view class="user">
				<view class="name">{{userInfo.nickName}}</view>
				<button class="update" v-if="!authKey" open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true">授权微信</button>
				<!-- <button class="update" v-else open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true">更新资料</button> -->
				
			</view>
		</view>
		<view class="order">
			<view class="left">我的订单</view>
			<view class="right gray" @tap="goOrder(0)">全部订单 ></view>
		</view>
		<view class="orderDetail">
			<view class="detail" @tap="goOrder(1)"><img src="../../../static/mine1.png" alt=""><view class="gray">待分享</view><span v-if="dot.to_share>0" class="dot">{{dot.to_share}}</span></view>
			<view class="detail" @tap="goOrder(2)"><img src="../../../static/mine2.png" alt=""><view class="gray">待预约</view><span v-if="dot.to_use>0" class="dot">{{dot.to_use}}</span></view>
			<view class="detail" @tap="goOrder(3)"><img src="../../../static/mine3.png" alt=""><view class="gray">已预约</view></view>
			<view class="detail" @tap="goOrder(4)"><img src="../../../static/mine4.png" alt=""><view class="gray">待评价</view><span v-if="dot.to_evaluate>0" class="dot">{{dot.to_evaluate}}</span></view>
		</view>
		<view class="home-activity" @tap="goActivity">
			<img src="../../../static/home_activity.png"></img>
		</view>
		<view class="orderDetail">
			<view class="detail" @tap="goDetail(1)"><img src="../../../static/mine5.png" alt=""><view>我的收藏</view></view>
			<view class="detail" @tap="goDetail(2)"><img src="../../../static/mine6.png" alt=""><view>我的技师</view></view>
			<view class="detail" @tap="goDetail(3)"><img src="../../../static/mine7.png" alt=""><view>我的地址</view></view>
			<view class="detail" @tap="goDetail(4)"><img src="../../../static/mine8.png" alt=""><view>优惠券</view></view>
			<view class="detail" @tap="goDetail(5)"><img src="../../../static/mine9.png" alt=""><view>合伙人计划</view></view>
			<view class="detail" @tap="goDetail(6)"><img src="../../../static/mine10.png" alt=""><view>关于我们</view></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:false,
				authKey:'',
				dot:'',
				userInfo:''
			};
		},
		onLoad(e) {
			this.authKey = uni.getStorageSync('authKey')
			if (this.authKey){
				this.checkSession()
			}
			this.userInfo = uni.getStorageSync('userInfo');
		},
		onShow() {
			this.getdot();
		},
		methods:{
			// 检查会话是否失效
		checkSession: function() {
				var that = this;
				uni.request({
					url: this.http + 'user/checkSession',
					method: 'POST',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						if (res.data.code == 101) {
							that.user = true
							that.authKey = ''
							uni.setStorageSync('authKey','')
						} else {
							that.user = false
						}
					},
				});
		},
		wxGetUserInfo:function(res){
			let that = this
			if (!res.detail.iv) {
				uni.showToast({ 
					title: "您取消了授权,登录失败", 
					icon: "none" ,
				}); 
				return false; 
			}
			let simpleUser = res.detail.userInfo
			let encryptedData = res.detail.encryptedData
			let iv = res.detail.iv
			uni.login({
				provider: 'weixin',
			    success(res){
				  console.log(res.code,'login')
				  var data = res.code
			    if (res.code) {
				  uni.request({
				  	url: that.http + 'user/token',
				  	method: 'GET',
				  	data: {
				  		login_code: res.code,
						encrypted_data:encryptedData,
						iv: iv
				  	},
				  	success: res => {
						if (res.data.code == 200) {
							let auth = res.data.data.authkey
							that.authKey = auth
							that.userInfo = simpleUser
							uni.setStorageSync('authKey',auth)
							uni.setStorageSync('userInfo',simpleUser)
							that.user = false
						} else {
							uni.showToast({
								title: res.data.error,
								icon: 'none'
							})
						}
				  		
				  		// that.haveOrder()
				  	},
				  });
			    } else {
			      console.log('登录失败！' + res.errMsg)
			    }
			  }
			})
		},
			close(e){
				this.user = false;
				uni.showToast({
					title: '未微信授权',
					icon:'none',
					mask: false,
					duration: 1500
				})
			},
			goActivity(){
				uni.navigateTo({
					url: '/pages/service/detail?id=28'
				})
			},
			getdot(){
				uni.request({
					url: this.http+'order/overview',
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
							this.dot = res.data.data
						}
					},
				});
			},
			goOrder(e){
				wx.getSetting({
					  success(res) {
					    if (res.authSetting['scope.userInfo']) {
							console.log('已经授权')
					      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
					      wx.getUserInfo({
					        success(res) {
							  uni.setStorageSync('userInfo',res.userInfo)
					        }
					      });
						  uni.navigateTo({
						  	url: '/pages/order/order?tabIndex=' + e
						  });
					    }else{
							console.log('未授权')
							uni.showToast({
								title:"请微信授权",
								icon:'none',
								duration:1500
							})
						}
					  },
					  fail(res){
					    console.log(res,'登录过期了')
					    uni.showModal({
					      title: '提示',
					      content: '你的登录信息过期了，请重新登录',
					    })
						wx.login({
						    success: function (res) {
						      console.log(res.code)
						      //发送请求
						      wx.request({
						        url: 'https://zct.51kdd.com/index.php', 
						        data: {
						          code: res.code
						        },
						        header: {
						          'content-type': 'application/json' // 默认值
						        },
						        success(res) {
						          console.log(res)
						        }
						      })
						    }
						})
					}
				})
				
			},
			goDetail(e){
				var that = this
				if(e==6){
					uni.navigateTo({
						url: '/pages/mine/aboutsAs/aboutsAs'
					});
				}else{
					wx.getSetting({
						  success(res) {
						    if (res.authSetting['scope.userInfo']) {
								console.log('已经授权')
						      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
						      wx.getUserInfo({
						        success(res) {
						          console.log(res.userInfo)
								  uni.setStorageSync('userInfo',res.userInfo)
						        }
						      });
							  if(e==1){
							  	uni.navigateTo({
							  		url: '/pages/mine/collection/collection'
							  	});
							  }else if(e==2){
							  	uni.navigateTo({
							  		url: '/pages/mine/myTechnician/myTechnician'
							  	});
							  }else if(e==3){
							  	uni.navigateTo({
							  		url: '/pages/mine/address/address'
							  	});
							  }else if(e==4){
							  	uni.navigateTo({
							  		url: '/pages/mine/coupons/coupons'
							  	});
							  }else if(e==5){
							  	uni.request({
							  		url: that.http+'copemate/homepage',
							  		method: 'GET',
							  		header: {
							  			authKey: that.authKey
							  		},
							  		data: {},
							  		success: res => {
							  			console.log(res.data)
							  			if (res.data.code == 200) {
							  	             var part = res.data.data.is_copemate
							  				 if(part==1){
							  					 uni.navigateTo({
							  					 	url: '/pages/mine/partnership/associate'
							  					 });
							  				 }else if(part==0){
							  					uni.navigateTo({
							  						url: '/pages/mine/partnership/partnership'
							  					}); 
							  				 }
							  			}
							  		},
							  	});
							  }
						    }else{
								console.log('未授权')
								uni.showToast({
									title:"请微信授权",
									icon:'none',
									duration:1500
								})
							}
						  },
						  fail(res){
						    console.log(res,'登录过期了')
						    uni.showModal({
						      title: '提示',
						      content: '你的登录信息过期了，请重新登录',
						    })
							wx.login({
							    success: function (res) {
							      console.log(res.code)
							      //发送请求
							      wx.request({
							        url: 'https://zct.51kdd.com/index.php', 
							        data: {
							          code: res.code
							        },
							        header: {
							          'content-type': 'application/json' // 默认值
							        },
							        success(res) {
							          console.log(res)
							        }
							      })
							    }
							})
						}
					})
				}
			}
		}
	}
</script>

<style>
page{
	background-color: #f3f3f3;
}
.home-activity{
	width: 100%;
	margin: 20upx 0;
	height: 182upx;
}
.mine-head{
	background-color: #fff;
	display: flex;
	padding: 20upx 40upx;
	align-items: center;
}
.headImg{
	width: 130upx;
	height: 130upx;
	border-radius: 50%;
}
.headImg img{
	border-radius: 50%;
}
.user{
	margin-left: 36upx;
}
.user .name{
	font-size: 40upx;
	color: #333333;
}
.user .update{
	background-color: #fff5e4;
	border-radius: 6upx;
	font-size: 22upx;
	color: #b88634;
	padding: 0 20upx;
}
.order{
	padding: 10upx 30upx;
	background-color: #fff;
	position: relative;
}
.order .left{
	color: #333333;
	font-size: 32upx;
}
.order .right{
	right: 30upx;
	font-size: 28upx;
	top:20upx;
}
.orderDetail{
	 background-color: #fff;
	 padding: 20upx 0;
}
.orderDetail .detail{
	display: inline-block;
	width: 25%;
	text-align: center;
	margin-top: 20upx;
	position: relative;
}
.orderDetail .detail .dot{
	position: absolute;
	top:-16upx;
	right: 38upx;
	border: solid 2upx #dd3e34;
	background-color: #fff;
	font-size: 24upx;
	color: #dd3e34;
	border-radius: 30upx;
	padding: 0 10upx;
	height: 32upx;
	line-height: 32upx;
}
.orderDetail .detail img{
	width: 48upx;
	height: 48upx;
}
.orderDetail .detail view{
	margin-top: -10upx;
}
.other{
	margin-top: 20upx;
}
</style>
