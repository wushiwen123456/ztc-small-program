<template>
	<view>
		<view class="share_btn">
			<image @tap="momentTap" class="share_image" src="/static/Moments.png">		
		</view>
		<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
			<view class="flex_column">
				<view class="backgroundColor-white">
					<image :src="poster.finalPath || ''" class="posterImage"></image>
				</view>
				<view class="flex_row s_Tips">
					<text class="spanTips" style="margin-bottom: 30upx;">{{tipsText}}</text>
					<image @click="hideQr()" src="/static/close3.png" style="width: 60upx; height: 60upx;"></image>
				</view>
			</view>
		</view>
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="posterCanvasId2" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			path:{
				type:String,
				default(){
					return ''
				}
			},
			csene:{
				type:String,
				default(){
					return ''
				}
			},
			title:{
				type:String,
				default(){
					return ''
				}
			},
			backImage:{
				type:String,
				default(){
					return ''
				}
			}
		},
		data() {
			return {
				poster: {},
				qrShow: false,
				tipsText:'保存到相册...'
			}
		},
		methods:{
			momentTap(){
				// 获取用户授权
				uni.authorize({
					scope:'scope.writePhotosAlbum',
					success:(res) => {
						// 制作海报
						this.makeBill()
					},
					fail:(err) => {
						// 用户授权失败，弹出弹窗
						uni.showModal({
							title:'温馨提示',
							content:'请开启保存到相册的权限，开启后请重新生成海报',
							success:(res) => {
								if(res.confirm){
									uni.openSetting()
								}
							}
						})
					}
				})
			},
			makeBill(){
				const that = this
				console.log(this.csene)
				console.log(this.path)
				uni.showLoading({
					title:'正在生成图片...',
					mask:true
				})
				uni.request({
					url: this.http+'/knowledge/code',
					method: 'GET',
					data: {
						path:this.path,
						csene:this.csene
					},
					success:async (res) =>  {	
						const obj = {
							title:that.title,
							backImage:that.backImage,
							qrcodeUrl:that.static + res.data.data,
							posterCanvasId:'posterCanvasId2',
						}
						// 开始制作海报
						const d = await this.$makeBill(obj)
						if(d.poster.tempFilePath){
							// 图片制作成功
							this.poster.finalPath = d.poster.tempFilePath;
							this.qrShow = true
							// 发起保存图片到本地的请求
							uni.saveImageToPhotosAlbum({
								filePath:d.poster.tempFilePath,
								success:() => {
									// 保存成功
									this.tipsText = '已保存到相册，快去分享吧'
								},
								fail:() => {
									// 保存失败
									this.tipsText = '保存相册失败'
								}
							})
						}else{
							uni.showLoading({
								title:'图片生成失败，请重新点击',
								icon:'none'
							})
						}
					}
				})
			},
			hideQr(){
				this.qrShow = false
			}
		}
	}
</script>

<style>
	.share_btn{
		   width: 45upx;
		   height: 45upx;
		   overflow: hidden;
	}
	.share_image{
		width:100%;
		height:100%;
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
		margin-top: -181upx;
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
		 width:615upx;
		 height: 600upx;
	}
	
	.flex_row {
		display: flex;
		flex-direction: row;
	}
	
	.s_Tips {
		margin-top: 100upx;
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
