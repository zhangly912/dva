import React from 'react';
import { connect } from 'dva';
import {Button} from 'antd';
import { routerRedux ,Link} from 'dva/router';
import styles from './index.less';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <div className={styles.list}>
        这是首页
      </div>
      <Link to="/login">登录</Link>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
