<template>
  <div class="detailContainer">
    <div class="introduce">
      <Title :detailName="store.$state.movieDetail.detailName" :detailType="store.$state.movieDetail.detailType"></Title>
      <div class="textContainer">
        <div class="text">
          <div class="story">
            <div class="storyText">
              {{store.$state.movieDetail.detailText}}
            </div>
          </div>
          <div class="other">
            <div class="otherTitle" v-for="(item,index) in detailMsg" :key="index">{{item}}</div>
            
          </div>
        </div>
      </div>
      <div class="faceImg" @click="toMoviePlay">
        <img :src="store.$state.movieDetail.imgUrl" alt="" />
      </div>
      <el-button type="success" round class="button" @click="toDefaultEpisode">立即播放</el-button>
    </div>
    <Options :detailEpisodes="store.$state.movieDetail.detailEpisodes" :onlyIndex="store.$state.movieDetail.onlyIndex"></Options>
    <div class="recommend">
      <MovieItem :typeList="recommendStore.$state.recommendList"></MovieItem>
    </div>
  </div>
</template>

<script setup>
import MovieItem from '../MovieItem/MovieItem.vue'
import Options from './Options.vue'
import Title from './title.vue'

import { computed, getCurrentInstance, onMounted,onUpdated } from "vue";
import { useRouter, useRoute } from "vue-router";
import {useMovieDetail,useDetailRecommend} from '../../pinia/store'

const detailMsg=computed(()=>{
  return (store.$state.movieDetail.detailMsg || '').split('-')
})

// 获取this
const that = getCurrentInstance();
// 获取路由进行编程式导航 router表整个路由实例 route则是当前路由
const router = useRouter();
const route = useRoute();
// 视频详情仓库
const store=useMovieDetail()
// 视频推荐栏仓库
const recommendStore=useDetailRecommend()

const typeList= computed(()=>{
  return recommendStore.$state.recommendList ||[]
})

// 生命周期钩子
onUpdated(() => {
  // store.getMovieDetail(route.query.onlyIndex)
})
// 调用仓库方法获取数据
onMounted(()=>{
  
  store.getMovieDetail(route.query.onlyIndex)
// 相关推荐
  recommendStore.getDetailRecommend(route.query.onlyIndex)
  
})

// 跳转到播放页面的方法（通过立即播放按钮，默认第01集）
const toDefaultEpisode=()=>{
  router.push({
    path: "/movieplay",
    query: { onlyIndex:route.query.onlyIndex, index: "0" +1 },
  });
}

</script>

<style scoped>
.detailContainer {
  width: 100%;
  padding-right: 25px;
}

.introduce {
  width: 100%;
  padding-bottom: 40px;
  position: relative;
}

/* 详细文本区域 */

.detailContainer .textContainer{
  width: 100%;
  height: 280px;
  border: 1px solid #f7f8f9;;
  border-radius: 20px;
  background-color: white;
}
.detailContainer .text {
  width: 950px;
  height: 280px;
  padding-left: 25px;
  font-size: 16px;
}

.text .story {
  width: 100%;
  height: 70px;
  padding: 10px 0;
  border-bottom: 1px solid black;
}

.text .story .storyText {
  display: -webkit-box;
  /* autoprefixer: off */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-indent: 30px;
}

/* 文本三内容区域 */
.text .other {
  width: 100%;
  height: 180px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.text .other .otherTitle {
  margin-left: 15px;
  font-size: 16px;
  font-weight: bold;
}

.text .other .otherText {
  margin-left: 10px;
  font-weight: normal;
}

/* 封面图区域 */
.introduce .faceImg img{
  width: 200px;
  height: 280px;
  position: absolute;
  top: 20px;
  right: 30px;
  border-radius: 5%;
  background-color: rgb(176, 41, 106);
  object-fit:fill;
}


/* 立即播放按钮 */
.introduce .button {
  width: 120px;
  position: absolute;
  left: 50px;
  bottom: 25px;
}


</style>