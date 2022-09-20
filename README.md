# WK-API-Demo

> 悟空快应用引擎可以理解为一个精简版的浏览器，针对TV端特殊的遥控器交互模式，从底层做了大量优化工作，在启动速度、可复用列表组件、渲染效率、动画速度、
  网络通信等等都提供了超高的性能表现。提供了接近 Web 的开发体验。目前上层支持了Vue界面框架，前端开发人员可以通过它，将前端代码转换为终端的原生
  指令，进行原生终端 App 的开发。


## 安装
```
npm install
```

### 安装出错执行
```
npm install --legacy-peer-deps
```

## 开发调试流程 
以下操作都需要通过cmd/terminal窗口进入到项目所在目录下

### 运行调试
```
npm run dev
npm run debug
```

### adb连接电视
```
adb connect 192.168.X.X
```
> 电视ip

### 安装容器
```
adb install -r wk-dev-debug.apk
```

### 容器设置DEBUG_HOST
> 在模拟器打开悟空快应用调试，并在目标ip选项设置调试目标ip地址，此处是电脑ip，打开即可看到组件demo界面

### 如何看错误性的log
用chrome浏览器打开chrome://inspect/ 勾选Discover network targets，配置加入电脑38989端口，例如：192.168.x.x:38989，然后inspect查看log调试

### 调试中不刷新如何解决
如果调试中出现修改代码保存后电视不刷新现象，需要检查adb连接情况或者设备是否在线
在cmd/terminal窗口输入 adb devices ，如果没有连接中设备需要输入 adb connect 192.168.X.X(电视ip) 重新连接，如果设备显示 offline 需要重启电视

## 发布流程 
> 步骤一，编译代码
```
npm run vendor
npm run wkbuild
```
> 步骤二，找到根目录下 /dist/android 文件夹，打包成aa_bb_cc.zip文件   
```
aa 快应用包名
bb 快应用版本名（最好为数字）
cc 该zip包的md5值
```
> 步骤二，把步骤一生成的 aa_bb_cc.zip 和 快应用介绍的index.html 打包成 .zip文件，并在小程序平台上传.zip文件
```text
dist.zip							  # 用来上传到小程序平台的zip文件
├── aa_bb_cc.zip                      # 代码压缩包
│   ├── index.android.js            
│   ├── vendor.android.js               
│   ├── vendor-manifest.json                    
├── index.html                        # 快应用介绍
```
