# JSX
JSX 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖。
JSX可以生成React"元素".
## 为什么使用JSX
可以更好的描述UI应该呈现出它应有交互的本质形式,提供视觉上的辅助作用.

```JavaScript
	const element = <h1>Hello, world!</h1>;
```
## 在JSX中嵌入表达式
声明一个`name`变量,然后再JSX中使用,并将它包裹在大括号内:
```JavaScript
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
```
大括号内放置任何有效的JavaScript表达式.
表达式是代码的任何有效单元,其解析为一个值.
表达式从概念上分带有副作用以及在某种意义上评估并因此解析为值的.
`x=7`是第一种.此表达式将值7赋给变量`x`.表达式本身的评估结果为7.
`3+4`是第二种.此表达式将三个和四个一起添加,而不是将结果七分配给变量.

JavaScript具有以下表达式类别：
* 算术：求值为数字，例如3.14159。（通常使用算术运算符。）
* String：计算为字符串，例如“Fred”或“234”。（通常使用字符串运算符。）
* 逻辑：计算结果为true或false。（通常涉及逻辑运算符。）
* 主要表达式：JavaScript中的基本关键字和一般表达式。
* 左侧表达式：左值是赋值的目标。
## JSX也是一个表达式
在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。

也就是说，你可以在 if 语句和 for 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX：
```JavaScript
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```
## JSX特点属性
可以使用引号来将属性值指定为字符串字面量.
```JavaScript
const element = <div tabIndex="0"></div>;
```
也可以使用大括号在属性值中插入一个JavaScript表达式.
```JavaScript
const element = <img src={user.avatarUrl}></img>;
```
## 使用JSX指定子元素
可以是单标签.也可以有很多子元素.
## JSX防止注入攻击
## JSX表示对象
Babel会把JSX转移为一个名为React.createElement()函数调用.
创建这样的对:
```JavaScript
// 注意：这是简化过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```
这些对象被称为"React元素".
# 深入JSX
## 指定React元素类型
JSX标签的第一部分制定了React元素的类型.
大写字母开头意味着是React组件.这些标签会被编译为对命名变量的直接饮用.
### React必须在作用域内
使用JSX则必须导入React库,当某组件被使用也应导入该组件.
### 在JSX类型中使用点语法
在 JSX 中，你也可以使用点语法来引用一个 React 组件。当你在一个模块中导出许多 React 组件时，这会非常方便。例如，如果 MyComponents.DatePicker 是一个组件，你可以在 JSX 中直接使用：
```JavaScript
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```
### 用户定义的组件必须以大写字母开头
小写字母代表HTML内置组件,会生成相应的字符串传递给`React.createElement`.
大写字母则对应组件,如`<Foo/>`会被便以为`React.createElement(Foo)`.
### 在运行时选择类型
## JSX中的Props
### JavaScript表达式作为Props
### 字符串字面量
### Props默认值为"True"
### 属性展开
可以使用展开运算符`...`传递整个props对象.
也可以选择保留当前组件需要接受的props,并使用展开运算符将其他props传递下去.
谨慎使用,避免将不必要的props传递给不相关的组件.
### JSX子元素
### 函数作为子元素
```JavaScript
// 调用子元素回调 numTimes 次，来重复生成组件
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```
### 布尔类型,Null以及Undefined将会被忽略
想渲染需要先将它们转换为字符串.
falsy值仍然会被渲染.确保 `&&`之前的表达式总为布尔值.
```JavaScript

```
```JavaScript

```
