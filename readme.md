一个简单的天梯计分器
==================

用于obs直播的天梯计分器，提供一个计分面板和一个直播面板。比obs自己的文本好看一点。

### 直播设置

1. 启动工具
2. 在obs直播源中添加浏览器类型的来源，名字随便填然后下一步
3. 地址填```http://localhost:5000/detail```，宽度310，高度可以看着来，然后拖一拖
4. 在任意浏览器中打开```http://localhost:5000/admin```，填分即可。已有示例数据。

### 开发

需要nodejs 20。

#### 安装依赖
```npm install```

#### 本地启动
```npm run start-server```,```npm run start-client```

#### 打包
window执行```powershell .\pack.ps1```, mac执行```sh pack.sh```。
