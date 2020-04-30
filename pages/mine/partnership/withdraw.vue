<template>
	<view class="withdraw">
		<view class="with">
			<view class="tit">提现金额</view>
			<view class="money">
				<span>￥</span><input type="text" placeholder="请输入金额" :value="money" @input="moneyInput" placeholder-style="color:#333333;font-size: 72upx;">
			</view>
			<view class="tite">当前余额¥{{part}}，<span @tap="all">全部提现</span></view>
			<view class="btn"><view class="invite" @tap="withdraw">提交</view></view>
		</view>
		<view class="pop" v-if="popo">
			<view class="popN">
				<view class="close" @tap="close"><img src="../../../static/close1.png" alt=""></view>
				<view class="content">
					<view><span class="red">提交成功！</span>客服将在1-3个工作日内电话联系您转账，请注意接听！</view>
				</view>
				<view class="red" @tap="godetail()">知道了</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money:'',
				authKey:'',
				part:'',
				popo:false
			};
		},
		onLoad(e) {
			this.authKey = uni.getStorageSync('authKey');
			this.join();
		},
		methods:{
			moneyInput: function(e) {
				this.money= e.target.value;
				console.log(this.money)
			},
			all(){
				this.money = this.part
			},
			// 获取金额
			join(){
				uni.request({
					url: this.http+'copemate/homepage',
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
			                 this.part = res.data.data.income
						}
					},
				});
			},
			// 提现
			withdraw(){
				if(this.money==''){
					 uni.showToast({
						title: '请输入提现金额',
						icon:'none',
						mask: false,
						duration: 1500
					});
					return
				}
				if(this.money > this.part){
					uni.showToast({
						title: '提现余额不足',
						icon:'none',
						mask: false,
						duration: 1500
					});
					return
				}
				uni.request({
					url: this.http+'copemate/withdraw',
					method: 'POST',
					header: {
						authKey: this.authKey
					},
					data: {
						amount:this.money
					},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
				             uni.showToast({
				             	title: '提现成功',
				             	icon:'none',
				             	mask: false,
				             	duration: 1500
				             });
							 this.join();
							 this.popo = true
						}else{
							uni.showToast({
								title: res.data.error,
								icon:'none',
								mask: false,
								duration: 1500
							});
						}
					},
				});
			},
			close(){
				this.popo = false
			},
			godetail(){
				this.popo = false
			},
		}
	}
</script>

<style>
page{
	background-color: #f3f3f3;
}
.with{
	background-color: #fff;
	margin:20upx 30upx;
	height: 440upx;
	padding: 50upx 60upx;
}
.tit{
	font-size: 26upx;
	color: #333333;
}
.money {
	border-bottom: 1px solid #d4d4d4;
	padding: 20upx 0;
	display: flex;
}
.money span{
	font-size: 60upx;
	color: #333333;
	font-weight: bold;
}
.money input{
	font-size: 60upx;
	font-weight: bold;
	height: 100upx;
	margin-left: 20upx;
}
.tite{
	color: #999999;
	font-size: 26upx;
	padding: 20upx 0;
}
.tite span{
	color: #5f729a;
}
.btn{
	text-align: center;
	margin-top: 40upx;
}
.btn .invite{
	width: 60%;
	border-radius: 30upx;
	margin-left: 18%;
}
.content view{
	padding: 20upx 40upx;
	font-size: 30upx!important;
	color: #333;
}
</style>