import _app from '@/util/QS-SharePoster/app.js';
import {
	getSharePoster
} from '@/util/QS-SharePoster/QS-SharePoster.js';


export default async function(options){
	console.log(options)
	return new Promise(async (resolve,reject) => {	
		try {
			console.log('准备生成:' + new Date())
			const obj = {
				_this: this, //若在组件中使用 必传
				type: 'testShareType',
				formData: {
					//访问接口获取背景图携带自定义数据
					
				},
				backgroundImage:options.backImage,
				posterCanvasId:options.posterCanvasId,	//canvasId
				delayTimeScale: 20, //延时系数
				/* background: {
					width: 1080,
					height: 1920,
					backgroundColor: '#666'
				}, */
				imageScale:options.title.length <= 15 ? 0.3 : 0.4,
				drawArray: ({
					bgObj,
					type,
					bgScale
				}) => {
					const dx = bgObj.width * 0.3;
					const fontSize = bgObj.width * 0.045;
					const lineHeight = bgObj.height * 0.04;
					const _tHeight = options.title.length <= 15 ? 0.3 : 0.4
					//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
					return new Promise((rs, rj) => {
						rs([{
								type: 'custom',
								setDraw(Context) {
									Context.setFillStyle('white');
									Context.setGlobalAlpha(1);
									console.log(options.title.length)
									Context.fillRect(0, bgObj.height - 30 - bgObj.height * _tHeight, bgObj.width, bgObj.height - 30 - bgObj.height * _tHeight)
									Context.setGlobalAlpha(1);
								}
							},
							{
								type: 'image',
								url: options.qrcodeUrl,
								alpha: 1,
								dx:30,
								// dx:30,
								dy: bgObj.height - 200 - 10,
								dWidth:200,
								dHeight:200,
								
							},
							{
								type: 'image',
								url: '/static/logo123.png',
								alpha: 1,
								// dx:30,
								dWidth:220,
								dHeight:73,
								dx:850,
								dy:15
							},
							{
								type: 'text',
								fontStyle: 'sans-serif',
								text: options.title,
								size: fontSize*1.2,
								color: '#1C1C1C',
								lineFeed: {
									maxWidth: bgObj.width - 40,
									lineHeight: fontSize*1.7,
									lineNum: 2,
									dx: 30
								},
								alpha: 1,
								textAlign: 'left',
								textBaseline: 'middle',
								infoCallBack(textLength) {
									_app.log('index页面的text的infocallback ，textlength:' + textLength);
									return {
										// dx: bgObj.width - textLength - fontSize,
										dx:30,
										// dy: bgObj.height - lineHeight * 3
										dy:bgObj.height * (1 - _tHeight) + lineHeight + 10
										
									}
								},
								serialNum: 0,
								id: 'tag1'	//自定义标识
							},
							{
								type: 'text',
								text: '长按识别小程序码，进入 直纯堂',
								size: fontSize,
								color: '#696969',
								alpha: 1,
								textAlign: 'center',
								textBaseline: 'middle',
								serialNum: 1,
								infoCallBack(textLength) {
									_app.log('index页面的text的infocallback ，textlength:' + textLength);
									return {
										dx: 2 * (bgObj.width - textLength) - 100,
										dy: bgObj.height - 50
									}
								},
							},
							{
								type: 'text',
								text: '值得信赖的母婴健康服务机构',
								size: fontSize,
								color: '#696969',
								alpha: 1,
								textAlign: 'center',
								textBaseline: 'middle',
								serialNum: 1,
								infoCallBack(textLength) {
									_app.log('index页面的text的infocallback ，textlength:' + textLength);
									return {
										dx: 2 * (bgObj.width - textLength) - 200,
										dy: bgObj.height - 120
									}
								},
							}
						]);
					})
				},
				setCanvasWH: ({
					bgObj,
					type,
					bgScale
				}) => { // 为动态设置画布宽高的方法，
					this.poster = bgObj;
					bgObj.width = 1080
					bgObj.height = 1053
				}
			}
			console.log(obj)
			const d = await getSharePoster(obj);
			console.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
			resolve(d)
		} catch (e) {
			_app.hideLoading();
			_app.showToast(JSON.stringify(e));
			console.log(JSON.stringify(e));
		}
	})	
}