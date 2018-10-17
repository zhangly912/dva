/**
 * 完成 Model 之后，我们来编写 Component 。
 * 推荐尽量通过 stateless functions 的方式组织 Component，
 * 在 dva 的架构里我们基本上不需要用到 state 。
 * 
 * 1.这里先 import styles from './index.less';，
 * 再通过 styles.xxx 的方式声明 css classname 是基于 css-modules 的方式，
 * 后面的样式部分会用上

 * 2. 通过 props 传入两个值，count 和 dispatch，
 * count 对应 model 上的 state，在后面 connect 的时候绑定，dispatch 用于分发 action

 3. dispatch({type: 'count/add'}) 表示分发了一个
  {type: 'count/add'} 的 action，至于什么是 action，详见：Redux
  https://redux.js.org/basics/actions
 */
import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
const CountApp = ({count, dispatch}) => {
  return (
    <div className={styles.normal}>
      <div className={styles.record}>Highest Record: {count.record}</div>
      <div className={styles.current}>{count.current}</div>
      <div className={styles.button}>
        <button onClick={() => { dispatch({type: 'count/add'}); }}>+</button>
      </div>
    </div>
  );
};
/**
 * 
 * 在定义了 Model 和 Component 之后，我们需要把他们连接起来。
 * 这样 Component 里就能使用 Model 里定义的数据，
 * 而 Model 中也能接收到 Component 里 dispatch 的 action 。
 * 
 * connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
 * [这里的 connect 来自 react-redux。]
 * https://github.com/reduxjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
 */
function mapStateToProps(state) {
  console.log(state.count)
    return { count: state.count };
}
export default connect(mapStateToProps)(CountApp);
