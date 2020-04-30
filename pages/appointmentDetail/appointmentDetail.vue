<template>
	<view class="appoint">
		<view class="reser">
			<view class="img"><img :src="appoint.product.cover" alt=""></view>
			<view class="cont">
				<view class="tit">{{appoint.product.name}}</view>
				<view class="txt ell">{{appoint.product.introduction}}</view>
				<view class="txt" style="margin-top: 10upx;"><img src="../../static/time.png" alt="">{{appoint.product.cost}}分钟</view>
			</view>
		</view>
		<view class="tite red">上门服务</view>
		<view class="serlist">
			<view class="listv" v-if="appoint.mode == 2">
				<view class="img"><img src="../../static/ser1.png" alt=""></view>
				<view class="input"><span>联系人：</span>{{appoint.contact}}</view>
			</view>
			<view class="listv" v-if="appoint.mode == 2">
				<view class="img"><img src="../../static/ser2.png" alt=""></view>
				<view class="input"><span>联系电话：</span>{{appoint.phone}}</view>
			</view>
			<view class="listv" v-if="appoint.mode == 2">
				<view class="img"><img src="../../static/ser3.png" alt=""></view>
				<view class="input"><span>上门地址：</span> <span class="address">{{appoint.address}}</span></view>
			</view>
			<view class="listv" v-if="appoint.mode == 1">
				<view class="img"><img src="../../static/ser3.png" alt=""></view>
				<view class="input"><span>到店地址：</span> <span class="address">{{appoint.address}}</span></view>
			</view>
			<view class="listv" style="border-bottom: none;">
				<view class="img"><img src="../../static/ser4.png" alt=""></view>
				<view class="input"><span>服务时间：</span>{{appoint.create_time}}</view>
			</view>
			<view class="listv">
				<view class="img"><img src="../../static/ser5.png" alt=""></view>
				<view class="input"><span>备注：</span>{{appoint.remark}}</view>
			</view>
		</view>
		<view class="tite red" v-if="appoint.mode == 2">费用</view>
		<view class="doors" v-if="appoint.mode == 2">
			<view class="left">上门费</view>
			<view class="right red">¥{{appoint.drop_in_fee}}</view>
		</view>
		<view class="technicians">
			<view class="tech">
				<view class="left red">我的技师</view> 
			</view>
			<view class="cont">
				<view class="img"><img :src="appoint.massagist.avatarurl" alt=""></view>
				<view class="txt">
					<view class="tit"><span class="name">{{appoint.massagist.realname}}</span><span class="tip">{{appoint.massagist.title}}</span></view>
				    <view class="text">服务{{appoint.massagist.service_times}}次    {{appoint.massagist.experience}}年经验</view>
					<view class="text">好评率{{appoint.massagist.good_evaluate_rate}}%</view>
				</view>
			</view>
		</view>
		<view class="fixedB">
			<span class="invite" @tap="home">回到首页</span>
			<span class="invite" @tap="contant">联系技师</span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appoint:'',
				authKey:'',
				biId:''
			};
		},
		onLoad(e) {
			this.authKey = uni.getStorageSync('authKey');
			this.biId = e.id;
			this.getAppointment()
		},
		methods:{
			// 联系技师电话
			contant(){
				wx.makePhoneCall({
				    phoneNumber: this.appoint.massagist.phone
				});
			},
			// 预约成功详情
			getAppointment(){
				uni.request({
					url: this.http+'appointment/detail/' + this.biId,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {
					},
					success: res => {
						console.log(res)
						if (res.data.code == 200) {
							let appoint = res.data.data
							appoint.product.cover = this.static + appoint.product.cover
							appoint.massagist.avatarurl = this.static + appoint.massagist.avatarurl
							this.appoint = appoint
							// this.appoint.product.cover = this.static + this.appoint.product.cover
						}
					},
				});
			},
			home(){
				uni.reLaunch({
					url: '../knowledge/knowledge'
				});
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
	.reser .cont .tit{
		font-size: 30upx;
		color: #333333;
	}
	.reser .cont .txt{
		font-size: 24upx;
		color: #999999;
	}
	.reser .cont .txt img{
		width: 22upx;
	    height: 22upx;
		margin-right: 10upx;
		vertical-align: middle;
	}
	.tite{
		  padding: 20upx 30upx;
		  background-color: #fff;
		  margin-top: 20upx;
		  margin-bottom: 2upx;
		  font-size: 32upx;
	}
	.serlist{
		  margin-top: 1upx;
		   background-color: #fff;
	}
	.serlist .listv{
		  display: flex;
	}
	.serlist .listv .img{
		  margin-top: 22upx ;
		  margin-left: 30upx;
		  margin-right: 20upx;
		  width: 48upx;
		  height: 48upx;
		  vertical-align: middle;
	}
	.serlist .input{
		  border-bottom: 1upx solid #f3f3f3;
		  padding: 20upx 0;
		  width: 100%;
		  font-size: 28upx;
	}
	.serlist .input span{
		font-size: 30upx;
	}
	.address{
		width: 70%;
		display: inline-block;
		font-size: 24upx !important;
		vertical-align: middle;
	}
	.doors{
		background-color: #fff;
		position: relative;
		padding: 20upx 30upx;
	}
	.doors .right{
		right: 30upx;
		top:20upx;
	}
	 .technicians{
		  margin-top: 20upx;
		  margin-bottom: 220upx;
	}
	.technicians .tech{
		  padding: 20upx 30upx;
		  background-color: #fff;
		  position: relative;
	}
	.technicians .tech .right{
		  right: 30upx;
		  top:20upx;
	}
	.technicians .cont{
		  margin-top: 2upx;
		  background-color: #fff;
		  display: flex;
		  padding: 20upx 30upx;
	}
	.technicians .cont .img{
		  width: 130upx;
		  height: 130upx;
		  background-color: #f3f3f3;
		  border: solid 1upx #d4d4d4;
		  border-radius: 50%;
	}
	.technicians .cont .txt{
		  margin-left: 20upx;
	}
	.technicians .cont .txt .tit .name{
		  font-size: 36upx;
	}
	.technicians .cont .txt .tit .tip{
		  background-color: #fff5e4;
		  border-radius: 1upx;
		  font-size: 20upx;
		  letter-spacing: 1upx;
		  color: #b37d1d;
		  padding: 2upx 10upx;
		  margin-left: 20upx;
	}
	.technicians .cont .txt .text{
		  font-size: 22upx;
		  color: #666666;
	}
</style>
