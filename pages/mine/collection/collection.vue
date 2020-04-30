<template>
	<view>
		<view class="uni-tab-bar tab-bar-container">
			<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
				<view v-for="(tab,index) in tabBars" :key="tab.id" :id="tab.id"
				 :data-current="index" @tap="tapTab" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']">{{tab.name}}</view>
			</scroll-view>
		</view>
		<view class="main-con" >
			<view class="learn-list" v-for="(list,index) in lists" :key="index"  :data-id="list.id">
				<view class="img"  @tap="goDetail(list.id)">
					<img :src="list.cover_src" alt="">
					<!-- <span v-if="list.cover_type == 'video'"><img class="video" src="../../static/video.png" alt=""></span> -->
				</view>
				<!-- <view class="img"  @tap="goDetail(list.id)" v-else>
					<img :src="list.cover_src" alt="">
					<img class="video" src="../../static/video.png" alt="">
				</view> -->
				<view class="listRight">
					<view class="ell2 list-content"  @tap="goDetail(list.id)">{{list.title}}</view>
			        <view class="list-bottom">
						<span class="time"  @tap="goDetail(list.id)">{{list.date}} {{list.time}}</span>
						<view class="collect">
							<span class="no" v-if="list.is_collect == 0" @tap="collect(list)"><img src="../../../static/collect.png" alt="">收藏</span>
							<span class="select" v-else @tap="cancel(index)"><img src="../../../static/collect-select.png" alt="">收藏</span>
						</view> 
					</view>
				</view>
			</view>
			<uni-load-more :loadingType="loadingType" ></uni-load-more>
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
				tabBars: '', //知识分类
				scrollLeft: 0,
				tabIndex: 0,
				authKey:'',
				symbolId:'',
				lists:'',
				loadingType: 0,
				next : -1,
				start: 0,
				size: 15,
				record: false,
				bottom: false,
				give:'',
				token:''
			};
		},  
		onLoad: function(e) {
			this.authKey = uni.getStorageSync('authKey');
			// console.log(this.authKey)
			this.requestLearn()
		},
		onShow() {
			this.start = 0
			
		},
		onReachBottom(){
			if (this.loadingType == 2) {
				return
			}
			this.requestLearnList(false)
		},
		methods: {
			getElSize(id) { //得到元素的size
			console.log(id)
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data)
					}).exec()
				})
			},
			async tapTab(e) { //点击tab-bar
				this.symbolId = e.currentTarget.id
				console.log(this.symbolId)
				if (this.tabIndex === e.target.dataset.current) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = e.target.dataset.current;
				}
				this.start = 0
				this.requestLearnList()
			},
			// 请求知识分类
			requestLearn: function() {
				var that = this;
				uni.request({
					url: this.http+'knowledge/category',
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
							that.tabBars = res.data.data
							that.symbolId = res.data.data[0].id;
							this.requestLearnList()
						}
					},
				});
			},
			// 请求知识分类的列表
			requestLearnList: function(isLoading = true) {
				if (isLoading)	uni.showLoading({title: '加载中'})
				var that = this;
				that.loadingType = 1
				let querys = "?start=" + this.start + "&size=" + this.size 
				uni.request({
					url: this.http+'collection/list' + querys,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {
						category_id:that.symbolId
					},
					success: res => {
						let data = res.data.data
						let that = this;
						if (res.data.code == 200) {
							// that.lists = res.data.data.list
							let order = data.list
							order.forEach(function(item){
								item.cover_src = that.static + item.cover_src
							})
							
							if (that.start == 0) 
								that.lists = []
                           
							that.lists = that.lists.concat(order)
							that.start = data.next	
							if (order.length < that.size || that.start == -1)
								that.loadingType = 2
							else 
								that.loadingType = 0
							if (that.lists.length == 0) 
								that.record = true
							else 
								that.record = false
							 
						}
					},
					fail: () => {
						console.log("请求失败")
					},
					complete: () => {
						if(isLoading) uni.hideLoading()
					}
				});
			},
			// 取消收藏
			cancel(index){
				var that = this;
				uni.request({
					url: this.http+'collection/remove/' + this.lists[index].id,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {
						
					},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
							uni.showToast({
								title: '取消收藏成功',
								icon:'none',
								mask: false,
								duration: 1500
							});
							this.lists.splice(index, 1)
						}
					},
				});
			},
			// 取消收藏
// 			cancel(id){
// 				var that = this;
// 				uni.request({
// 					url: this.http+'collection/remove/' + id,
// 					method: 'GET',
// 					header: {
// 						authKey: this.authKey
// 					},
// 					data: {
// 						
// 					},
// 					success: res => {
// 						console.log(res.data)
// 						if (res.data.code == 200) {
// 							uni.showToast({
// 								title: '取消收藏成功',
// 								icon:'none',
// 								mask: false,
// 								duration: 1500
// 							});
// 							that.start = 0
// 							that.requestLearnList()
// 						}
// 					},
// 				});
// 			},
			goDetail(id){
				uni.navigateTo({
					url: '/pages/knowledge/detail?id=' + id
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
page {
		height: 100%;
		background-color: #ffff;
	}
.tab-bar-container{
		height: 100rpx;
		background: #F3F3F3;
		position: fixed;
		top: 0;
		z-index: 99;
		width: 100%;
	}
	#tab-bar {
		border-bottom: none;
		background: #FFFFFF;
		margin-top: 16upx;
		height: 80upx;
		line-height: 80upx;
		position: fixed;
		top:0upx;
		z-index: 9999;
		border-bottom: 4upx solid #f3f3f3;
	}
	uni-view{
		font-size: 30upx;
	}
	/* .uni-swiper-tab{
		height: 110upx;
	}
 */
	body .uni-page-head {
		border-bottom: 1px solid #eaeaea;
	}

	.uni-scroll-view {
		overflow: Scroll;
		overflow-x: hidden
	}

	#tab-bar .active {
		color: #dd3e34;
		border-bottom: 8upx solid #dd3e34;
		padding: 0 2upx 10upx 2upx;
		z-index: 9999;
	}
	.swiper-tab-list{
		width: 73upx;
		margin: 0 85upx;
		text-align: center;
		font-size: 36upx;
		color: #333333;
		z-index: 9999;
	}
	.swiper-tab-list:nth-child(1){
		margin-left: 100upx;
	}
	.main-con{
		background-color: #fff;
		margin-top: 100upx;
	}
	.learn-list{
		margin: 0 30upx;
		position: relative;
		padding: 30upx 0;
		border-bottom: 1px solid #f3f3f3;
	}
	.learn-list .img{
		width: 226upx;
		height: 162upx;
		position: relative;
	}
	.learn-list .img img{
		width: 100%;
		height: 100%;
	}
	.learn-list .img .video{
		width: 33upx;
		height: 33upx;
		position: absolute;
		top: 65upx;
		left: 97upx;
	}
	.listRight{
		position: absolute;
		left: 270upx;
		top:30upx;
		width: 61%;
	}
	.list-content{
		color: #333;
		font-size: 30upx;
		line-height: 40upx;
	}
	.list-bottom{
		margin-top: 44upx;
		position: relative;
	}
	.list-bottom .time{
		font-size: 22upx;
		color: #999999;
	}
	.list-bottom .collect{
		position: absolute;
		right: 0;
		top:10upx;
	    font-size: 24upx;
	}
	.list-bottom .collect span img{
		width: 26upx;
		height: 25upx;
		vertical-align: middle;
		margin-right: 10upx;
		margin-top: -4upx;
	}
	.list-bottom .collect .no{
		color: #999999;
		padding: 5upx;
	}
	.list-bottom .collect .select{
		color: #dd3e34;
		padding: 5upx;
	}
	.pop{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.bor{
		text-align: center;
	}
	.pop .tu{
		width: 500upx;
		height: 510upx;
		background-size: cover;
	}
	.picket{
		display: flex;
		position: relative;
		top: 160upx;
	}
	.amount{
	    width: 45%;
		text-align: center;
		margin-left: 20upx;
	}
	.amount .num{
		font-size: 30upx;
	}
	.amount .des{
		margin-top: -20upx;
	}
	.amount .num span{
		font-size: 60upx;
		font-weight: bold;
	}
	.nametit{
		text-align: center;
		position: relative;
		top: 220upx;
	}
	.tip{
		width: 50%;
		text-align: left;
		padding: 0 30upx;
		margin-top: 30upx;
	}
	.tip view{
		font-size: 28upx;
		color: #333333;
	}
	.tip view span{
		font-weight: bold;
	}
	.close{
		text-align: center;
		margin-top: 50upx;
	}
	.close image{
		width: 60upx;
		height: 60upx;
	}
	.btn {
		text-align: center;
	}
	.btn image{
		width: 400upx;
		height: 88upx;
		position: relative;
		top: 230upx;
	}
	image{
		width: 100%;
		height: 100%;
	}
	.nametit{
		color: #fff;
	}
</style>