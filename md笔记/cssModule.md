实现css的模块化
#如何启动：
讲css-loader修改为css-loader?modules。
注意：以ID定义的样式将直接生效。

#局部样式
不使用 `:global` 则默认为局部样式。
局部样式需要先从样式表引入styles对象
```css 
css样式
 .login-form {
  max-width: 400px;
}
```
```javascript
组件中
import styles from "./index.css";
<Form  className={styles["login-form"]} />
```
#全局样式
总会遇到问题如：如何修改 antd样式
在浏览器中找到类名
1.在css中使用global，一次只能放一个

	:global( .ant-menu-inline.ant-menu-sub){
		background-color: #232a41 !important;
		color:#f90 !important;
	}
2.在scss中使用global,scss中可以放置多个

	:global{
		.ant-menu-inline.ant-menu-sub{
			background-color: #232a41 !important;
			color:#f90 !important;
		}
	}