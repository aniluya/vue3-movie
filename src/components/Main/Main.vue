<template>
  <el-main class="main">
    <Swiper></Swiper>
    <MovieItem :typeList="store.$state.typeList"></MovieItem>
  </el-main>
</template>

<script setup>
import Swiper from '../../components/Swiper/Swiper.vue'
import MovieItem from '../../components/MovieItem/MovieItem.vue'
import {useTypeItem} from '../../pinia/store'
import { onMounted} from "vue";


const store=useTypeItem()


onMounted(()=>{
  store.getTypeItem()
})
</script>

<style>
.main{
    width: 100%;
    margin-top: 18px;
    overflow-y: hidden;
}
</style>