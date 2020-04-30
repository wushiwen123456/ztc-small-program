<template>
	<view class="reservation">
		<view class="reser">
			<view class="img"><img :src="product.cover" alt=""></view>
			<view class="cont">
				<view class="tit">{{product.name}}</view>
				<view class="txt ell">{{product.introduction}}</view>
				<view class="txt" style="margin-top: 10upx;"><img src="../../static/time.png" alt="">{{product.cost}}分钟</view>
			</view>
		</view>
		<view class="serve">
			<view class="title">服务类型</view>
			<view class="type">
				<view class="typeP"  @tap="go(1)">
					<span class="choose" :class="isaa == 1 ? 'ye':'not'" ></span>
					<view class="tit bbore">
						<view class="name">上门服务</view>
						<view class="address"><img src="../../static/reser1.png" alt="">限延吉市三环内区域</view>
					</view>
				</view>
				<view class="typeP"  @tap="go(2)">
					<span class="choose" :class="isaa == 2 ? 'ye':'not'" ></span>
					<view class="tit">
						<view class="name">到店服务</view>
						<view class="address"><img src="../../static/reser1.png" alt="">延边医院东侧鑫田大厦4楼413 直纯堂 </view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isaa:1,
				biId:'',
				tid:'',
				content:'',
				authKey:'',
				product:''
			};
		},
		onLoad(e) {
			this.authKey = uni.getStorageSync('authKey');
			this.biId = e.id
			// console.log(this.biId)
			this.detail();
		},
		methods:{
			detail(){
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
							this.content = res.data.data
							this.product = res.data.data.product
							this.product.cover = this.static +　this.product.cover
						}
					},
				});
			},
			go(e){
				this.isaa = e
				if(e==1){
					uni.navigateTo({
						url: '/pages/reservationService/coldCalling?id=' + this.biId
					});
				}else{
					uni.navigateTo({
						url: '/pages/reservationService/store?id=' + this.biId
					});
				}
			},
		}
		
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
    .reser{
    	margin-top: 1upx;
		display: flex;
		padding: 20upx 30upx;
		background-color: #fff;
    }
	.reser .img{
		width: 178upx;
	    height: 178upx;
		margin-right: 20upx;
	}
	.reser .cont{
	    width: 400upx;
	}
	.cont .tit{
		font-size: 30upx;
		color: #333333;
	}
	.cont .txt{
		font-size: 24upx;
		color: #999999;
	}
	.cont .txt img{
		width: 22upx;
	    height: 22upx;
		margin-right: 10upx;
		vertical-align: middle;
	}
	.serve .title{
		margin-top: 20upx;
		background-color: #fff;
		padding: 20upx 30upx;
	}
	.serve .type{
		margin-top: 1upx;
		background-color: #fff;
	}
	.serve .type .typeP{
		padding-left: 40upx;
	}
	.serve .type .typeP .choose{
		margin-right: 10upx;
		position: relative;
		top:-20upx;
		display: inline-block;
		width: 40upx;
		height: 40upx;
	}
	.not{
		background: url(../../static/circle.png) no-repeat;
		background-size: 100% 100%;
	}
	.ye{
		background: url(../../static/circle-select.png) no-repeat;
		background-size: 100% 100%;
	}
	.serve .type .typeP .tit{
		padding: 20upx 0;
		display: inline-block;
		width: 90%;
	}
	.serve .type .typeP .tit .name{
		font-size: 30upx;
		letter-spacing: 2upx;
	    color: #333333;
	}
	.serve .type .typeP .tit .address{
		font-size: 24upx;
	    color: #999999;
		
	}
	.serve .type .typeP .tit .address img{
		width: 24upx;
		height: 30upx;
		vertical-align: middle;
		margin-right: 10upx;
	}
	.serve .type .bbore{
		border-bottom: 1upx solid #f3f3f3;
	}
</style>
