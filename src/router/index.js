import routes from './router'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
    scrollBehavior(to, from, savedPosition) {
        // 返回的这个y=0,代表滚动条在最上方
        return { top: 0 }
    }
})


export default router

