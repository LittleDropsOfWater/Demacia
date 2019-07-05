virtul DOM 也就是虚拟节点。通过JS的Object对象模拟DOM中的真实节点对象，再通过特定的render方法将其渲染成真实的DOM节点。

合并DOM操作 和计算最小需要操作数

# React中的虚拟DOM是什么？
　   虽然React中的虚拟DOM很好用，但是这是一个无心插柳的结果。 　　

　  React的核心思想：一个Component拯救世界，忘掉烦恼，从此不再操心界面。
1. Virtual Dom快，有两个前提
1.1 Javascript很快
　　 Chrome刚出来的时候，在Chrome里跑Javascript非常快，给了其它浏览器很大压力。而现在经过几轮你追我赶，各主流浏览器的Javascript执行速度都很快了。

　　 在 https://julialang.org/benchmarks/ 这个网站上，我们可以看到，JavaScript语言已经非常快了，和C就是几倍的关系，和java在同一个量级。所以说，单纯的JavaScript还是还是很快的。

　　

1.2 Dom很慢
当创建一个元素比如div，有以下几项内容需要实现： HTML element、Element、GlobalEventHandler。简单的说，就是插入一个Dom元素的时候，这个元素上本身或者继承很多属性如 width、height、offsetHeight、style、title，另外还需要注册这个元素的诸多方法，比如onfucos、onclick等等。 这还只是一个元素，如果元素比较多的时候，还涉及到嵌套，那么元素的属性和方法等等就会很多，效率很低。

　　比如，我们在一个空白网页的body中添加一个div元素，如下所示：
这个元素会挂载默认的styles、得到这个元素的computed属性、注册相应的Event Listener、DOM Breakpoints以及大量的properties，这些属性、方法的注册肯定是需要h耗费大量时间的。

　　 尤其是在js操作DOM的过程中，不仅有dom本身的繁重，js的操作也需要浪费时间，我们认为js和DOM之间有一座桥，如果你频繁的在桥两边走动，显然效率是很低的，如果你的JavaScript操作DOM的方式还非常不合理，那么显然就会更糟糕了。 

　　而 React的虚拟DOM就是解决这个问题的！ 虽然它解决不了DOM自身的繁重，但是虚拟DOM可以对JavaScript操作DOM这一部分内容进行优化。