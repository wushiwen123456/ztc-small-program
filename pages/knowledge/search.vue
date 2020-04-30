<template>
	<view class="serlist">
		<view class="img"><img src="../../static/inline-search.png" alt=""></img></view>
		<view class="input"><input type="text" confirm-type="search" @confirm="search()" placeholder="请输入标题关键词" :value="nameValue" @input="nameInput" placeholder-style="color: #999999;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nameValue:''
			};
		},
		onLoad(e) {
			let keyword = uni.getStorageSync('search', this.nameValue)
			if (keyword){
				this.nameValue = keyword
			}
		},
		methods:{
			nameInput: function(e) {
				this.nameValue = e.target.value;
				console.log(this.nameValue)
			},
			search(){
				uni.setStorageSync('keyword', this.nameValue)
				uni.setStorageSync('search', this.nameValue)
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
  .serlist{
	  display: flex;
	  margin: 10upx 30upx;
	  justify-content: space-between;
	  align-items: center;
	  margin-top: 1upx;
	  background-color: #fff;
	  border-radius: 10upx;
  }
  .serlist .img{
	  margin-left: 30upx;
	  margin-right: 20upx;
	  width: 48upx;
	  height: 48upx;
	  vertical-align: middle;
  }
  .serlist .input{
	  /* border-bottom: 1upx solid #f3f3f3; */
	  padding: 25upx 0;
	  width: 100%;
  }
  .sure{
	  padding: 80upx 0;
  }
  .sure .invite{
	  width: 34%;
	  margin-left: 30%;
	  text-align: center;
	  font-size: 32upx;
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
