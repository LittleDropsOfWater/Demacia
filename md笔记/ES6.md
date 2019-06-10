#ES6语法回顾
##let const 
和var的区别： 
	作用域
	没有声明提升
	暂时性死域

###用ES5实现const 
回顾defineProperty 

		四个数据属性：
			value		值
			writable 	是否可修改
			enumerable	是否可枚举  
			configurable 	是否可配置  如修改属性，删除属性
		访问器属性	GET/SET  皆为函数
		ES5实现const方法：设置变量的writable属性为false
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
#Promise 异步操作
##Promise对象
###Promise的三个状态:pending,resolved/fulfilled,rejected
###两个特性:封装复用,立即执行.
###两个静态方法:resolve,reject; 
###主要用途:将非Promise数据转换为Promise对象
###then
then返回的也是Promise的对象
then的链式调用必须掌握.
###all
Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
	
	const p = Promise.all([p1, p2, p3]);
p的状态由p1、p2、p3决定，分成两种情况。

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
###race
Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
##async/await
异步函数
asyn函数的返回结果是Promise对象
await 后面跟Promise对象时，会阻塞直到Promise状态变化。
当状态为resolve时，值为resolve的参数
当状态为reject时，会报错，停止函数
例子：

	async function load(){
		let img= await loadImg(url);
		let num = await 1000;
		console.log(img,num);
		document.body.appendChild(img);
	}
##generator

##class 类
使用new 新建对象
###constructor
super必须写在第一行，先创建父类再赋值子类的属性
##module 
##深浅拷贝
堆内存→引用类型 →大小不固定→只是地址
栈内存→基本类型→大小固定
###深浅拷贝方法
####浅拷贝
只有最外层深拷贝
#####数组
[...arr], arr.concat(), arr.slice()
#####对象
{...obj}, Object.assign({},obj)
####深拷贝
JSON.parse(JSON.stringify(obj/arr))
递归