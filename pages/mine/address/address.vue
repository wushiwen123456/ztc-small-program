<template>
	<view class="address">
		<view class="addressList">
			<view class="addressed" v-for="(aa,index) in address" :key="index">
				<view class="text">
					<view>{{aa.name}} <span style="margin-left: 30upx;">{{aa.phone}}</span></view>
					<view>{{aa.city}}{{aa.road}}</view>
					<view>{{aa.subdistrict}}</view>
				</view>
				<view class="operate">
					<span @tap="delet(aa.id)"><img src="../../../static/add2.png" alt="">删除</span>
					<span @tap="edit(aa.id)"><img src="../../../static/add1.png" alt="" >编辑</span>
				</view>
			</view>
		</view>
		<view class="buttonR" @tap="addAddress()">添加新地址</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authKey:'',
				address:''
			};
		},
		onLoad(){
			this.authKey = uni.getStorageSync('authKey');
		},	
		onShow(){
			this.getAdress();
		},
		methods:{
			// 获取地址列表
			getAdress(){
				uni.request({
					url: this.http+'home/getAddressList',
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
							this.address = res.data.data
						}
					},
				});
			},
			edit(e){
				uni.navigateTo({
					url: '/pages/mine/address/editAdress?id=' + e
				});
			},
			// 删除地址
			delet(e){
				uni.request({
					url: this.http+'home/delAddress/' + e,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
							uni.showToast({
								title:'删除地址成功',
								icon:'none',
								duration:1500
							})
							this.getAdress();
						}
					},
				});
			},
			addAddress(){
				uni.navigateTo({
					url: '/pages/mine/addAddress/addAddress'
				});
			}
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
    .address{
    	margin-top: 1upx;
    }
	.addressed{
		margin-bottom: 20upx;
	}
	.addressed .text{
		background-color: #fff;
		padding: 20upx 30upx;
	}
	.addressed .text .gray{
		font-size: 22upx;
		margin-left: 30upx;
		letter-spacing: 0;
	}
	.addressed .text view{
		font-size: 28upx;
		/* letter-spacing: 2upx; */
	    color: #333333;
	}
	.operate{
		margin-top: 2upx;
		background-color: #fff;
		text-align: right;
		padding: 20upx 0;
	}
	.operate span{
		margin-right: 40upx;
		font-size: 28upx;
	}
	.operate span img{
		width: 34upx;
		height: 34upx;
		vertical-align: middle;
		margin-right: 10upx;
		position: relative;
		top:-6upx;
	}
	.buttonR{
		margin-top: 100upx;
	}
</style>
