import React from 'react';
import { connect } from 'dva';
import style from "./IndexPage.css"
import {Form,Icon,Input,Button,Checkbox} from "antd"
class IndexPage extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={style.wrap}>
        <div className={style.login}>
        <Form onSubmit={this.handleSubmit} className={style.login_form}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住密码</Checkbox>)}
          <a className={style.login_form_forgot} href="">
            忘记密码
          </a>
          <Button type="primary" htmlType="submit" className={style.login_form_button}>
            登录
          </Button>
        </Form.Item>
      </Form>
        </div>
       
      </div>
    );
  }
}


const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(IndexPage)


export default connect()(WrappedNormalLoginForm);




