<template>
  <Home></Home>
</template>

<script setup>
import Home from './pages/Home/Home.vue'
import { nextTick,provide,ref } from 'vue'
console.log(window.innerWidth)

const isRouterAlive=ref(true)

// 用以解决MoviePlay页面切换集数，同页面跳转到同页面，参数不一致，页面不刷新的问题。
// 使用v-if配合变量isRouterAlive控制组件进行卸载并重新挂载达到刷新的功能，父组件对子组件provide提供修改 isRouterAlive的方法
function reload(){
  isRouterAlive.value=false
  nextTick(()=>{
    isRouterAlive.value=true
  })
}

provide('isRouterAlive',isRouterAlive)
provide('reload',reload)

</script>

<style scoped>

</style>
