Promise 的在三种状态 ：pending 进行中   fulfilled 已成功  rejected 已失败

then()  在Promise中是通过then()方法来指定处理异步操作结果的方法
catch() 是promise实例的方法 它其实是.then(null,rejection)的简写 用于指定         发生错误时的回调   catch()返回一个Promise对象
    promise对象的Error对象具有冒泡性质，会一直向后传递，直到被捕获为止,即 错误       总是会被下一个catch语句捕获
all() 用于将多个Promise实例 包装成一个新的promise实例  全部成功才成功 否则失败
race() 其中任意一个实例率先改变，它的状态就跟着改变，而且状态有率先改变的实        例决定
Promise.resolve()可以将现有的对象装换为promise对象
Promise.reject() 返回一个新的promise实例 它的状态为rejected
finally() 用于指定不管promise对象最后的状态如何都会执行
done() 处理回调链的尾端，保证抛出任何可能出现的错误

Object.definedProperty()
语法： Object.definedProperty(obj,prop,descriptor)
参数:  obj:被定义或修改属性的对象
       prop:要定义或修改的属性名
       descriptor:对属性的描述

configurable 可配置 可删除  默认为false
enumerable  可枚举(遍历)  默认为false
writable   可写(赋值操作)  默认为false
value 设置属性值 
get() 当获取值时触发的函数
set() 设置值是触发的函数 设置的值通过value值拿到

async/await
async 作为关键字放到函数前面 表示是一个异步函数  它返回一个promise对象

await 等待的意思 它后面可以跟任何表达式，但我们更多放一个返回promise对象的表达式  注意await只能放到async函数里 

Proxy是一个构造函数 使用new Proxy创建代理器 第一个参数为一个对象 第二个参数也是一个对象 返回被包裹后的代理器
get(target,props)获取值触发的函数
set(target,props,value)设置值触发的函数

堆内存：引用类型
栈内存：基本类型

深拷贝：
 数组：[...],concat(),slice()
 对象：{..obj},Object.assign()
