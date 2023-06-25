import Main from '../components/Main/Main'
import Detail from '../components/MovieDetail/detail'
import Play from '../components/MoviePlay/MoviePlay'
import MovieType from '../components/MovieType/MovieType'
import WorkStore from '../components/WorkStore/WorkStore'

export default [
    {
        path:'/home',
        component:Main,
    },
    {
        path:'/home/type',
        component:MovieType
    },
    {
       path:'/home/typeStore',
       component:WorkStore
    },
    {
        path:'/moviedetail',
        component:Detail
    },
    {
        path:'/movieplay',
        component:Play
    },
     //   重定向，在项目跑起来的时候，访问/立刻让其定位到首页
     {
        path:'',
        redirect:'/home'
     }
]
