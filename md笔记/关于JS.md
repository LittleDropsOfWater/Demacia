# 什么是JS?
直译式脚本语言，是一种动态类型、弱类型、基于原型的语言。

# JS的名字由来
1994年 网景发布Navigator0.9，急需一种网页脚本语言
1995 Sun 退出Java
网景为了蹭热度，临时将LiveScript改为Javascript
ECMA欧洲计算机制造协会，定义未ECMAScript

# ECMAScript国籍标准
六次改版
## 第一版
	定准则，整理
## 第二版
	整理
## 第三版
真正定义JavaScript，ES3
## 第四版
争议颇多，导致未发布
## 第五版
ES5
## 第六版
2015年6年正式发布了ES6
# JS的组成
三部分
- DOM
- BOM
- ECMAScript
# JS的几种存在形式
- 原生js
- Js库：js框架
- Js插件

# JS发展前景
好
# 栈内存和对内存
栈内存：存储基本数据类型
堆内存：存储引用数据类型
对象的引用地址 存储在栈内存
# Event Loop
## 同步、异步
## Promise、定时器
Promise总是先触发
定时器是宏任务，Promise是微任务
## 宏任务，微任务
微任务总是先于宏任务触发
# 原型链

构造函数A
实例a
原型对象Ap
```js
	a.__proto__(隐式原型)指向Ap
	A.prototype(显式原型)指向Ap
	Ap.constructor 指向A
```
```js
A.prototype.constructor === A
a=new A();
a.constructor === a.__proto__.constructor
```
## 继承
- 原型链继承
- 构造函数继承
- 组合继承

### 原型链继承
```js
B.prototype=new A();
```
### 构造函数继承
function B(opt){
	A.call(this,opt);
}
只有构造函数内的属性
没有原型对象的方法
###　组合继承
```js
function B(opt){
	A.call(this,opt);
}
B.prototype= new A();

```

例子
```js
Object.prototype === Array.prototype.__proto__
Object.prototype === Function.prototype.__proto__
Object.prototype === Date.prototype.__proto__
Object.prototype === RegExp.prototype.__proto__
```