import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Icon, Input, Button } from 'antd';
import {getcookie} from '../../utils/utils';
import styles from './index.less';

const FormItem = Form.Item;

const isProduct = process.env.NODE_ENV === 'production';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initalUserName: getcookie('userName') || '',
      authCodeUrl: ''
    };
  }
  componentDidMount(){
    this.handleChangeCode();
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props);
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/doLogin',
          payload: {
            forms: {
              'userName': values.userName,
              'pwd': values.pwd,
              'authCode': values.authCode || ''
            },
            resolve: (userInfo) => {
              console.log(userInfo);
            },
            reject: (res) => {
              console.log(res);
            }
          }
        });
      }
    });
  }
  handleChangeCode() {
    const rnd = parseInt(Math.random() * 10000);
    const { baseUrl, token } = this.props.login;
    const authCodeUrl = `${baseUrl}getAuthCode?token=${token}&time=${rnd}`;
    this.setState({
      authCodeUrl
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <section className={styles.pgLogin}>
        <section className={styles.login_box}>
          <header className={styles.login_box_header} />
          <Form onSubmit={e => this.handleSubmit(e)} className={styles.login_form}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '账号名必填' }],
              })(
                <Input size='large' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('pwd', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input size='large' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
              )}
            </FormItem>
            <Row gutter={8}>
              <Col span={15} key='1'>
                <FormItem>
                  {getFieldDecorator('authCode', {
                    rules: [{ required: isProduct, message: '请输入验证码' }]
                  })(
                    <Input size='large' prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="验证码" />
                  )}
                </FormItem>
              </Col>
              <Col span={9} key='2'>
                <FormItem>
                  <img className={styles.login_auth_code} src={this.state.authCodeUrl} onClick={e => this.handleChangeCode(e)} />
                </FormItem>
              </Col>
            </Row>
            <FormItem>
              <Button size='large' type="primary" htmlType="submit" className={styles.login_form_button}>登录</Button>
            </FormItem>
          </Form>
        </section>
      </section>
    );
  }
}
const WrappedNormalLoginForm  = Form.create()(LoginPage);
function mapStateToProps({login}){
  return {login};
}

export default connect(mapStateToProps)(WrappedNormalLoginForm);
