interface toParams {
	url: string,
	scale: number,
	isIntegrate: boolean
}
interface callback {
	(params: string | Array<string>): any
}
interface fallCallback {
	(params: any): any
}
interface toConfig {
	(params: toParams, callback: callback, fallCallback?: fallCallback): void
}

interface pdfToImgConfig {
	init: Function
	to: toConfig
	remove: Function
}

export {
	pdfToImgConfig
}



