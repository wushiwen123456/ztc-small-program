<template>
	<view class="returns">
		<view class="kk" v-if="lists == ''">
			<view>
				<img class="image" src="data:image/png;base64,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" alt="">
				<view class="tit">暂无收益</view>
			</view>
		</view>
		<view class="returnsList">
			<scroll-view scroll-y="true" @scrolltolower="lower" style="height: 100%;">
			<view class="rlist" v-for="(inc,index) in lists" :key="index">
				<view class="left">
					<view class="tit">发起拼团成功</view>
					<view class="gray">{{inc.create_time}}</view>
				</view>
				<view class="right red">+{{inc.amount}}</view>
			</view>
			<uni-load-more :loadingType="loadingType" v-if="lists != ''"></uni-load-more>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more.vue"
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				lists:'',
				authKey:'',
				loadingType: 0,
				next : -1,
				start: 0,
				size: 15,
				record: false,
			};
		},
		onLoad(e) {
			this.authKey = uni.getStorageSync('authKey');
			this.join();
		},
		methods:{
			// 合伙人收益明细
			join(isLoading = true){
				var that = this;
				let querys = "?start=" + this.start + "&size=" + this.size 
				uni.request({
					url: this.http+'copemate/incomes' + querys,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						let data = res.data.data
						if (res.data.code == 200) {
							let order = data.list
							console.log(order)
							if (order.length == 0) {
								that.loadingType = 2
								order = []
							}
							else if (order.length < that.size)
								that.loadingType = 2
							else 
								that.loadingType = 0
							
							if (that.start == 0) 
								that.lists = []

							that.lists = that.lists.concat(order)
							if (that.lists.length == 0) 
								that.record = true
							else 
								that.record = false
							
						}
						that.start = data.next	
					},
				});
			},
			lower(){
				if (this.loadingType == 2) {
					return
				}
				this.requestLearnList(false)
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
	.returns{
		border-top: 1upx solid #f3f3f3;
		height: 100%;
	}
	.returnsList{
		margin-left: 30upx;
	}
.rlist{
	position: relative;
	border-bottom: 1upx solid #f3f3f3;
	padding: 30upx 0;
}
.rlist .left .tit{
	font-size: 30upx;
	color: #333333;
}
.rlist .left .gray{
	font-size: 24upx;
}
.rlist .red{
	font-size: 36upx;
	top:50upx;
}
.rlist .right{
	top:44upx;
	right: 30upx;
}
.rlist .right .gray{
	font-size: 24upx;
	margin-top: -16upx;
}
.rlist .right .del{
	font-size: 36upx;
	color: #333333;
	margin-top: -10upx;
}
</style>