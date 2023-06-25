<template>
  <div class="title">
    <div class="titleText">
      <span class="titleSpan">{{detailTitle.detailName}}</span>
    </div>
    <el-breadcrumb separator="" class="bread">
      <el-breadcrumb-item :to="{ path: '/' }" v-for="(item,index) in detailType" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    
  </div>
</template>

<script setup>
import {computed, defineProps} from 'vue'
// 通过props获取标题内容
const detailTitle=defineProps(['detailName','detailType'])

// 处理数据
const detailType=computed(()=>{
  return (detailTitle.detailType ||'').split('-')
})
</script>

<style scoped>
/* 介绍区域 */

 .title {
  width: 100%;
  height: 120px;
  border-bottom: 1px solid black;
  padding-top: 20px;
}

.title .titleText {
  border-left: 5px solid #dc143c;
  font-size: 25px;
  font-weight: bold;
  padding-left: 25px;
  border-radius: 5px;
}

.title .bread {
  margin-left: 35px;
  margin-top: 15px;
  font-size: 15px;
}

.title .bread .breadItem {
  text-align: center;
  border: 1px solid black;
}
</style>