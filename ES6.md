#ES6语法回顾
##let const 
和var的区别： 
	作用域
	没有声明提升
	暂时性死域

	ES5实现const 
	回顾defineProperty 
		四个数据属性：
			value		值
			writable 是否可修改
			enumerable	是否可枚举  
			configurable 是否可配置  如修改属性，删除属性
		访问器属性	GET/SET  为函数
		ES5实现const方法：设置变量的writeable属性为false
		ES5实现let方法：闭包

##模板字符串
##数组和对象的扩展	
###判断是数组还是对象：
1.Object.prototype.toString.call( 被判断项 )
##Proxy 代理
实例：vue 3.0的核心 ，响应式通过proxy实现


	var obj2 = {};
	var proxy = new Proxy(obj2,{
		get(target,key){
			console.log('target...',target,key)
		},
		set(target,key,val){
			console.log('target...',target,key,val)
		}
	})
#Promise
##Promise
Promise的三个状态：pending,resolved/fulfilled,rejected
两个特性:封装复用,立即执行.
两个静态方法:resolve,reject; 将非Promise数据转换为Promise对象
then返回的也是Promise的对象
then的链式调用的掌握.
##async/await
##generator

