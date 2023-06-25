<template>
  <div class="">
    <div class="headerContainer">
     <div :class="['index', active==1?'active':'']" @click="toMovieType">{{type}}首页</div>
     <div :class="['store',active==2?'active':'']" @click="toWorkStore">{{type}}库</div>
  </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineProps } from "vue";
const router=useRouter()
const props=defineProps(['type','active'])
const {type,active}=props

// 动态添加切换选择的是首页还是库的样式


const toMovieType=()=>{
  router.push({path:"/home/type",query:{type}})
}

const toWorkStore=()=>{
  router.push({path:"/home/typeStore",query:{type}})
}
</script>

<style scoped>
.headerContainer{
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-size: 25px;
  color:#a0a0a0;
  border-bottom: 2px solid gainsboro;
}
/* 首页区域 */
.headerContainer .index{
  width: 120px;
  height: 90%;
  text-align: center;
  line-height:72px;
  cursor: pointer;
}
/* 库区域 */
.headerContainer .store{
  width: 120px;
  height: 90%;
  text-align: center;
  line-height:72px;
  cursor: pointer;
}

.headerContainer .active{
  color: black;
  border-bottom:3.5px solid #dc143c;
  border-radius: 3px;
}

</style>