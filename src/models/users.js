import * as usersService from '../services/users';

export default {
    namespace: 'users',
    state: {
        list: [],
        total: 0,
        current: 1,
        pageSize: 10,
        count:1
    },
    reducers: {
        save(state, { payload: { list, total, current, pageSize } }) {
            return { ...state, list, total, pageSize, current };
        },
        getRole(state,{payload:{count}}){
            return {
                ...state,
                count
            }
        }   
    },
    effects: {
        *fetch({ payload }, { call, put, select }) {
            let currentPage = payload.current || (yield select(state => state.users.current));
            let pageSize = payload.pageSize || (yield select(state => state.users.pageSize));
            const { data } = yield call(usersService.getUserList, { currentPage: currentPage, pageSize: pageSize });
            yield put({
                type: 'save',
                payload: {
                    list: data.pageList,
                    total: data.count,
                    current: currentPage,
                    pageSize: pageSize
                },
            });
        },
        *'delete'({ payload: { id: userId, index } }, { call, put, select }) {
            yield call(usersService.deleteUser, { userId });
            yield put({
                type: 'fetch', payload: {}
            });
        },
        //除非有特殊需要 不然effect里面和reducers里面的函数名称不要定义重名
        *getRole({payload},{call,select,put}){
           let {data} =  yield call(usersService.getRoleList);
            // yield put({
            //     type:'getRole',
            //     payload:{
            //         count: (yield select(state=>state.users.count)) +1
            //     }
            // })
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/users') {
                    dispatch({ type: 'fetch', payload: {} });
                }
            });
        },
    },
};