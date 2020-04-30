<template>
	<view class="tech">
		<view class="technicians">
			<view class="cont" v-for="(li,index) in list" :key="li.id" @tap="choose(li)">
				<view class="img"><img :src="li.avatarurl" alt=""></view>
				<view class="txt">
					<view class="tit"><span class="name">{{li.realname}}</span><span class="tip">{{li.title}}</span></view>
				    <view class="text">服务{{li.service_times}}次    {{li.experience}}年经验</view>
					<view class="text">好评率{{li.good_evaluate_rate}}%</view>
				</view>
				<view class="right"><span class="choose" :class="isaa == index ? 'ye':'not'"></span></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authKey:'',
				isaa:0,
				list:'',
				jid:'',
				biId:'',
				sid:''
			};
		},
		onLoad(e) {
			this.sid = e.sid
			this.authKey = uni.getStorageSync('authKey');
			this.teach();
		},
		methods:{
			// 获取技师
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
			choose(item){
				// var pages = getCurrentPages();
				// var prevPage = pages[pages.length - 2]; //上一个页面
// 				prevPage.setData({
// 						id:this.biId,
// 						jid:this.jid,
// 				})

				uni.setStorageSync('jishi', item)
				uni.navigateBack()
				// if(this.sid == 1){
				// 	uni.redirectTo({
				// 		url: '/pages/reservationService/coldCalling?ji=' + JSON.stringify(item)
				// 	});
				// }else{
				// 	uni.redirectTo({
				// 		url: '/pages/reservationService/store?ji=' + JSON.stringify(item)
				// 	});
				// }
			},
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
	  font-size: 20upx;
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
   .sure{
  	  padding: 80upx 0;
  }
  .sure .invite{
  	  width: 34%;
  	  margin-left: 33%;
  	  text-align: center;
  	  font-size: 30upx;
  }
  .choose{
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
</style>
