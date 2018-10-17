import fetch from '../utils/request1';

export const getToken = () => fetch({url:'getToken' });
export const login = (forms) => fetch({url:'login', params:forms, method: 'post' });
export const logout = () => fetch({url:'logout', method: 'post' });
