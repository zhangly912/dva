
import qs from 'qs';
import { routerRedux } from 'dva/router';
import { getToken, login } from '../services/login';
import { setStorage } from '../utils/utils';
import baseUrl from '../utils/env';
export default {
    namespace: 'login',
    state: {
        token: '',
        baseUrl
    },
    reducers: {
        setToken(state, action) {
            const { payload } = action;
            return {
                ...state,
                token: payload.token
            };
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                console.log(pathname)
                if (pathname === '/login') {
                    dispatch({
                        type: 'doGetToken',
                    });
                }
            });
        },
    },
    effects: {
        *doGetToken({ payload }, { call, put }) {
            const res = yield call(getToken);
            yield put({
                type: 'setToken',
                payload: {
                    token: res.data
                }
            });
            setStorage({ name: 'token', value: res.data });

        },
        *doLogin({ payload }, { call, put }) {
            const { forms } = payload;
            const query = window.location.query ? qs.parse(window.location.query.substr(1)) : {};
            const res = yield call(login, forms);
            const { user, functionPermissionList } = res.data;
            setStorage({ name: 'userInfo', value: JSON.stringify(user) });
            setStorage({ name: 'allLink', value: JSON.stringify(functionPermissionList) });
            yield put({
                type: 'setUser',
                payload: {
                    ...user
                }
            });
            yield put({
                type: 'setMenu',
                payload: [
                    ...functionPermissionList
                ]
            });
            if (query.redirect) {
                yield put(routerRedux.push(query.redirect));
            } else {
                yield put(routerRedux.push('/users'));
            }

        }
    }

}
