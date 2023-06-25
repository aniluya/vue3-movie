<template>
  <div class="common-layout">
    <el-container style="display:flex; flex-direction:column;">
      <Header></Header>
      <el-container>
       <Aside></Aside>
        <el-container style="display:flex; flex-direction:column;width: 100%;">
          <router-view v-if="isRouterAlive"></router-view>
          <Footer></Footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Header from '../../components/Header/Header.vue'
import Aside from '../../components/Aside/Aside.vue'
import Footer from '../../components/Footer/Footer.vue'
import { inject } from 'vue'

const isRouterAlive=inject('isRouterAlive')

</script>

<style>

.common-layout {
  width: 100%;
}
</style>