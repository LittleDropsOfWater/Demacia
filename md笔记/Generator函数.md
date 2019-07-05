# Generator
更强大、更完善的 ES6 异步编程方法
**异步编程的语法目标,就是怎么让它更像同步编程.**
以前的异步编程方式,大概有下面四种.

- 回调函数
- 事件监听
- 发布/订阅
- Promise ## 什么是异步
  异步就是讲任务分成两段,先执行第一段,然后执行其他任务,等准备好了,再执行第二段.

比如有个任务是读取文件进行处理,异步过程是下面这样.

![异步步骤](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015042403.png)
上述步骤,第一段向操作系统发出请求,要求读取文件.然后,程序执行其他任务,等到操作系统返回文件,再接着执行任务的第二段(处理文件).

**这种不连续的执行,就叫做异步.**相应地,连续的执行,就叫做同步.

![同步步骤](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015042404.png)
上图是同步的执行方式.由于是连续执行,不能插入其他任务,所以操作系统从硬盘读取文件的这段时间,程序只能干等着. ## 回调函数的概念
javaScript 语言对异步编程的实现,就是回调函数.**所谓回调函数,就是把任务的第二段单独写在一个函数里,等到重新执行这个任务的时候,就直接 i 奥用这个函数.**它的英文名字**callback**,直译过来就是"重新调用".
读取文件的代码如下:
fs.readFile('/etc/passwd', function (err, data) {
if (err) throw err;
console.log(data);
});
readFile 函数第二个参数,就是回调函数,也就是任务的第二段.等到操作系统返回了 /etc/passwd 这个文件以后,回调函数才会执行.

一个有趣的问题,为什么 Node.js 约定,回调函数第一个参数,必须是错误对象 err?原因是 执行分成两段,在这两段之间抛出的错误,程序无法捕捉,只能当作参数,传入第二段.

## Promise
回调函数本身没问题,它的问题出现在多个回调函数嵌套.

    fs.readFile(fileA, function (err, data) {
    	fs.readFile(fileB, function (err, data) {
    		// ...
    	});
    });

如果依次读取多个文件,就会出现多重嵌套。代码横向发展，很快会乱成一团，无法管理。这种情况被称为“回调函数噩梦”（callback hell）
Promise 就是为了解决这个问题而提出的。它不是新语法功能，而是新写法，允许将回调函数的横线加载，改为纵向加载。

    var readFile = require('fs-readfile-promise');

    readFile(fileA)
    .then(function(data){
    	console.log(data.toString());
    })
    .then(function(){
    	return readFile(fileB);
    })
    .then(function(data){
    	console.log(data.toString());
    })
    .catch(function(err) {
    	console.log(err);
    });

Promise 提供了 then 方法加载回调函数，catch 方法捕捉执行过程中抛出的错误。
只是回调函数的改进，异步的分段执行更加清楚，而已。
Promise 最大的问题是代码冗余，原来的任务呗 Promise 包装了一下，不管什么操作，一眼看去都是一堆 then，原来的语法变得很不清楚。 ## 协程
传统编程语言中一种解决方案叫做“协程”。意思是多个线程互相协作，完成异步任务。
协程有点像函数，又有点像线程。它的运行流程大致如下。
第一步，协程 A 开始执行。

    第二步，协程A执行到一半，进入暂停，执行权转移到协程B。

    第三步，（一段时间后）协程B交还执行权。

    第四步，协程A恢复执行。

举例来说，读取文件的协程写法如下。

    function asnycJob() {
    	// ...其他代码
    	var f = yield readFile(fileA);
    	// ...其他代码
    }

上面代码的函数 asyncJob 是一个协程，它的奥妙就在其中的 yield 命令。它表示代码执行到此处，执行权交给其他协程。也就是说，yield 命令是异步两个阶段的分界线。
协程遇到 yield 命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点，就是代码的写法非常像同步操作，如果去除 yield 命令，简直一模一样。
## Generator 函数的概念
Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。

```javascript
function* gen(x) {
  var y = yield x + 2;
  return y;
}
```

上面的代码就是一个 Generator 函数。它不同于普通函数，是可以暂停执行的，所以函数名前要加星号，以示区别。
整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用 yield 语句注明。Generator 函数的执行方法如下。

```javascript
var g = gen(1);
g.next(); // { value: 3, done: false }
g.next(); // { value: undefined, done: true }
```

上述，第一个 next 方法的 value 属性，返回表达式 x+2 的值（3）。第二个 next 方法待遇参数 2，这个参数可以传入 Generator 函数，作为上个阶段异步任务的返回结果，被函数体内的变量 y 接收。因此这一步的 value 属性，返回的就是 2（变量 y 的值）。
Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。

```javascript
function* gen(x){
  try {
    var y = yield x + 2;
  } catch (e){
    console.log(e);
  }
  return y;
}

var g = gen(1);
g.next();
g.throw（'出错了'）;
// 出错了
```

上面代码的最后一行，Generator 函数体外，使用指针对象的 throw 方法抛出的错误，可以被函数体内的 try...catch 代码块捕获。这意味着，出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编程无疑是很重要的。
## Generator 函数的用法
下面讲执行一个真实的异步任务。

var fetch = require('node-fetch');

    function* gen(){
    	var url = 'https://api.github.com/users/github';
    	var result = yield fetch(url);
    	console.log(result.bio);
    }

上面代码中，Generator 函数封装了一个异步操作，该操作先读取一个远程接口，然后从 JSON 格式的数据解析信息。就像前面说过的，这段代码非常像同步操作，除了加上了 yield 命令。
执行这段代码的方法如下。

```javascript
var g = gen();
var result = g.next();

result.value.then(data => data.json()).then(data => g.next(data));
```

上面代码中，首先执行 Generator 函数，获取遍历器对象，然后使用 next 方法（第二行），执行异步任务的第一阶段。由于 Fetch 模块返回的是一个 Promise 对象，因此要用 then 方法调用下一个 next 方法。
可以看到，虽然 Generator 函数将异步操作表示地很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。 ## 封装 generator

```JavaScript
function *getImg(){
	let res1 = yield 1;
	console.log('res1  ',res1);
	let res2 = yield 2;
	console.log('res2  ',res2);
	let res3 = yield 3;
	console.log('res3  ',res3);
	return 4;
}

//generator函数第一次调用,返回的是一个迭代器
let gen=getImg();
//后一次调用next传入的表达式会作为前一次yield表达式的返回值
console.log(gen.next(100));
console.log(gen.next(200));
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

function loadImg(src){
	return new Promise((resolve,reject)=>{
		let img =new Image()
		img.src=src;
		img.onload=()=>{
			setTimeout(()=>{
			resolve(img)
			},1000)
		}
		img.onerror=()=>{
			reject(`无法载入图片的url:${src}`)
		}
	})
}
function *loadImgSync(arr){
	for (let i = 0; i < arr.length; i++) {
		const img = yield loadImg(arr[i]);
		document.body.append(img);
	}
}
arr=['https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=2581bca42f3fb80e13d167d706d02ffb/4034970a304e251fb1a2546da986c9177e3e53c9.jpg',
'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=ad628627aacc7cd9e52d32d909032104/32fa828ba61ea8d3fcd2e9ce9e0a304e241f5803.jpg',
'https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=a9e671b9a551f3dedcb2bf64a4eff0ec/4610b912c8fcc3cef70d70409845d688d53f20f7.jpg',
'https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=907f6e689ddda144c5096ab282b6d009/dc54564e9258d1092f7663c9db58ccbf6c814d30.jpg',
'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=491575a8be51f819ee25054aeab54a76/d6ca7bcb0a46f21fce0eadd0f8246b600c33ae7f.jpg']

//封装generator函数的执行器
function run(func,arr){
  //1.获取generator函数迭代器
  let gen =func(arr);
  //2.封装执行函数
  function exec(value){
    let next=gen.next(value);
    console.log('next... ',next);
    //3.获取到每一步的执行结果
    if(!next.done){
      //4.获取到每一步yield执行结果,之后继续调用next
      let value =next.value;
      if(value.then){
      value.then(res=>{
        exec(res);
      })
      }else{
        exec(value);
      }
    }
  }
  exec();
}
run(loadImgSync,arr);
```
