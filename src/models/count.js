import key from 'keymaster';
export default {
    /**
     * namespace 是 model state 在全局 state 所用的 key，
     * state 是默认数据。
     * 然后 state 里的 record 表示 highest record，current 表示当前速度。
     */
    namespace: 'count',
    state: {
        record: 0,
        current: 0
    },
    /**
     * 更新 state 是通过 reducers 处理的，详见 Reducers@redux.js.org。
     * https://cn.redux.js.org/index.html
     * 
     * reducer 是唯一可以更新 state 的地方，这个唯一性让我们的 App 更具可预测性，
     * 所有的数据修改都有据可查。
     * reducer 是 pure function(纯函数），他接收参数 state 和 action，返回新的 state，通过语句表达即 (state, action) => newState。
     */
    reducers: {
        add(state) {
            const newCurrent = state.current + 1;
            return {
                ...state,
                record: newCurrent > state.record ? newCurrent : state.record,
                current: newCurrent,
            }
        },
        minus(state) {
            return {
                ...state,
                current: state.current - 1
            }
        }
    },
    /**
    * 异步处理
       在此之前，我们所有的操作处理都是同步的，用户点击 + 按钮，数值加 1。
       现在我们要开始处理异步任务，dva 通过对 model 增加 effects 属性来处理 side effect(异步任务)，
       这是基于 redux-saga 实现的，语法为 generator。
       (但是，这里不需要我们理解 generator，知道用法就可以了)
   1.  *add() {} 等同于 add: function*(){}
   2.  call 和 put 都是 redux-saga 的 effects，call 表示调用异步函数，
       put 表示 dispatch action，其他的还有 select, take, fork, cancel 等，
       详见 redux-saga 文档

    */
    effects: {
        /**
            在这个需求里，当用户点 + 按钮，数值加 1 之后，
            会额外触发一个 side effect，即延迟 1 秒之后数值 -1 。
         */
        *add(action, { call, put }) {
            yield call(delay, 1000);
            yield put({ type: 'minus' });
            function delay(timeout) {
                return new Promise(resolve => {
                    setTimeout(resolve, timeout);
                });
            }
        }
    },
    subscriptions: {
        keyboardWatcher({ dispatch }) {
            key('⌘+up, ctrl+up', () => { dispatch({ type: 'add' }) });
        },
    },
};
