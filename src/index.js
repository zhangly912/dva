import dva from 'dva';
import { message } from 'antd';
import createLoading from 'dva-loading';
import './index.less';

// 1. Initialize
const app = dva({
    //全局错误处理通常会这么做
    onError(e) {
        message.error(e.message, /* duration */3);
      },
});

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/login').default);

app.model(require('./models/count').default);
app.model(require('./models/users').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
