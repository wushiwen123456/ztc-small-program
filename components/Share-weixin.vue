<template>
	<view class="share_btn">
		<button open-type="share" class="share_btn_b">share</button>
		<image class="share_image" src="/static/weixin.png">
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.share_btn{
		   position: relative;
		   width: 45upx;
		   height: 45upx;
		   overflow: hidden;
	}
	.share_btn_b{
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		opacity: 0;
		position: absolute;
		z-index: 99999;
	}
	.share_image{
		width:100%;
		height:100%;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
