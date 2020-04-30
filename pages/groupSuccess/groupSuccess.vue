<template>
	<view class="groupS">
		<view class="top">
			<view class="tip">
				<img src="../../static/success.png" alt=""> 拼团成功
			</view>
			<view class="buttonR">好友拼团齐省{{detail.save}}元</view>
			<view class="img">
				<view class="groupImg pin">
					<span class="spell">拼主</span>
					<img :src="detail.master.avatarurl" alt="">
				</view>
				<view class="groupImg" v-for="(dd,index) in detail.followers" :key="index">
					<img :src="dd.user.avatarurl" alt="">
				</view>
			</view>
		</view>
		<view class="list">
			<view class="listn"><view class="left">服务名称</view><view class="right">{{detail.product.name}}</view></view>
			<view class="listn"><view class="left">拼团时间</view><view class="right">{{detail.create_time}}</view></view>
			<view class="listn"><view class="left">拼团须知</view><view class="right gray">· 好友拼团 · 人满成功 · 人不满退款</view></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				biId:'',
				authKey:'',
				detail:''
			};
		},
		onLoad(e) {
			this.authKey = uni.getStorageSync('authKey');
			this.biId = e.id;
			this.getOrder();
		},
		methods:{
			// 获取拼团信息
			getOrder(){
				var that = this
				uni.request({
					url: that.http+'order/detail/' + this.biId,
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
					       			this.detail = res.data.data
					       		}
					       	},
					       });
						}
					},
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
	.groupS{
		margin-top: 1upx;
	}
	.top{
		background-color: #fff;
	}
    .tip{
    	text-align: center;
    	color: #1ecd16;
    	letter-spacing: 3upx;
    	font-size: 30upx;
		padding-top: 40upx;
    }
    .tip img{
    	width: 34upx;
    	height: 34upx;
    	vertical-align: middle;
    	margin-right: 10upx;
    }
	.img{
		width: 100%;
		text-align: center;
		padding-bottom: 100upx;
	}
	.groupImg{
		display: inline-block;
		width: 100upx;
	    height: 100upx;
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
	.list .listn:nth-last-child(1){
		border-bottom: none;
	}
	.ell{
		width: 50%;
	}
</style>
    