// demo 1

// const webpack = require('webpack');
// module.exports = {
//     entry: __dirname + '/src/app.js', //唯一打包入口文件
//     output: {
//         path: __dirname + '/bin',     //打包后输出文件的文件名
//         filename: 'bundle.js'         //打包后输出文件的文件名
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.js$/,
//                 exclude: /(node_modules|bower_components)/,  //这些文件夹不用打包
//                 loader: 'babel-loader'
//             },
//             { 
//                 test: /\.css$/, 
//                 loader: "style-loader!css-loader" 
//             }
//         ]
//     },
//     plugins: [
//         new webpack.optimize.UglifyJsPlugin({
//             compress: {
//                 warnings: false,
//             },
//             output: {
//                 comments: false,
//             },
//         }),
//     ]
// }


// demo 2
// __dirname: 是nodeJs中的全局变量，他指向当前执行脚本所在目录

module.exports = {
    devtool: 'eval-source-map', 
    entry: __dirname + '/app/main.js', //已经多次提及的入口文件
    output: {
        path: __dirname + '/public', //打包后文件存放的地方
        filename: 'bundle.js'        //打包后输出文件的文件名
    },
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    }
};