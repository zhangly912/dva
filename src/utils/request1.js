import axios from 'axios';
import qs from 'qs'; //处理post请求传参数问题 序列化参数
import {getStorage} from './utils';
import { message } from 'antd';
import baseURL  from './env';


// let baseURL = 'https://bp-backend-test.wxb.com.cn/';

let xhr = ({ url,body,method,returnAll,loading,contentType}) => {
  let _obj = {
    withCredentials: true,
    url: url,
    method: method,
    baseURL: baseURL,
    headers:{
      'Token':getStorage("token")
    }
  }
  if(contentType){
    _obj.headers['Content-Type'] = 'application/json;charset=UTF-8';
  }

  if (method == 'get') { //axios method不同传入参数的方式也不一样
    _obj.params = body;
  } else {
    _obj.data = contentType?body:qs.stringify(body);
  }

  return new Promise((resolve, reject) => {
    axios(_obj)
      .then((res) => {
        //code = 10000 表示成功
        //code = 60001 没有访问权限
        //code = 50003 密码错误
        //code = 50002 登录名错误
        //code = 50001 用户未登录
       
        if(res.data.code && res.data.code == 50001){
          window.location.href = window.location.origin+window.location.pathname+"#/login";
          return false;
        }

        //传递此参数表示除跳转登录之外 所有错误码自行处理
        if (returnAll) {
          return resolve(res.data);
        }

        if (res.data.code && res.data.code != 10000) {
          message.error(res.data.msg)
          return false;
        }
        delete res.data.code;

        return resolve(res.data);
      })
      .catch((e) => {
        message.error("服务器请求失败")
      })

  });
}

export default function fetch({url='',params={},method='get', returnAll=false,loading=false,contentType='form'}) {
  let obj = {
    url,
    method: method.toLowerCase(),
    body: params,
    returnAll,
    loading,
    contentType: contentType=='json'?true:false
  } 
  return xhr(obj);
}