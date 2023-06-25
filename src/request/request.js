// 对于axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css"
// start：进度条开始 done：进度条结束

// // 在当前模块中引入store
// import store from '@/store'

// 1：利用axios对象的方法create，去创建一个axios实例
// 2：request就是axios，只不过稍微配置一下
const requests=axios.create({
    // 配置对象
    // 基础配置，发请求的时候，路径当中会出现api,相当于自动添加
    // 请求超时的时间
    timeout:5000,
})

// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在之前做一些事情
requests.interceptors.request.use((config)=>{
    // // config：配置对象，对象中有一个属性很重要,headers请求头
    // if(store.state.detail.uuid_token){
    //     // 请求头添加一个字段userTempId，需要提前和后端确定
    //     config.headers.userTempId=store.state.detail.uuid_token
    // }
    // // 需要携带token带给服务器
    // if(store.state.register.token){
    //     config.headers.token=store.state.register.token
    // }
    nprogress.start()//进度条开始动
    return config
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数：服务器响应数据回来以后，会检测到，可以做一些事
    nprogress.done()//进度条结束
    return res.data
},(error)=>{
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'))
}) 

requests.defaults.baseURL = 'http://127.0.0.1:80'
requests.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
requests.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
// 对外暴露
export default requests