<template>
  <el-carousel :interval="4000" type="card" width="350px" height="440px">
    <el-carousel-item v-for="item in store.$state.carouselList" :key="item.id" class="swiperItem">
      <img :src="item.carouselUrl" alt="" />
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { onMounted } from "vue";
import { useCarousel } from "../../pinia/store";
const store=useCarousel()
onMounted(()=>{
  store.getCarousel()
})
</script>

<style scoped>
.swiperItem {
  width: 300px;
  height: 440px;
  border-radius: 5%;
}
.swiperItem img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>