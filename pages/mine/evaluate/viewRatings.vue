<template>
	<view class="rating">
		<view class="tagB">
			<span class="yell" :class="isaa == 3 ? 'activee':''"  @tap="evala(3)">全部</span>
			<span class="yell" :class="isaa == 2 ? 'activee':''" @tap="evala(2)">好评({{count.good}}条)</span>
			<span class="yell" :class="isaa == 1 ? 'activee':''" @tap="evala(1)">中评({{count.midd}}条)</span>
			<span class="bad" :class="isaa == 0 ? 'activee':''" @tap="evala(0)">差评({{count.bad}}条)</span>
		</view>
		<view class="rateDetial">
			<scroll-view scroll-y="true" @scrolltolower="lower" style="height: 100%;">
			<view class="evaluate" v-for="(eva,index) in lists" :key="eva.id" >
				<view class="top">
					<view class="photo"><img :src="eva.user_avatar" alt=""></view>
					<view class="evaluateTit gray">
						<view>{{eva.user_name}} ({{eva.create_time}})</view>
						<view>技师：{{eva.massagist_name}}</view>
					</view>
				</view>
				<view class="evaluateCont">{{eva.comment}}</view>
			    <view class="evaluateTag" v-if="eva.tags != ''">
					<img src="../../../static/tag.png" alt=""> 
					<span v-for="(ev,idx) in eva.tags" :key="idx">{{ev}}</span>
				</view>
			</view>
			<uni-load-more :loadingType="loadingType" v-if="lists != ''"></uni-load-more>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:'',
				biId:'',
				authKey:'',
				level:'',
				count:'',
				isaa:3,
				loadingType: 0,
				next : -1,
				start: 0,
				size: 15,
				record: false,
				bottom: false,
			};
		},
		onLoad(e) {
			this.authKey = uni.getStorageSync('authKey');
			this.biId = e.id;
			this.getListComments();
			this.getListComment(3);
		},
		onShow() {
			this.start = 0
		},
		methods:{
			// 评价个数
			getListComments(){
				var that = this;
				uni.request({
					url: this.http+'comment/overview/' + this.biId,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
							this.count = res.data.data.count
						}
					},
				});
			},
			evala(e){
				this.isaa = e
				this.start = 0
				this.getListComment(e);
			},
			// 评价列表
			getListComment: function(e,isLoading = true){
				var level = e
				console.log(e)
				var that = this;
				let querys = "?start=" + this.start + "&size=" + this.size
				if(level == 3){
					uni.request({
						url: this.http+'comment/list/' + querys,
						method: 'GET',
						header: {
							authKey: this.authKey
						},
						data: {
							id:this.biId
						},
						success: res => {
							let data = res.data.data
							if (res.data.code == 200) {
								let order = data.list
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
								 that.start = data.next	
							}
						},
					});
				}else{
					uni.request({
						url: this.http+'comment/list/' + querys,
						method: 'GET',
						header: {
							authKey: this.authKey
						},
						data: {
							id:this.biId,
							level:level
						},
						success: res => {
							let data = res.data.data
							if (res.data.code == 200) {
								let order = data.list
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
								 that.start = data.next	
							}
						},
					});
				}
			},
			lower(){
				if (this.loadingType == 2) {
					return
				}
				this.getListComment(false)
			}
		}
	}
</script>

<style>
	.tagB{
		border-top: 1upx solid #f3f3f3;
		border-bottom: 1upx solid #f3f3f3;
		padding: 30upx;
	}
	.tagB .yell{
		background-color: #fff5e4;
	    border-radius: 30upx;
		color: #b37d1d;
		font-size: 28upx;
		padding: 10upx 20upx;
		margin-right: 30upx;
	}
	.bad{
		color: #666666;
		background-color: #f2f2f2;
		border-radius: 30upx;
		font-size: 28upx;
		padding: 10upx 20upx;
		margin-right: 30upx;
	}
	.activee{
		background-color: #dd3e34 !important;
		color: #fff !important;
	}
.evaluate{
		padding: 40upx 30upx;
		padding-bottom: 20upx;
		border-bottom: 1upx solid #f3f3f3;
	}
	.evaluate .top{
		display: flex;
	}
	.evaluate .evaluateTit view{
		font-size: 24upx;
	}
	.evaluate .evaluateCont{
		font-size: 30upx;
		color: #333333;
		margin-top: 20upx;
	}
	.evaluate .evaluateTag img{
		width: 42upx;
		height: 42upx;
	}
	.evaluate .evaluateTag{
		margin-top: 10upx;
		color: #999;
	}
	.evaluate .evaluateTag span{
		font-size: 22upx;
		border: solid 1upx #999999;
		border-radius: 20px;
		margin-left: 20upx;
		padding: 4upx 20upx;
		display: inline-block;
		margin-top: 20upx;
	}
	.photo{
		width: 76upx;
		height: 76upx;
		border: 1upx solid #fff;
		margin-right: 20upx;
		position: relative;
		top:4upx;
		background-color: #f3f3f3;
		border-radius: 100%;
	}
	.photo img{
		border-radius: 100%;
	}
</style>