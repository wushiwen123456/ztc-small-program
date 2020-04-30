<template>
	<view class="technicians">
		<view class="cont" v-for="(li,index) in list" :key="index">
			<view class="img"><img :src="li.avatarurl" alt=""></view>
			<view class="txt">
				<view class="tit"><span class="name">{{li.realname}}</span><span class="tip">{{li.title}}</span></view>
			    <view class="text">服务{{li.service_times}}次    {{li.experience}}年经验</view>
				<view class="text">好评率{{li.good_evaluate_rate}}%</view>
			</view>
			<view class="right" @tap="reservations(li.id)"><view class="invite">在线预约</view></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authKey:"",
				list:''
			};
		},
		onLoad: function() {
			this.authKey = uni.getStorageSync('authKey');
			// console.log(this.authKey)
			this.teach()
		},
		methods:{
			teach(){
				let that = this
				uni.request({
					url: this.http+'home/myMassagists',
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {
					},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
							let temp = res.data.data
							temp.forEach(function(item){
								item.avatarurl = that.static + item.avatarurl
							})
							that.list = temp
						}
					},
				});
			},
			reservations(e){
				uni.navigateTo({
					url: '/pages/mine/reducible/reducible?jid=' + e
				});
			}
		}
	}
</script>

<style>
page{
		background-color: #f3f3f3;
	}
  .cont{
	  margin-top: 2upx;
	  background-color: #fff;
	  display: flex;
	  padding: 20upx 30upx;
	  position: relative;
  }
  .cont .img{
	  width: 130upx;
	  height: 130upx;
	  background-color: #f3f3f3;
	  border: solid 1upx #d4d4d4;
	  border-radius: 50%;
  }
  .cont .txt{
	  margin-left: 20upx;
  }
  .cont .txt .tit .name{
	  font-size: 36upx;
  }
  .cont .txt .tit .tip{
	  background-color: #fff5e4;
	  border-radius: 1upx;
	  font-size: 22upx;
	  letter-spacing: 1upx;
	  color: #b37d1d;
	  padding: 2upx 10upx;
	  margin-left: 20upx;
  }
  .cont .txt .text{
	  font-size: 22upx;
	  color: #666666;
  }
  .cont .right{
	  top:60upx;
	  right: 30upx;
  }
  .cont .right .invite{
	  padding: 6upx 20upx;
  }
</style>
