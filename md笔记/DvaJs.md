
dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。
阿里为了更好的使用 react进行的封装,相比create-react-app更加方便
# 特性
快速上手
# 安装 dva-cli
通过 npm 安装 dva-cli 并确保版本是 0.9.1 或以上。

	$ npm install dva-cli -g
	$ dva -v
	dva-cli version 0.9.1
#创建新应用
安装完 dva-cli 之后，就可以在命令行里访问到 dva 命令（不能访问？）。现在，你可以通过 dva new 创建新应用。

	$ dva new dva-quickstart

#数据流向
自上而下
抽象层|功能
-|-
组件|数据渲染,用户交互
vuex \| redux   |	数据处理
service \| api	| 发起请求,拦截器:请求拦截 数据拦截
mock \| server  | 服务器或mock


#services
接口请求，在这写发起请求的函数，然后抛出
#utils
与业务逻辑不相关的可以放这

#models
##Effect
Action处理器,处理异步操作,基于Redux-saga.Effect指的是副作用.根据函数式编程,计算以外的操作都属于Effect.
##Generator函数
Effect是一个Generator函数,内部使用yield关键字,标识每一步的操作,**不管是异步或同步**
##call和put
dva提供多个effect函数内部的处理函数,比较常用的是`call`和`put`.
- call:执行异步函数
- put:发出一个Action,类似dispatch


