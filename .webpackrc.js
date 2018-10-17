const path = require('path');
export default {
    "alias": {
        "COMPONENTS": path.resolve(__dirname, "./src/components"),
        "MODElS": path.resolve(__dirname, "./src/models"),
        "ROUTES": path.resolve(__dirname, "./src/routes")
    },
    //这些不需要配置了 在roadhog 2.0 中
    //如果有 babel-runtime 依赖和配置了 babel-plugin-transform-runtime 插件，
    //需删除，因为已内置处理，否则可能会报 this.setDynamic is not a function 的错误
    "env": {
        "development": {
            "extraBabelPlugins": [
                "dva-hmr", //开发环境的热替
                // "transform-runtime",
                // ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]

            ]
        },
        // "production": {
        //     "extraBabelPlugins": [
        //         "transform-runtime",
        //         ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]

        //     ]
        // }
    },
    //编辑 .webpackrc，使 babel-plugin-import 插件生效。
    // babel-plugin-import 会帮助你加载 JS 和 CSS
    "extraBabelPlugins": [
        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
    ],
    "hash":true, //打包文件加上hash 
    //不使用public下面的模板 因为不会替换引入
    "html": { "template": "./src/index.ejs" } 


    // "disableCSSModules": true


}