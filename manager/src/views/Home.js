import React from 'react';
import { connect } from 'dva';
import style from "./home.css"
import { Menu, Icon } from 'antd';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className={style.wrap}>
                <div className={style.nav}>
                    <h4>
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg" alt="" />
                    </h4>
                    <h5>
                        <span>
                            <img src="https://cdn.nlark.com/yuque/0/2019/png/anonymous/1547609339813-e4e49227-157c-452d-be7e-408ca8654ffe.png?x-oss-process=image/resize,m_fill,w_48,h_48/format,png" alt="" /> chenmanjie
                        </span>
                    </h5>
                </div>
                <main className={style.main}>
                    <div className={style.left}>
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark"
                            inlineCollapsed={this.state.collapsed}
                        >
                            <Menu.SubMenu
                                key="sub1"
                                title={
                                    <span>
                                        <Icon type="pie-chart" />
                                        <span>Navigation One</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <Icon type="desktop" />
                                        <span>Navigation One</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu
                                key="sub3"
                                title={
                                    <span>
                                        <Icon type="inbox" />
                                        <span>Navigation One</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu
                                key="sub4"
                                title={
                                    <span>
                                        <Icon type="mail" />
                                        <span>Navigation One</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu
                                key="sub5"
                                title={
                                    <span>
                                        <Icon type="appstore" />
                                        <span>Navigation Two</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="9">Option 9</Menu.Item>
                                <Menu.Item key="10">Option 10</Menu.Item>
                                <Menu.SubMenu key="sub6" title="Submenu">
                                    <Menu.Item key="11">Option 11</Menu.Item>
                                    <Menu.Item key="12">Option 12</Menu.Item>
                                </Menu.SubMenu>
                            </Menu.SubMenu>
                        </Menu>
                    </div>
                    <div className={style.right}></div>
                </main>
            </div>
        );
    }
}

export default connect()(Home);