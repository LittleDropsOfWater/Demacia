# mobx
基于装饰器的状态管理库 
装饰器：高阶函数的语法糖?
 依赖:
babel-plugin-transform-decorators-legacy 生成依赖
  mobx 开发依赖
mobx-react 开发依赖

 配置  配置 packjson

```js
 "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
					"legacy": true
        }
      ]
    ]
  }
```

 配置子模块
创建类属性和 action

```js
import { observable, action } from "mobx";
export default class Count {
  // 模块的数据
  @observable count = 100;

  // 模块的行为
  @action.bound //.bound 绑定this
  changeCount(type) {
    type === "+" ? this.count++ : this.count--;
  }
}
```

 配置 store
导入子模块 创建实例并导出

```js
//加载子模块 count
import Count from "./modules/count";
//引入日志
import { autorun } from "mobx";

let count = new Count();
//打印变化
autorun(() => {
  console.log("count.change....", count.count);
});
export default {
  count
};
```

 配置 index.js
引入 store 和 Provider

```js
import { Provider } from "mobx-react";
import store from "./store";
ReactDOM.render(
  <Provider {...store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

 组件获取 store

```js
import { inject, observer } from "mobx-react";
@inject("count") //获取store的值
@observer //响应更新store
class App extends React.Component {
  render() {
    const {
      count: { count, changeCount }
    } = this.props;
    return (
      <div>
        <button onClick={() => {changeCount("+"); }} > + </button>
        <p> pp{count}</p>
        <button onClick={() => {changeCount("-"); }} > - </button>
      </div>
    );
  }
}

export default App;
```
 核心概念
 Observable state(可观察的状态)
通过`@observable` 添加类属性
使类属性可观察
```js
import { observable } from "mobx";

class Todo {
    id = Math.random();
    @observable title = "";
    @observable finished = false;
}
```
 Computed values(计算值)
定义在相关数据发生变化时自动更新的值.
通过`@computed`装饰器进行使用.
```js
class TodoList {
    @observable todos = [];
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}
```
 Reactions(反应)
与计算值很像,但是会产生一些副作用,比如打印到控制台、网络请求、递增地更新React组件树以修补DOm、等等。reactions在响应式编程和命令式编程之间建立沟通的桥梁。
 React组件
可以把无状态组件编程响应式组件，
方法是在组件上添加`observe`函数/装饰器。`observer`由`mobx-react`包提供的.
```js
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';

@observer
class TodoListView extends Component {
    render() {
        return <div>
            <ul>
                {this.props.todoList.todos.map(todo =>
                    <TodoView todo={todo} key={todo.id} />
                )}
            </ul>
            Tasks left: {this.props.todoList.unfinishedTodoCount}
        </div>
    }
}

const TodoView = observer(({todo}) =>
    <li>
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => todo.finished = !todo.finished}
        />{todo.title}
    </li>
)

const store = new TodoList();
ReactDOM.render(<TodoListView todoList={store} />, document.getElementById('mount'));
```
`observer`会将React(函数)组件转换为它们需要渲染的数据的衍生.(高阶函数??)使用MobX时没有所谓的智能和无脑组件.所有的组件都会以巧妙的方式进行渲染,而只需要一种简单无脑的方式来定义他们.MobX会确保组件总是在需要的时候重新渲染，但仅此而已。所以上面例子中的`onClick`处理方法会强制对应的`TodoView`进行渲染,如果未完成任务的数量(unfinishedTodoCount)已经改变,它将导致`TodoListView`进行渲染.可是,如果移除`Tasks left`这行代码(或者将它放到另一个组件中),当点击`checkbox`的时候`TodoListView`就不再重新渲染.你可以在`JSFiddle`中自己动手来验证这点.
 自定义reacts
使用`autorun`、`reaction`和`when`函数即可简单的创建自定义reactions,以满足你的具体场景.
例如,每当`unfinishedTodoCount`的数量发生变化时,下面的`autorun`会打印日志消息:
```js
autorun(() => {
    console.log("Tasks left: " + todos.unfinishedTodoCount)
})
```
 MobX会对什么做出响应?
为什么每次`unfinishedTodoCount`变化时都会打印一条新消息?答案就是下面这条经验法则:
*MobX会对在执行**跟踪函数**期间**读取**的任何现有的可观察属性做出反应*
读取
追踪函数
过程
追踪属性访问,而不是值
 Actions(动作)
状态应该以某种方式来更新.
REact组件只是状态的华丽战士,而状态的衍生由MobX来管理.
 MobX:简单且可扩展
侵入性小
 使用类和真正的引用
不需要数据标准化. 可以使用于复杂的领域模型 ,如Mendix
 保证参照完整性
自动跟踪状态和衍生直接的关系
 更简单的actions更便于维护
修改状态非常简单.
