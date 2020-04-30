<template>
	<view class="detail">
		<view class="top">
			<view class="tip">
				<block v-if="content && content.assemble.status == 1">
					<view class="countdown"><img src="../../static/od1.png" alt="">拼团中<span style="color: #dd3e34;position: absolute;right: 30upx;">{{content.type}}，还差{{content.assemble.can_join}}人</span></view>
					<view class="countdown" style="margin-left: 58rpx;">拼团倒计时：{{content.assemble.remaining}}</view>
				</block>
				<view v-if="content && content.assemble.status == 2" class="countdown"><img src="../../static/od1.png" alt="">拼团成功</view>
				<block v-if="content && content.assemble.status == 0">
					<view class="countdown"><img src="../../static/od1.png" alt="">拼团失败</view>
					<view v-if="content && content.assemble.refund_status == 0" class="countdown" style="margin-left: 58rpx;">退款状态：未退款</view>
					<view v-if="content && content.assemble.refund_status == 1" class="countdown" style="margin-left: 58rpx;">退款状态：已退款</view>
				</block>
			</view>
			<view class="img">
				<view class="groupImg pin">
					<span class="spell">拼主</span>
					<img v-if="content" :src="content.assemble.master.avatarurl" alt="">
				</view>
				<block v-if="content && content.assemble.followers.length > 0">
					<view class="groupImg"  v-for="(aa,index) in content.assemble.followers" :key="index">
						<img :src="aa.user.avatarurl" alt="">
					</view>
				</block>
				
				<!-- <view class="right borderG" @tap="detail()">查看详情</view> -->
			</view>
		</view>
		<view class="listo">	
		    <view class="title"> 
			   <view class="left"><img src="../../static/logohead.png" alt="">直纯堂孕产康养</view>
			</view>
			<view v-if="content && content.product" class="content">
				<view class="imgz"><img :src="content.product.cover" alt=""></view>
				<view class="cont">
					<view class="tit">{{content.product.name}}</view>
					<view class="txt ell">{{content.product.introduction}}</view>
					<view class="txt">规格: {{content.sku.tiems}}次<span>({{content.sku.name}})</span>；{{content.assemble.category.name}}</view>
				</view>
				<view v-if="content && content.sku" class="price">¥{{content.sku.price}}</view>
			</view>
			<view class="title titrig"> 
			   <view class="left">剩余服务次数</view>
			   <view v-if="content" class="right">{{content.service_times}}</view>
			</view>
			<view class="title titrig"> 
			   <view class="left">赠送免费上门服务次数</view>
			   <view class="right">{{free}}</view>
			</view>
			<view class="title" style="padding: 20upx 0;"> 
			    <view class="gray">
				    <view class="left">服务总价</view>
				    <view v-if="content && content.sku" class="right"> ¥ {{content.sku.price}}</view>
			    </view>
			    <!-- <view class="gray">
			    	<view class="left">拼团折扣</view>
			    	<view class="right"> ¥ {{content.sku.price}}</view>
			    </view>
			    <view class="gray">
			    	<view class="left">现金券抵扣</view>
			    	<view class="right"> ¥ </view>
			    </view> -->
				<view class="totale">
					<view class="left">订单合计</view>
					<view v-if="content" class="right"> ¥ {{content.amount}}</view>
				</view>
				<view class="borderImg"><img src="../../static/od2.png" alt=""></view>
				<view class="totale" style="margin-top: 50upx;padding-bottom: 20upx;">
					<view class="left">实付款</view>
					<view v-if="content" class="right red"> ¥ {{content.amount}}</view>
				</view>
			</view>
		</view>
		<view class="information">
			<view v-if="content" class="info">
				<span>订单编号: {{content.number}}</span>
				<span class="borderG" @tap="copy(content.number)">复制</span>
			</view>
			<view class="info">
				<span>支付方式: 微信</span>
			</view>
			<view class="info">
				<span v-if="content">创建时间: {{content.create_time}}</span>
			</view>
		</view>
		<view class="fixedB">
			<span class="invite" v-if="content.type == '待预约'">预约服务</span>
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
		},
		methods:{
			// 获取服务详情
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
			detail(){
				uni.navigateTo({
					url: '/pages/groupSuccess/groupSuccess?id=' + this.biId
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
    .top{
		background-color: #fff;
	}
    .tip{
    	color: #333;
    	letter-spacing: 3upx;
    	font-size: 30upx;
		padding: 40upx 30upx 20upx 30upx;
    }
    .tip img{
    	width: 48upx;
    	height: 36upx;
    	vertical-align: middle;
    	margin-right: 10upx;
    }
	.img{
		width: 100%;
		padding-bottom: 40upx;
		margin-left: 80upx;
		position: relative;
	}
	.img .right{
		right: 120upx;
		top:40upx;
	}
	.img .borderG{
		padding:6upx 10upx ;
		font-size: 26upx;
		color: #999;
	}
	.groupImg{
		display: inline-block;
		width: 78upx;
	    height: 78upx;
		border-radius: 100%;
		position: relative;
		margin-left: 20upx;
		margin-top: 20upx;
	}
	.groupImg img{
		border-radius: 100%;
	}
	.pin{
		border: solid 4upx #dd3e34;
	}
	.spell{
		position: absolute;
		left: -10upx;
		top:-10upx;
		background-color: #dd3e34;
		color: #fefefe;
		font-size: 22upx;
		border-radius: 17upx;
		padding: 0 10upx;
	}
	.listo{
			margin-top: 20upx;
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
	.titrig .right{
		top:20upx;
	}
	.title .gray .left{
		font-size: 24upx;
	}
	.title .gray .right{
		right: 30upx;
		font-size: 24upx;
		top:0;
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
		font-size: 20upx;
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
		margin-bottom: 180upx;
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