/* eslint-disable */
let baseUrl = '';
let environment = '';
let otherUrl = {
  fx: ''
};

let _urls = {
  platform: {
    test: 'https://bp-backend-test.wxb.com.cn/',
    regress: 'http://121.41.32.216:7005/',
    prd: 'https://bp-backend.wxb.com.cn/',
    qa:'http://services.qa.com:8016/',
    mock: 'http://doclever.wxb.com.cn/mock/5a02ce68e74903332f376248/',
  },
  fx: {
    test: 'https://fxtest.wxb.com.cn/f7api/',
    regress: 'https://fxregress.wxb.com.cn/f7api/',
    qa:'http://services.qa.com:8006/',
    prd: 'https://f7xfx.wxb.com.cn/f7api/'
  }
};

/*
 * 获取url中参数，替代getArgs
 * @key: 要获取的参数
 * @url: 要被解析的字符串，为空则默认值为location.href
 * @return: 包含所有key的obj,key存在则返回对应的value
 */
function parseQueryString(key, url) {
  url = url || location.href;
  var query = {},
    i, params, param, length;
  if (typeof url === 'string' && url.length) {
    url = url.indexOf('?') > -1 ? url.replace(/\S*\?/, '') : '';
    params = url.split('&'), length = params.length;

    for (i = 0; i < length; i++) {
      param = params[i].replace(/#\S+/g, '').split('=');
      query[decodeURIComponent(param[0])] = decodeURIComponent(param[1]) || '';
    }
  }
  return query[key] || query;
}

(function () {
  const host = location.host;
  if (/^bp\.wxb\.com\.cn/.test(host)) { // 正式
    baseUrl = _urls.platform.prd;
    otherUrl.fx = urls.fx.prd;
    environment = 'production';
  } else if (/^f7test\.wxb\.com\.cn/.test(host)) { // test
    if (parseQueryString('env') == 'local') {
      baseUrl = parseQueryString('localUrl');
    } else {
      baseUrl = _urls.platform.test;
    }
    otherUrl.fx = _urls.fx.test;
    environment = 'test';
  } else if (/^f7regress\.wxb\.com\.cn/.test(host)) {
    if (parseQueryString('env') == 'local') {
      baseUrl = parseQueryString('localUrl');
    } else {
      baseUrl = _urls.platform.regress;
    }
    otherUrl.fx = _urls.fx.regress;
    environment = 'regress';
  } else {
    baseUrl = process.env.baseURL || _urls.platform.test;
    otherUrl.fx = _urls.fx.test;
    environment = 'test';
  }
})();

export {
  environment,
  otherUrl
};

export default baseUrl;
