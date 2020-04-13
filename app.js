const createError = require('http-errors')
const express = require('express')
const path = require('path')
const router = require('./routes/index.js');
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const db = require('./mongodb/db')
const ejs = require('ejs')

const app = express();
//path.join() 方法使用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。
app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.__express);
app.set('view engine', 'html');
app.use(logger('dev')); //在开发环境下禁止记录静态文件的请求记录
app.use(express.json()); //express.json() 内置的中间件，基于body-parser使用json来分析传入的请求
app.use(express.urlencoded({ extended: false })); //express.urlencoded()内置的中间件，基于body-parser使用urlencoded来分析传入的请求
app.use(cookieParser());
//express.static(root, option)内置的中间件通过root(静态文件的根目录)提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理中间件参数next必须定义，不然就被当作常规的中间件不能处理错误信息
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.all('*', function(req, res, next) { //设置请求头
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
}) 

router(app);

module.exports = app;
