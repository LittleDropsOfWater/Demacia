# 协调
React 提出了一套 O(n) 的启发式算法：

两个不同类型的元素会产生出不同的树；
开发者可以通过 key prop 来暗示哪些子元素在不同的渲染下能保持稳定；
在实践中，我们发现以上假设在几乎所有实用的场景下都成立。
## Diffing算法
### 对比不同类型的元素
类型变化就会触发完整的重建流程.
```JavaScript
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```
### 对比同一类型的元素
保留DOM阶段,仅对比及更新有改变的属性
### 对比同类型的组件元素	
React 将更新该组件实例的 props 以跟最新的元素保持一致，并且调用该实例的 componentWillReceiveProps() 和 componentWillUpdate() 方法。

下一步，调用 render() 方法，diff 算法将在之前的结果以及新的结果中进行递归。


图示：
![diff算法](..\img\diff算法.png)
```JavaScript

```
```JavaScript

```
```JavaScript

```
