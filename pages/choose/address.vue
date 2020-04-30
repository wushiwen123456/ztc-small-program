<template>
	<view class="address">
		<view class="serlist">
			<view class="listv">
				<view class="img"><img src="../../static/ser1.png" alt=""></view>
				<view class="input"><input type="text" placeholder="联系人姓名" :value="nameValue" @input="nameInput" placeholder-style="color: #999999;"></view>
			</view>
			<view class="listv">
				<view class="img"><img src="../../static/ser2.png" alt=""></view>
				<view class="input"><input type="text" placeholder="联系电话" :value="phoneValue" @input="phoneInput" placeholder-style="color: #999999;"></view>
			</view>
			<view class="listv">
				<view class="img"><img src="../../static/addr1.png" alt=""></view>
				<view class="input"><input type="text" value="吉林省延吉市" disabled="" placeholder-style="color: #333;"></view>
			</view>
			<view class="listv">
				<view class="img"><img src="../../static/ser3.png" alt=""></view>
				<view class="input"><input type="text" placeholder="小区、街道或大厦 " :value="streeValue" @input="streeInput" placeholder-style="color: #999999;"></view>
			</view>
			<view class="listv" >
				<view class="img"><img src="../../static/addr2.png" alt=""></view>
				<view class="input" style="border-bottom: none;"><input type="text" placeholder="请输入楼栋、门牌号等具体位置" :value="doorValue" @input="doorInput" placeholder-style="color: #999999;"></view>
			</view>
		</view>
		<view class="sure"><view class="invite" @tap='add'>确定</view></view>
		<view class="tite red">常用地址</view>
		<view class="addess">
			<view class="tite" v-for="(ae,index) in address" :key="index" @tap="choose(ae)">
				<view>{{ae.name}} <span class="gray">{{ae.phone}}</span></view>
				<view class="top">{{ae.city}}{{ae.road}}</view>
				<view class="bottom">{{ae.subdistrict}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authKey:'',
				nameValue:'',
				phoneValue:'',
				streeValue:'',
				doorValue:'',
				jid:'',
				biId:'',
				address:[],
			};
		},
		onLoad(e){
			this.jid = e.jid
			this.biId = e.id
			this.authKey = uni.getStorageSync('authKey');
			uni.setStorageSync('address', '')
			this.getAdress();
		},
		methods:{
			// 获取地址
			getAdress(){
				uni.request({
					url: this.http+'home/getAddressList',
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						console.log(res.data.data)
						if (res.data.code == 200) {
							this.address = res.data.data
						}
					},
				});
			},
			nameInput: function(e) {
				this.nameValue = e.target.value;
			},
			phoneInput:function(e) {
				this.phoneValue = e.target.value;
			},
			streeInput:function(e) {
				this.streeValue = e.target.value;
			},
			doorInput:function(e) {
				this.doorValue = e.target.value;
			},
			// 添加地址
			add(){
				uni.request({
					url: this.http+'home/addAddress',
					method: 'POST',
					header: {
						authKey: this.authKey
					},
					data: {
						name:this.nameValue,
						phone:this.phoneValue,
						city:'吉林省延吉市',
						road:this.streeValue,
						subdistrict:this.doorValue
					},
					success: res => {
						if (res.data.code == 200) {
							this.getAdress();
							this.nameValue = ''
							this.phoneValue = ''
							this.streeValue = ''
							this.doorValue = ''
						}else{
							uni.showToast({
								title:res.data.error,
								icon:'none',
								duration:1500
							})
						}
					},
				});
			},
			choose(item){
				uni.setStorageSync('address',item)
				uni.navigateBack()
// 				uni.navigateTo({
// 					url: '/pages/reservationService/coldCalling?id=' + this.biId +'&jid=' +this.jid
// 				});
				
			}
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
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
	  padding: 25upx 0;
	  width: 100%;
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
  .tite{
	  padding: 20upx 30upx;
	  background-color: #fff;
	  margin-top: 2upx;
  }
  .tite .top{
	  font-size: 28upx;
	  color: #333333;
  }
  .tite .bottom{
	  font-size: 28upx;
	  color: #999999;
  }
  .tite .gray{
  	font-size: 22upx;
  	margin-left: 30upx;
  	letter-spacing: 0;
  }
</style>

