# pdfToImg-vite
pdf转img vite版本

### 使用方式

#### 在项目根目录下执行

 ```bash
  cnpm i pdftoimg-vite -D
  ```



#### 引入pdftoimg-vite

 ```bash
  import { pdfToImg } from 'pdftoimg-vite'
  ```
  
  #### 使用前请先执行初始化方法
  
   ```bash
  pdfToImg.init()
  ```
  
  #### 在业务中执行
   ```bash
  pdfToImg.to(
    {
      url: string,
      scale: number,   //非必填 默认为1
      isIntegrate: boolean   //非必填 默认为false 即不整合为一张图片
    }, 
    (res: string | Array<string>)=> {    //成功的回调
      console.log(res);
    }, 
    (err:any)=> {   //失败的回调
      console.log(err)
    })
  ```
  
  #### 页面结束时调用
  
  ```bash
  pdfToImg.remove()
  ```
  
  
 * 注意:
 前端构建工具为webpack请使用[pdftoimg-dist](https://github.com/sudong0701/pdfToImg)
