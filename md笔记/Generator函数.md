#Generator 
更强大、更完善的 ES6 异步编程方法
**异步编程的语法目标,就是怎么让它更像同步编程.**
以前的异步编程方式,大概有下面四种.
- 回调函数
- 事件监听
- 发布/订阅
- Promise
##什么是异步
异步就是讲任务分成两段,先执行第一段,然后执行其他任务,等准备好了,再执行第二段.

比如有个任务是读取文件进行处理,异步过程是下面这样.

![异步步骤](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015042403.png)
上述步骤,第一段向操作系统发出请求,要求读取文件.然后,程序执行其他任务,等到操作系统返回文件,再接着执行任务的第二段(处理文件).

**这种不连续的执行,就叫做异步.**相应地,连续的执行,就叫做同步.

![同步步骤](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015042404.png)
上图是同步的执行方式.由于是连续执行,不能插入其他任务,所以操作系统从硬盘读取文件的这段时间,程序只能干等着.
##回调函数的概念
javaScript语言对异步编程的实现,就是回调函数.**所谓回调函数,就是把任务的第二段单独写在一个函数里,等到重新执行这个任务的时候,就直接i奥用这个函数.**它的英文名字**callback**,直译过来就是"重新调用".
读取文件的代码如下:
		
	fs.readFile('/etc/passwd', function (err, data) {
		if (err) throw err;
		console.log(data);
	});
readFile函数第二个参数,就是回调函数,也就是任务的第二段.等到操作系统返回了 /etc/passwd 这个文件以后,回调函数才会执行.

一个有趣的问题,为什么Node.js约定,回调函数第一个参数,必须是错误对象err?原因是 执行分成两段,在这两段之间抛出的错误,程序无法捕捉,只能当作参数,传入第二段.

##Promise
回调函数本身没问题,它的问题出现在多个回调函数嵌套.

	fs.readFile(fileA, function (err, data) {
		fs.readFile(fileB, function (err, data) {
			// ...
		});
	});
 如果依次读取多个文件,就会出现多重嵌套。代码横向发展，很快会乱成一团，无法管理。这种情况被称为“回调函数噩梦”（callback hell）
 Promise就是为了解决这个问题而提出的。它不是新语法功能，而是新写法，允许将回调函数的横线加载，改为纵向加载。

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
Promise 提供了then方法加载回调函数，catch方法捕捉执行过程中抛出的错误。
只是回调函数的改进，异步的分段执行更加清楚，而已。
Promise最大的问题是代码冗余，原来的任务呗Promise包装了一下，不管什么操作，一眼看去都是一堆then，原来的语法变得很不清楚。
##协程
传统编程语言中一种解决方案叫做“协程”。意思是多个线程互相协作，完成异步任务。
协程有点像函数，又有点像线程。它的运行流程大致如下。
	
	第一步，协程A开始执行。

	第二步，协程A执行到一半，进入暂停，执行权转移到协程B。

	第三步，（一段时间后）协程B交还执行权。

	第四步，协程A恢复执行。
举例来说，读取文件的协程写法如下。

	function asnycJob() {
		// ...其他代码
		var f = yield readFile(fileA);
		// ...其他代码
	}
上面代码的函数asyncJob是一个协程，它的奥妙就在其中的yield命令。它表示代码执行到此处，执行权交给其他协程。也就是说，yield命令是异步两个阶段的分界线。
协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。
##Generator函数的概念
Generator函数是协程在ES6的实现，最大特点就是可以交出函数的执行权（即暂停执行）。
```javascript
function* gen(x){
	var y = yield x + 2;
	return y;
}
```
上面的代码就是一个Generator函数。它不同于普通函数，是可以暂停执行的，所以函数名前要加星号，以示区别。
整个Generator函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用yield语句注明。Generator函数的执行方法如下。
```javascript
var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
```
上述，第一个next方法的value属性，返回表达式x+2的值（3）。第二个next方法待遇参数2，这个参数可以传入Generator函数，作为上个阶段异步任务的返回结果，被函数体内的变量y接受。