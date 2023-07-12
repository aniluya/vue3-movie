const express=require('express')
const router=require('./router')

const app=express()

app.use('/static/carousel',express.static('C:\\web\\static\\carousel'))
app.use('/static/images',express.static('C:\\web\\static\\images'))
app.use('/static/movie',express.static('C:\\web\\static\\movie'))

app.use(express.urlencoded({extended:false}))

//一定要在路由之前，配置cors这个中间件，从而解决接口跨域问题
const cors=require('cors')
app.use(cors())//这里一定要写cors()，写了cors会导致网页一直处于加载中


// //配置history模式的解决方案
// const history = require('connect-history-api-fallback');
// app.use(history());

app.use(router)

//定义错误级别的中间件，捕获整个项目的异常错误，从而防止程序的崩溃
app.use((err, req, res, next)=>{
    console.log('发生了错误'+err.message)
    res.send('Error：'+err.message)
    next()
})

app.listen(80,()=>{
    console.log('sever run on http://127.0.0.1')
})