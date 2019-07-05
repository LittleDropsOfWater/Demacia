http://www.ruanyifeng.com/blog/2015/05/async.html
# 终极解决
异步操作是JavaScript编程的麻烦事，麻烦到一直有人提出方案，试图解决这个问题。
从最早的回调函数，到Promise对象，再到Generator函数，每次都有改进，但又让人觉得不彻底。它们都有额外的复杂性，都需要理解抽象的底层运行机制。
异步I/O不就是读取一个文件吗，干嘛搞得这么复杂？**异步编程的最高境界，就是根本不用关心它是不是异步。**
async函数就是隧道尽头的亮光，很多人认为它是异步操作的终极解决方案。
# async函数是什么？
**一句话，async函数就是Generator函数的语法糖**
有一个Generator函数，依次读取两个文件。
```javascript
var fs = require('fs');

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) reject(error);
      resolve(data);
    });
  });
};

var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```
写成async函数，就是下面这样。
```javascript
var asyncReadFile = async function (){
  var f1 = await readFile('/etc/fstab');
  var f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```
一比较就会发现，async函数就是将Generator函数的星号（*）替换成async，将yield替换成await，仅此而已。
# async函数的优点
async函数对Generator函数的改进体现在以下3点。
## （1）内置执行器
Generator函数的执行必须依靠执行器，所以才有co函数库，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。
```javascript
var result = asyncReadFile();
```
## （2）更好的语义
async和await，比起星号和yield，语义更清楚了。async表示函数有异步操作，await表示紧跟在后面的表达式需要等待结果。
## （3）更广的适用性
co函数库约定，yield命令后面只能是Thunk函数或Promise对象，而async函数的await命令后面，可以跟Promise对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
# async函数的实现
**async函数的实现，就是将Generator函数和自动执行器，包装在一个函数里**
```javascript
async function fn(args){
  // ...
}

// 等同于

function fn(args){ 
  return spawn(function*() {
    // ...
  }); 
}
```
所有async函数都可以写成上面的第二种形式，其中spawn函数就是自动执行器。
spawn函数的实现，基本就是前文自动执行器的翻版。
async函数是非常新的语法功能，新到都不属于ES6，而是属于ES7。目前，它仍处于提案阶段，但转码器Babel和regenerator都已支持，转码后就能使用。
# async函数的用法
async函数返回一个Promise对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。
下面是一个例子。
```javascript
async function getStockPriceByName(name) {
  var symbol = await getStockSymbol(name);
  var stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('goog').then(function (result){
  console.log(result);
});
```
上面代码是一个获得股票报价的函数，函数前面的async关键字，表面该函数内部有异步操作。调用该函数时，会立即返回一个Promise对象。

下面的例子，指定多少毫秒后输出一个值。
```
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value)
}

asyncPrint('hello world', 50);
```
上面代码指定50毫秒以后，输出“hello world”。
# 注意点
await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。
await命令只能用在async函数之中，如果用在普通函数，就会报错。
