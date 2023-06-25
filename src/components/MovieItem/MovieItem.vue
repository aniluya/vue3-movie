<template>
    <div class="movieContainer" v-for="(item,index) in typeList.typeList" :key="index">
    <div class="title" v-if="item.typeList.length">
      <span class="movieSpan">{{item.typeEnglish||''}}</span>
      <text class="titleText">{{item.typeName||''}}</text>
      <slot :name="arr[index]"></slot>
    </div>
    <div class="movie">
      <div class="middleMovie">
        <div class="movieItem" v-for="(one,index) in item.typeList" :key="index" @click="toMovieDetail(one.onlyIndex)">
          <img :src="one.imgUrl" alt="" />
          <div class="movieText"><text>{{one.imgText}}</text></div>
        </div>
      </div>
    </div>
  </div> 
   
</template>

<script setup>
import { defineProps, onMounted} from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const typeList=defineProps(["typeList"])
const arr=['newWork','rank','last']
const toMovieDetail=(onlyIndex)=>{
  router.push({ path: "/moviedetail", query: { onlyIndex} });
};

onMounted(()=>{
  console.log(typeList)
})

</script>

<style scoped>
/* 导航栏 */
.movieContainer .title {
  height: 50px;
  font-size: 20px;
  position: relative;
}

.movieContainer .title .titleText {
  position: absolute;
  top: 25px;
  font-weight: bold;
  opacity: 0.6;
}

.movieContainer .title .movieSpan {
  position: absolute;
  top: 20px;
  font-size: 25px;
  background-image: -webkit-linear-gradient(bottom, red, #fd8403, yellow);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.movieContainer .movie {
  padding: 10px 10px;
}

.movie .middleMovie {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap:wrap ;
}

.movie .middleMovie .movieItem {
  width: 15%;
  height: 260px;
  display: inline-block;
  margin: 10px 10px;
  
}

.movie .middleMovie .movieItem:hover {
  color: #dc143c;
  scale: 1.05;
  transition: all 0.3s linear;
}

.movie .middleMovie img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 5%;
  overflow: hidden;
}

.movie .middleMovie .movieText {
  width: 100%;
  height: 20px;
  text-align: center;
}
</style>