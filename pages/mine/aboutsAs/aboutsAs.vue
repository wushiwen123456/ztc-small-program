<template>
	<view class="about">
		<view class="image1">
		    <img src="http://test.51kdd.com/about1.png" alt="">
		</view>
		<view class="aboutList">
			<view class="alist" style="border-bottom: 1upx solid #f3f3f3;"><view class="left">直纯堂孕产康养会所</view><view class="right"></view></view>
			<view class="alist"><view class="left ell"><img src="../../../static/reser1.png" alt="">{{address}}</view><view class="right" @tap="phonenumber"><img src="../../../static/phone.png" alt=""></view></view>
		</view>
		<view class="image2">
		    <img src="http://test.51kdd.com/about2.png" alt="">
		</view>
		<view class="image3">
		    <img src="http://test.51kdd.com/about3.png" alt="">
		</view>
		<view class="image4">
		    <img src="http://test.51kdd.com/about4.png" alt="">
		</view>
		<view class="image5">
		    <img src="http://test.51kdd.com/about5.png" alt="">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authKey:'',
				phone:'',
				address:''
			};
		},
		onLoad() {
			this.authKey = uni.getStorageSync('authKey');
			this.getPhone();
		},
		methods:{
			phonenumber(){
				wx.makePhoneCall({
			        phoneNumber: this.phone
			    });
			},
			getPhone(){
				// 获取店铺电话
				uni.request({
					url: this.http+'appointment/getClubContact',
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
							this.phone = res.data.data
						}
					},
				});
				// 获取店铺地址
				uni.request({
					url: this.http+'appointment/getClubAddress',
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
			
		}
		
	}
</script>

<style>
.about .image1{
	width: 100%;
	height: 450upx;
}
.about .image2{
	width: 100%;
	height: 770upx;
}
.about .image3{
	width: 100%;
	height: 1500upx;
}
.about .image4{
	width: 100%;
	height: 1300upx;
}
.about .image5{
	width: 100%;
	height: 1300upx;
}
.aboutList .alist{
	padding: 0upx 30upx;
	position: relative;
	height: 100upx !important;
	line-height: 100upx !important;
}
.aboutList .alist .left{
	height: 100upx !important;
	line-height: 100upx !important;
	color: #333333;
	width: 80%;
}
.aboutList .alist .left img{
	width: 34upx;
	height: 44upx;
	vertical-align: middle;
	margin-right: 20upx;
}
.aboutList .alist .right{
	right: 30upx;
	color: #999;
	font-size: 40upx;
	top:20upx;
}
.aboutList .alist .right img{
	width: 40upx;
	height: 48upx;
}
</style>
