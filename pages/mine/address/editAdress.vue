<template>
	<view class="address">
		<view class="serlist">
			<view class="listv">
				<view class="img"><img src="../../../static/ser1.png" alt=""></view>
				<view class="input"><input type="text" placeholder="联系人姓名" :value="nameValue" @input="nameInput" placeholder-style="color: #999999;"></view>
			</view>
			<view class="listv">
				<view class="img"><img src="../../../static/ser2.png" alt=""></view>
				<view class="input"><input type="text" placeholder="联系电话" :value="phoneValue" @input="phoneInput" placeholder-style="color: #999999;"></view>
			</view>
			<view class="listv">
				<view class="img"><img src="../../../static/addr1.png" alt=""></view>
				<view class="input"><input type="text" value="吉林省延吉市" disabled="" placeholder-style="color: #333;"></view>
			</view>
			<view class="listv">
				<view class="img"><img src="../../../static/ser3.png" alt=""></view>
				<view class="input"><input type="text" placeholder="小区、街道或大厦 " :value="streeValue" @input="streeInput" placeholder-style="color: #999999;"></view>
			</view>
			<view class="listv">
				<view class="img"><img src="../../../static/addr2.png" alt=""></view>
				<view class="input" style="border-bottom: none;"><input type="text" placeholder="请输入楼栋、门牌号等具体位置" :value="doorValue" @input="doorInput" placeholder-style="color: #999999;"></view>
			</view>
		</view>
		<view class="sure"><view class="invite" @tap="add()">保存</view></view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				biId:'',
				nameValue:'',
				phoneValue:'',
				streeValue:'',
				doorValue:'',
				authKey:''
			};
		},
		onLoad(e) {
			this.authKey = uni.getStorageSync('authKey');
			this.biId = e.id
			this.edit()
		},
		methods:{
			nameInput: function(e) {
				this.nameValue = e.target.value;
				console.log(this.nameValue)
			},
			phoneInput:function(e) {
				this.phoneValue = e.target.value;
				console.log(this.phoneValue)
			},
			streeInput:function(e) {
				this.streeValue = e.target.value;
				console.log(this.streeValue)
			},
			doorInput:function(e) {
				this.doorValue = e.target.value;
				console.log(this.doorValue)
			},
			// 获取地址详情
			edit(){
				uni.request({
					url: this.http+'home/getAddressDetail/' + this.biId,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {
					},
					success: res => {
						console.log(res)
						if (res.data.code == 200) {
							var ad = res.data.data
							this.nameValue = ad.name
							this.phoneValue = ad.phone
							this.streeValue = ad.road
							this.doorValue = ad.subdistrict
						}
					},
				});
			},
			// 修改地址
			add(){
				uni.request({
					url: this.http+'home/editAddress',
					method: 'POST',
					header: {
						authKey: this.authKey
					},
					data: {
						id:this.biId,
						name:this.nameValue,
						phone:this.phoneValue,
						city:'吉林省延吉市',
						road:this.streeValue,
						subdistrict:this.doorValue
					},
					success: res => {
						console.log(res)
						if (res.data.code == 200) {
							uni.navigateTo({
								url: '/pages/mine/address/address'
							});
						}
					},
				});
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
</style>