export default [
    {
        path:'/home',
        component:()=>import('../components/Main/Main'),
    },
    {
        path:'/home/type',
        component:()=>import('../components/MovieType/MovieType')
    },
    {
       path:'/home/typeStore',
       component:()=>import('../components/WorkStore/WorkStore')
    },
    {
        path:'/moviedetail',
        component:()=>import('../components/MovieDetail/detail')
    },
    {
        path:'/movieplay',
        component:()=>import('../components/MoviePlay/MoviePlay')
    },
     //   重定向，在项目跑起来的时候，访问/立刻让其定位到首页
     {
        path:'',
        redirect:'/home'
     }
]
