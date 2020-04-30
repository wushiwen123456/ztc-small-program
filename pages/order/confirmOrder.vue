<template>
	<view>
		<view class="order-confirm">
			<view class="orderTit"><img src="../../static/logohead.png" alt="">直纯堂孕产康养</view>
			<view class="orderCont">
				<view class="orderImg"><img :src="item.item.product.cover" alt=""></view>
				<view class="orderTxt">
					<view class="txtTit">{{item.item.product.name}}</view>
					<view class="txtDri gray ell">{{item.item.product.introduction}}</view>
					<view class="txtSpec gray">规格: {{item.item.sku.name}}<span >({{item.item.sku.times}}次)</span>；<span v-if="item.item.assemble_id != ''">{{item.item.assemble.category.name}}</span></view>
				</view>
				<view class="price">￥{{item.item.sku.price}}</view>
			</view>
			<view class="listShow"><view class="left">服务次数</view><view class="right">{{item.item.service_times}}</view></view>
			<view class="listShow" v-if="list != ''"><view class="left">店铺优惠</view><view class="right gray" @tap="discounts()">{{show}}></view></view>
			<view class="listShow" v-else><view class="left">店铺优惠</view><view class="right gray">暂无优惠劵 </view></view>
		    <view class="Confirm">
				<view class="money">实付款：<span class="red">￥{{item.amount}}</span></view>
				<view class="pay" @tap="pay()">立即支付</view>
			</view>
		</view>
		<view class="purchase groupMore" v-if="specificat">
			<view class="purchaseN">
				<view class="discountsTit">店铺优惠</view>
				<view class="discountsList">
					<radio-group @change="radioChange">
						<view class="listShow"  @tap="choose(1)"><view class="left gray">不使用优惠券</view><view class="right"><radio color="#dd3e34"/></view></view>
					    <view class="listShow" v-for="(li,index) in list" :key="index" :data-id="li.id" @tap="choose(li)"><view class="left gray">{{li.amount}}元现金券</view><view class="right"><radio color="#dd3e34" :value="li.id" :checked="index === current"/></view></view>
				    </radio-group>
				</view>
				<view class="confirm-close" @tap="discountsClose">关闭</view>
		    </view>
		</view>
		<view class="pop" v-if="popo">
			<view class="popN">
				<view class="close" @tap="close"><img src="../../static/close1.png" alt=""></view>
				<view class="content">
					<img src="../../static/success.png" alt="">
					<view>购买成功</view>
				</view>
				<view class="red" @tap="godetail()">查看详情</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				specificat:false,
				popo:false,
				item:[],
				list:"",
				current:0,
				counpId:'',
				show:'',
				invite_code:''
			};
		},
		onLoad(e) {
			this.authKey = uni.getStorageSync('authKey');
			try {
				this.item = JSON.parse(decodeURIComponent(e.data));
			} catch (error) {
				this.item = JSON.parse(e.data)
			}
			console.log(this.item)
			this.coupons();
		},
		methods:{
			discounts(){
				this.specificat = true;
			},
			// 优惠券
			coupons(){
				uni.request({
					url: this.http+'home/coupons',
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {
						type:0
					},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
							this.list = res.data.data.list
							if(this.list != ''){
								this.show = res.data.data.list[0].amount + '元优惠券'
								var show = res.data.data.list[0].amount
								this.counpId = res.data.data.list[0].id
								this.item.amount = this.item.amount - show
							}
						}
					},
				});
			},
		radioChange: function(evt) {
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].id === evt.target.value) {
                    this.current = i;
                    break;
                }
            }
        },
		// 选择优惠券
		choose(item){
			if(item==1){
				this.specificat = false
				this.show = '不使用优惠券'
				this.counpId = ''
				this.item.amount = this.item.amount
			}else{
				this.specificat = false
				this.show = item.amount + '元优惠券'
				this.counpId = item.id
				this.item.amount = this.item.amount - item.amount
				console.log(this.item)
				
			}
		},
			discountsClose(){
				this.specificat = false
			},
			// 支付  17761786369 
			pay(){
				var that = this
				uni.request({
					url: this.http+'order/submit',
					method: 'POST',
					header: {
						authKey: this.authKey
					},
					data: {
						product_id:this.item.item.product_id,
						sku_id:this.item.item.sku_id,
						assemble_id:this.item.item.assemble_id,
						coupon_id:this.counpId,
						invite_code:this.item.item.invite_code
					},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
							var datal = res.data.data
							 uni.login({
								provider: 'weixin',
                                success(res){
                                  if (res.code) {
                                    wx.request({
                                      url: 'https://zct.51kdd.com/index.php',
                                      data: {
                                        code: res.code,//要去换取openid的登录凭证
                                      },
                                      // method: 'GET',
                                      success(res) {
                                        wx.requestPayment({
                                          timeStamp: datal.timestamp,
                                          nonceStr: datal.noncestr,
                                          package: datal.package,
                                          signType: 'MD5',
                                          paySign: datal.paysign,
                                          success: function (res) {
                                            // success
                                             console.log(that.item.item.assemble_id)
											 if(that.item.item.assemble_id == ''){
											   	that.popo = true
											 	return
											   }else{
											 	  uni.request({
											 	  	url: that.http+'order/detail/' + datal.order_id,
											 	  	method: 'GET',
											 	  	header: {
											 	  		authKey: that.authKey
											 	  	},
											 	  	data: {
											 	  	},
											 	  	success: res => {
											 	  		if (res.data.code == 200) {
											 	  			console.log(res.data)
											 				 uni.request({
											 					url: that.http+'assemble/detail/' + res.data.data.assemble_id,
											 					method: 'GET',
											 					header: {
											 						authKey: that.authKey
											 					},
											 					data: {
											 					},
											 					success: res => {
											 						if (res.data.code == 200) {
											 							console.log(res.data)
											 							if(res.data.data.can_join == 0){
											 								uni.navigateTo({
											 									url: '/pages/groupSuccess/groupSuccess?id=' + datal.order_id
											 								});
											 								return
											 							}else{
											 								uni.navigateTo({
											 									url: '/pages/groupSuccess/spellGroup?id=' + datal.order_id
											 								});
											 								return
											 							}
											 						}
											 					},
											 				});
											 	  		}
											 	  	},
											 	  });
											   }
                                          },
                                          fail: function (res) {
                                            // fail
// 											 uni.request({
// 												url: that.http+'order/paynotify/' + datal.order_id,
// 												method: 'GET',
// 												header: {
// 													authKey: that.authKey
// 												},
// 												data: {
// 												},
// 												success: res => {
// 													if (res.data.code == 200) {
											              // console.log(res.data)
														
													// }
												// },
											// });
//                                             console.log(res);
											uni.showToast({
												title:'支付失败',
												icon:'none',
												duration:1500
											})
                                          },
                                          complete: function (res) {
                                            // complete
                                            console.log(res);
                                          }
                                        })
                                      }
                                    })
                                  } else {
                                    console.log('获取用户登录态失败！' + res.errMsg)
                                  }
                                }
                             });
						}
					},
				});
// 				 uni.navigateTo({
// 					url: '/pages/groupSuccess/spellGroup'
// 				});
			},
			godetail(){
				uni.navigateTo({
					url: '/pages/order/order?tabIndex=' + 0
				});
				this.popo = false
			},
			close(){
				this.popo = false
			}
		}
	}
</script>

<style>
	page{
	  background-color: #f3f3f3;
	}
    body .uni-page-head {
		border-bottom: 1px solid #f3f3f3;
	}
	.order-confirm{
		background-color: #fff;
		margin-top: 2upx;
	}	
	.gray{
		color: #999999;
	}
	.orderTit{
		font-size: 28upx;
		color: #333333;
		padding: 30upx 30upx;
	}
	.orderTit img{
		width: 40upx;
	    height: 40upx;
		border-radius: 50%;
		vertical-align: middle;
		margin-right: 10upx;
	}
	.orderCont{
		background-color: #f5f5f5;
		padding: 30upx 30upx;
		display: flex;
		
	}
	.orderTxt{
		width: 59%;
	}
	.orderCont .orderImg{
		width: 178upx;
		height: 178upx;
		margin-right: 20upx;
	}
	.orderCont .orderImg img{
		width: 100%;
		height: 100%;
    }
	.orderCont .txtTit{
		font-size: 30upx;
		color: #333333;
	}
	.orderCont .txtDri{
		font-size: 22upx;
	}
	.orderCont .txtSpec{
		font-size: 22upx;
	}
	.orderCont .price{
		font-size: 30upx;
		color: #333;
	}
	.listShow{
		border-bottom: 1px solid #f3f3f3;
		position: relative;
		padding: 30upx 30upx;
		font-size: 28upx;
	}
	.listShow .left{
		color: #333333;
		font-size: 28upx;
	}
	.listShow .right{
		position: absolute;
		top:30upx;
		right: 30upx;
	}
	.Confirm{
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		background-color: #fff;
	}
	.red{
		color: #dd3e34;
		font-size: 36upx;
	}
	.money{
		width: 60%;
		text-align: right;
		margin-right: 30upx;
		padding: 26upx 0;
		font-size: 28upx;
	}
	.pay{
		width: 40%;
		padding: 26upx 0;
		text-align: center;
		background-color: #dd3e34;
		color: #fff;
		font-size: 36upx;
	}
	.groupMore{
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .6);
	}
	.purchase .purchaseN{
		width: 100%;
		position: absolute;
		right: 0;
		bottom: 0;
		background: #FFFFFF;
		height: 800upx;
	}
	.discountsTit{
		text-align: center;
		padding: 30upx 0;
	}
	.discountsList{
		margin: 0 30upx;
		max-height: 600upx;
		overflow: auto;
		margin-bottom: 120upx;
	}
	.discountsList .listShow{
		padding: 30upx 0;
	}
	.discountsList .right{
		top:40upx;
		right: 0;
	}
	.discountsList .right img{
		width: 28upx;
		height: 28upx;
	}
	.confirm-close{
		position: absolute;
		bottom: 0;
		width: 100%;
		background-color: #dd3e34;
		color: #fff;
		text-align: center;
		padding: 30upx 0;
	}
</style>
