<template>
	<view class="detail">
		<view>
			<view class="detail-title">{{content.title}}</view>
			<view class="detail-time">
				<text class="time">{{content.date}} {{content.time}}</text>
				<view class="collect">
					<image v-if="content.is_collect == 0"  @tap="collect(content.id)" class="coll-img" src="/static/collect.png" alt="" />
					<image v-else class="coll-img"  @tap="cancel(content.id)" src="/static/collect-select.png"  />
					<view style="margin-right: 32upx;">
					<share-weixin />
					</view>
					<share-moments :path="path" :csene="biId" :title="content.title" :backImage="backImage"/>
				</view>
			</view>
			<view v-if="content.video_src" style="margin-top: 30upx;width: 100%;">
				<video style="width: 100%;" :src="video_src" autoplay enable-progress-gesture show-center-play-btn show-progress show-fullscreen-btn controls></video>
			</view>
			<view class="detail-content">
				<rich-text style="font-size: 16px;" :nodes="contentTxt"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import parseHtml from "@/common/html-parser.js"
	export default {
		onShareAppMessage(res) {
		    if (res.from === 'button') {
		       console.log('点击了页面的转发按钮')
		       console.log(res.target)
		    }else{
				console.log('点击了原生转发')
			}
			
		    return {
		       title: this.content.title,
		       path: "/pages/service/detail?id=" + this.biId,
			}
		},
		data() {
			return {
				biId:'',
				authKey:'',
				content:'',
				contentTxt:'',
				contentArr: [],
				video_src: '',
				path:'pages/knowledge/detail'
			};
		},
		onLoad(e) {			
			this.authKey = uni.getStorageSync('authKey');
			this.biId = e.id;
			// 处理判断sence
			if(e.scene){
				this.biId = e.scene
			}
			this.getListDetail();
			
			
		},
		computed:{
			backImage(){
				return this.static + this.content.cover_src
			}
		},
		methods:{
			getListDetail(){
				var that = this;
				uni.request({
					url: this.http+'knowledge/detail/' + this.biId,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						if (res.data.code == 200) {
							this.content = res.data.data
							this.video_src = this.static + res.data.data.video_src
							let content = parseHtml(res.data.data.content)
							content.forEach(function(item){
								that.adjustimg(item)
							})
							this.contentTxt = content
						}
					},
				});
			},
			adjustimg(node){
				let that = this
				if (node.name && node.name == 'img'){
					node.attrs['style'] = 'margin: 6px 0;width:100%;'
				} else if (node.name && node.children && node.children.length > 0){
					node.children.forEach(function(item){
						that.adjustimg(item)
					})
				}
			},
			// 收藏
			collect(id){
				var that = this;
				uni.request({
					url: this.http+'collection/append/' + id,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {
						
					},
					success: res => {
						if (res.data.code == 200) {
							uni.showToast({
								title: '收藏成功',
								icon:'none',
								mask: false,
								duration: 1500
							});
							that.getListDetail();
						}
					},
				});
			},
			// 取消收藏
			cancel(id){
				var that = this;
				uni.request({
					url: this.http+'collection/remove/' + id,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {
						
					},
					success: res => {
						if (res.data.code == 200) {
							uni.showToast({
								title: '取消收藏成功',
								icon:'none',
								mask: false,
								duration: 1500
							});
							let obj = that.getListDetail()
							console.log(obj)
						}
					},
				});
			}		
		}
	}
</script>

<style>
   .detail{
	   border-top: 2upx solid #f3f3f3;
	   padding: 30upx 40upx;
   }
   .detail-title{
	   color: #333;
	   font-size: 34upx;
	   font-weight: normal;
	   font-stretch: normal;
   }
   .detail-time{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 20upx;
		border-bottom: 1px solid #D9D9D9;
   }
   .time{
   	font-size: 22upx;
   	color: #999999;
   }
	.collect{
		display: flex;
		align-items: center;
   }
   .detail-time .collect span img{
   	width: 26upx;
   	height: 25upx;
   	vertical-align: middle;
   	margin-right: 10upx;
   	margin-top: -8upx;
   }
   .detail-time .collect .no{
   	color: #999999;
   }
   .detail-time .collect .select{
   	color: #dd3e34;
   }
   .detail-content{
	   color: #666666;
	   font-size: 28upx;
	   margin-top: 20upx;
   }
   .coll-img{
	   width: 40upx;
	   height: 40upx;
	   margin-right: 32upx;
   }
   .hideCanvasView {
   	position: relative;
   }
   
   .hideCanvas {
   	position: fixed;
   	top: -99999upx;
   	left: -99999upx;
   	z-index: -99999;
   }
   
   .flex_row_c_c {
   	display: flex;
   	flex-direction: row;
   	justify-content: center;
   	align-items: center;
   }
   
   .modalView {
   	width: 100%;
   	height: 100%;
   	position: fixed;
   	top: 0;
   	left: 0;
   	right: 0;
   	bottom: 0;
   	opacity: 0;
   	outline: 0;
   	transform: scale(1.2);
   	perspective: 2500upx;
   	background: rgba(0, 0, 0, 0.6);
   	transition: all .3s ease-in-out;
   	pointer-events: none;
   	backface-visibility: hidden;
   	z-index: 999;
   }
   
   .modalView.show {
   	opacity: 1;
   	transform: scale(1);
   	pointer-events: auto;
   }
   
   .flex_column {
   	display: flex;
   	flex-direction: column;
	margin-top: -127upx;
   }
   
   .backgroundColor-white {
   	background-color: white;
   }
   
   .border_radius_10px {
   	border-radius: 10px;
   }
   
   .padding1vh {
   	padding: 1vh;
   }
   
   .posterImage {
	 width:70vw;
	 height:150upx;
   }
   
   .flex_row {
   	display: flex;
   	flex-direction: row;
   }
   
   .s_Tips {
   	margin-top: 28upx;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
   }
   .spanTips{
	   padding: 15upx 20upx;
	   background:#000000 ;
	   color:#FFFFFF;
	   font-size: 28upx;
		border-radius: 51upx;
   }
</style>