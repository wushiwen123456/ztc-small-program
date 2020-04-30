<template>
	<view class="detail">
		<view class="listo">	
		    <view class="title"> 
			   <view class="left"><img src="../../static/logohead.png" alt="">直纯堂孕产康养</view>
			</view>
			<view class="content">
				<view class="imgz"><img :src="content.product.cover" alt=""></view>
				<view class="cont">
					<view class="tit">{{content.product.name}}</view>
					<view class="txt ell">{{content.product.introduction}}</view>
					<view class="txt">规格: {{content.sku.name}}次<span>({{content.sku.times}})</span>；</view>
				</view>
				<view class="price">¥{{content.sku.price}}</view>
			</view>
			<view class="title titrig"> 
			   <view class="left">剩余服务次数</view>
			   <view class="right">{{content.service_times}}</view>
			</view>
			<view class="title titrig" v-if="free>0"> 
			   <view class="left">赠送免费上门服务次数</view>
			   <view class="right">{{free}}</view>
			</view>
			<view class="title" style="padding: 20upx 0;"> 
			    <view class="gray">
				    <view class="left">服务总价</view>
				    <view class="right"> ¥ {{content.sku.price}}</view>
			    </view>
			   <view class="gray">
			    	<view class="left">拼团折扣</view>
			    	<view class="right"> ¥ 0</view>
			    </view>
			    <view class="gray">
			    	<view class="left">现金券抵扣</view>
			    	<view class="right"> ¥ 0</view>
			    </view>
				<view class="totale">
					<view class="left">订单合计</view>
					<view class="right"> ¥ {{content.amount}}</view>
				</view>
				<view class="borderImg"><img src="../../static/od2.png" alt=""></view>
				<view class="totale" style="margin-top: 50upx;padding-bottom: 20upx;">
					<view class="left">实付款</view>
					<view class="right red"> ¥ {{content.amount}}</view>
				</view>
			</view>
		</view>
		<view class="information">
			<view class="info">
				<span>订单编号: {{content.number}}</span>
				<span class="borderG" @tap="copy(content.number)">复制</span>
			</view>
			<view class="info">
				<span>支付方式: 微信</span>
			</view>
			<view class="info">
				<span>创建时间: {{content.create_time}}</span>
			</view>
		</view>
		<view class="fixedB">
			<!-- <span  v-if="content.type == '待预约'" class="invite" @tap="reser">预约服务</span> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				biId:'',
				content:'',
				authKey:'',
				free:''
			};
		},
		onLoad(e) {
			this.authKey = uni.getStorageSync('authKey');
			this.biId = e.id;
			this.getListDetail();
			console.log(e.id)
		},
		methods:{
			// 获取订单详情
			getListDetail(){
				var that = this;
				uni.request({
					url: this.http+'order/detail/' + this.biId,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
							let content = res.data.data
							content.product.cover = that.static + content.product.cover
							that.content = content
							that.free = content.sku.fee_reduce_count
						}
					},
				});
				// 免费上门次数
				// uni.request({
				// 	url: this.http+'home/reduce',
				// 	method: 'GET',
				// 	header: {
				// 		authKey: this.authKey
				// 	},
				// 	data: {},
				// 	success: res => {
				// 		console.log(res.data)
				// 		if (res.data.code == 200) {
				// 			this.free = res.data.data
				// 		}
				// 	},
				// });
			},
			copy(e){
				uni.setClipboardData({
                    data: e,
                    success: function () {
                        uni.showToast({
                        	title:'复制成功',
                        	icon:'none',
                        	duration:1500
                        })
                    }
                });
			},
			reser(){
				 uni.navigateTo({
					url: '/pages/reservationService/reservationService'
				});
			}
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
	.detail{
		margin-top: 1upx;
	}
   
	.listo{
			/* margin-top: 20upx; */
		}
	.title{
	    position: relative;
	    background-color: #fff;
		margin-bottom: 1px;
		padding: 20upx 30upx;
	    color: #333333;
	}
	.title .gray{
		position: relative;
		padding: 0upx 30upx;
	}
	.title .gray .left{
		font-size: 24upx;
	}
	.titrig .right{
		top:20upx;
	}
	.title .gray .right{
		right: 30upx;
		font-size: 24upx;
		top:0upx;
	}
	.title .totale{
		position: relative;
		padding: 0upx 30upx;
	}
	.title .totale .left{
		font-size: 26upx;
	}
	.title .totale .right{
		right: 30upx;
		font-size: 32upx;
		top:0;
	}
	.borderImg{
		width: 100%;
		height: 16upx;
	}
	.title .left img{
		width: 55upx;
		height: 55upx;
		border-radius: 100%;
		margin-right: 20upx;
		vertical-align: middle;
	}
	.title .right{
		right: 30upx;
	}
	.photo .left img{
		margin-right: -8upx;
		border: 1px solid #fff;
	}
	.photo .right {
		font-size: 24upx;
	}
	.photo .right .price{
		margin-left: 20upx;
	}
	.content{
		display: flex;
		padding: 20upx 30upx;
	}
	.content .imgz{
		width: 178upx;
	    height: 178upx;
	    background-color: #535353;
	    border: solid 1px #dddddd;
	}
	.content .cont{
		margin-left: 20upx;
		width: 400upx;
	}
	.content .cont .tit{
		font-size: 30upx;
		color: #333333;
	}
	.content .cont .txt{
		font-size: 24upx;
		color: #999999;
	}
	.price{
		font-size: 32upx;
	}
	.bottom{
		background-color: #fff;
		text-align: right;
		padding: 30upx;
	}
	.bottom span{
		margin-left: 30upx;
	}
	.information{
		margin-top: 20upx;
		padding: 30upx 30upx;
		background-color: #fff;
		margin-bottom: 220upx;
	}
	.information .info{
		font-size: 24upx;
	    letter-spacing: 1upx;
	    color: #999999;
	}
	.information .info .borderG{
		padding: 6upx 20upx;
		font-size: 24upx;
		color: #666666;
		margin-left: 60upx;
	}
</style>
