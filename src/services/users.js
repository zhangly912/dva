import fetch from '../utils/request1';

export const getUserList = (params) => fetch({
    url:'bpUser/userList',
    params:{
        ...params,
        keyType:1,
        keyWord: ""
    }});
export const getRoleList = () => fetch({
    url:'bpRole/roleList'
})

export const deleteUser = (params) =>fetch({
    url: 'bpUser/deleteUser',
    params: params,
    method:'post'
});