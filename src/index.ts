import { pdfToImgConfig } from '../types/index.d'

var pdfToImg: pdfToImgConfig = {
	/**
		* 初始化
		* @param  
		* @return
	*/
	init: function () {
		if (!document.getElementById('pdfJs')) {
			var pdfJs = document.createElement('script')
			pdfJs.type = 'text/javascript'
			pdfJs.setAttribute('id', 'pdfJs')
			pdfJs.setAttribute('src', 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.9.359/build/pdf.min.js')
			document.body.appendChild(pdfJs)
		}
		if (!document.getElementById('pdfWorkerJs')) {
			var pdfWorkerJs = document.createElement('script')
			pdfWorkerJs.type = 'text/javascript'
			pdfWorkerJs.setAttribute('id', 'pdfWorkerJs')
			pdfWorkerJs.setAttribute('src', 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.9.359/build/pdf.worker.min.js')
			document.body.appendChild(pdfWorkerJs)
		}
		if (!document.getElementById('pdfSandboxJs')) {
			var pdfSandboxJs = document.createElement('script')
			pdfSandboxJs.type = 'text/javascript'
			pdfSandboxJs.setAttribute('id', 'pdfSandboxJs')
			pdfSandboxJs.setAttribute('src', 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.9.359/build/pdf.worker.min.js')
			document.body.appendChild(pdfSandboxJs)
		}
	},

	/**
		* pdf转图片方法
		* @param {Object} {
			{String} url pdf文件的url,
			{Number} scale 转换后的倍数 倍数越大图片越大约清晰,
			{Boolean} isIntegrate 是否整合为一张图片
		} 配置参数 
		* @param {Function} callback 成功的回调
				* @param {Function} failCallback 失败的回调
		* @return
	*/
	to: function ({ url, scale = 1, isIntegrate = false }, callback, failCallback) {
		try {
			var isEmptyArray = function (arr: Array<string>):boolean {
				for (var i = 0; i < arr.length; i++) {
					if (!arr[i])
						return true;
				}
				return false;
			};
			(window as any).pdfjsLib.workerSrc = 'pdf.worker.js';
			var loadingTask = (window as any).pdfjsLib.getDocument(url)
			loadingTask.promise.then((pdf: any) => {
				var pageNum = pdf.numPages, imgSrcArr:Array<string> = []
				for (var i = 0; i < pageNum; i++) {
					(
						function () {
							var copyI = i
							return function () {
								pdf.getPage(copyI + 1).then((page:any) => {
									var viewport = page.getViewport({ scale: scale })
									viewport.width = viewport.width
									viewport.height = viewport.height
									var canvas = document.createElement("canvas")
									var context = canvas.getContext('2d')
									canvas.width = viewport.width
									canvas.height = viewport.height
									var renderContext = {
										canvasContext: context,
										viewport: viewport
									}
									var renderTask = page.render(renderContext)
									renderTask.promise.then(() => {
										var imgSrc = canvas.toDataURL('image/jpeg', 1)
										if (imgSrc) {
											imgSrcArr[copyI] = imgSrc
										}
										if (imgSrcArr.length === pageNum && !isEmptyArray(imgSrcArr)) {
											if (isIntegrate) {
												var canvasWhole = document.createElement("canvas")
												var contextWhole = canvasWhole.getContext('2d')
												canvasWhole.width = viewport.width
												canvasWhole.height = viewport.height * pageNum
												var count = 0
												for (var j = 0; j < pageNum; j++) {
													var imgItem = new Image();
													imgItem.src = imgSrcArr[j];
													imgItem.width = viewport.width;
													imgItem.height = viewport.height;
													imgItem.onload = function () {
														(contextWhole as CanvasRenderingContext2D).drawImage(imgItem, 0, viewport.height * j)
														if (++count == pageNum) {
															
															if (callback && typeof callback === 'function') {
																callback(canvasWhole.toDataURL('image/jpeg', 1))
															}
														}
													}
												}
											} else {
												if (callback && typeof callback === 'function') {
													callback(imgSrcArr)
												}
											}
										}
									})
								})
							}
						}
					)()()
				}
			})
		} catch (error) {
			if (failCallback && typeof failCallback === 'function') {
				failCallback(error)
			}
		}
	},
	remove: function () {
		var pdfJs = document.getElementById('pdfJs'),
			pdfWorkerJs = document.getElementById('pdfWorkerJs'),
			pdfSandboxJs = document.getElementById('pdfSandboxJs')
		if (pdfJs) {
			document.body.removeChild(pdfJs)
		}
		if (pdfWorkerJs) {
			document.body.removeChild(pdfWorkerJs)
		}
		if (pdfSandboxJs) {
			document.body.removeChild(pdfSandboxJs)
		}
	}
}

export {
	pdfToImg
}
