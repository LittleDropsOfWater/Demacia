import React from 'react';
import { connect } from 'dva';
import style from "./home.css"
import { Menu, Icon } from 'antd';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    "title": "试题管理",
                    "icon": "gitlab",
                    "id": "123",
                    "data": [
                        {
                            "title": "添加试题",
                            "id": "1230",
                        }, {
                            "title": "试题分类",
                            "id": "9630",
                        }, {
                            "title": "查看试题",
                            "id": "8520",
                        }
                    ]
                },
                {
                    "title": "用户管理",
                    "icon": "user",
                    "id": "452",
                    "data": [
                        {
                            "title": "添加用户",
                            "id": "7410",
                        }, {
                            "title": "用户展示",
                            "id": "3697",
                        }
                    ]
                }, {
                    "title": "考试管理",
                    "icon": "file-done",
                    "id": "175",
                    "data": [
                        {
                            "title": "添加考试",
                            "id": "8654",
                        }, {
                            "title": "试卷列表",
                            "id": "1036",
                        }
                    ]
                }, {
                    "title": "班级管理",
                    "icon": "project",
                    "id": "1832",
                    "data": [
                        {
                            "title": "班级管理",
                            "id": "3026",
                        }, {
                            "title": "教室管理",
                            "id": "7542",
                        }, {
                            "title": "学生管理",
                            "id": "3620",
                        }
                    ]
                }, {
                    "title": "阅卷管理",
                    "icon": "project",
                    "id": "156",
                    "data": [
                        {
                            "id": "8543",
                            "title": "特批管理"
                        }
                    ]
                }
            ]

        };
    }
    render() {
        const { list } = this.state
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
                            {
                                list.map(item => (
                                    <Menu.SubMenu
                                        key={item.id}
                                        title={
                                            <span>
                                                <Icon type={item.icon} />
                                                <span>{item.title}</span>
                                            </span>
                                        }
                                    >
                                        {
                                            item.data.map(file => (
                                                <Menu.Item key={file.id}>{file.title}</Menu.Item>
                                            ))
                                        }
                                    </Menu.SubMenu>
                                ))
                            }
                        </Menu>
                    </div>
                    <div className={style.right}>
                        <div className={style.content}>
                            <h4></h4>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
export default connect()(Home);