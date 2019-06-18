#setState
参数（对象，回调函数）
回调函数在协调完毕，dom生成后执行。
依靠Object.assign 合并对象
#props
父传子，子传父
#cssModule
#事件绑定
##合成事件：
- 消除浏览器差异
- 把dom和事件进行解耦
##三种方式绑定this：
- bind this
- 箭头函数  （匿名函数不相等，容易引起不必要的渲染）
- constructor里进行bind （效率更高）
#ref
获取dom，  用在组件上会获得组件实例，依靠finNodeDOM
#redux
connect，
四个参数，
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
state哪来？
依靠上层组件依靠Provider组件传递值 
组件依靠context组件接受值
[mapStateToProps]：
将state作为props注入到组件中
mapDispatchToProps(dispatch, [ownProps]) ：
第二个参数能将action作为props绑定到组件中
[mergeProps]：
mergeProps(stateProps, dispatchProps, ownProps) 该参数非必须，redux默认会帮你把更新维护一个新的props对象，类似调用Object.assign({}, ownProps, stateProps, dispatchProps)。
[options]:
options.pure:true, 当设为false时，浅拷贝依旧可以更新state

