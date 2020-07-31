import React from 'react'
import axios from 'axios';
import { message, Row, Col, Button, Input } from 'antd';
import "antd/dist/antd.css"
import styles from './Signin.module.css'
import withAuth from '../hocs/withAuth'

class Signin extends React.Component {
  state = {
    email: '',
  };
  passwordRef = React.createRef(null); //한번 만들어지면 객체 인스턴스는 그대로
  render() {

    return (
      <form>
        <Row align="middle" justify="center" className={styles.form_row}>
          <Col span={24}>
            <Row className={styles.content}>
              <Col span={12} className={styles.sign_login}>

                <h1>Welcome to My Books</h1>
                <p className={styles.sign_id}>
                  <div>Email</div>
                  <Input className={styles.sign_input} type="email" value={this.state.email} onChange={this.change} />
                </p>
                <p className={styles.sign_pw}>
                  <div>Password</div>
                  <Input className={styles.sign_input} type="password" ref={this.passwordRef} />
                </p>
                <p>
                  <Button className={styles.sign_btn} type="primary" onClick={this.click}>Login</Button>
                </p>

              </Col>
            </Row>
          </Col>
        </Row>
      </form >
    );
  }
  click = async () => {
    const email = this.state.email;
    const password = this.passwordRef.current.value;
    if (email === '' || password === '') return;
    try {
      const response = await axios.post('https://api.marktube.tv/v1/me', { email, password });
      const token = response.data.token;
      sessionStorage.setItem('token', token);
      this.props.history.push('/');
    } catch (err) {
      const errCode = err.response.data.error;
      if (errCode === 'PASSWORD_NOT_MATCH') {
        message.error('Password Not Match');
      } else if (errCode === 'USER_NOT_EXIST') {
        message.error('Unvalid User Email');
      } else {
        message.error('Unknown Error');
      }
    }
  }
  change = e => {
    this.setState({ email: e.target.value })
  }

}

export default withAuth(Signin, false);
