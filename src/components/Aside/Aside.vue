<template>
  <div style="width: 200px; margin-right: 30px" @click="changeVideoType($event)">
    <el-aside class="aside">
      <div
        :class="['asideIndex',activeNavigation==1?'active':'']"
        data-nav="1"
      >
        <text class="iconfont icon-jifenshangcheng navIcon"></text>
        <text class="navText">首页</text>
      </div>
      <div :class="['asideItem',activeNavigation==2?'active':'']" data-nav="2">
        <text class="iconfont icon-dianying itemIcon"></text>
        <text class="itemText">电影</text>
      </div>
      <div :class="['asideItem',activeNavigation==3?'active':'']" data-nav="3" >
        <text class="iconfont icon-dongman itemIcon"></text>
        <text class="itemText">动漫</text>
      </div>
      <div :class="['asideItem',activeNavigation==4?'active':'']" data-nav="4" >
        <text class="iconfont icon-shoucang itemIcon"></text>
        <text class="itemText">收藏</text>
      </div>
      <div :class="['asideItem',activeNavigation==5?'active':'']" data-nav="5" >
        <text class="iconfont icon-bangdan itemIcon"></text>
        <text class="itemText">热榜</text>
      </div>
    </el-aside>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRoute,useRouter} from 'vue-router'

let activeNavigation = ref(1);

const router=useRouter()
const route=useRoute()

const changeVideoType = (event) => {
  let target=event.target
  if(target.nodeName.toLowerCase()==='div'){
    activeNavigation.value = target.dataset.nav;
    if(target.lastChild.innerText!='首页'){
      router.push({path:'/home/type',query:{type:target.lastChild.innerText}})
    }else{
      router.push({path:'/home'})
    }
  }
};
</script>

<style scoped>
/* 左边 */
.aside {
  width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  border: 1px solid #f7f8f9;
  border-radius: 5%;
  position: fixed;
}

.aside .asideIndex {
  width: 100%;
  height: 60px;
  padding-left: 25px;
  line-height: 50px;
  margin: 10px 0;
  transform: all 2s linear;
}

.aside .asideIndex .navIcon {
  font-size: 20px;
  font-weight: bold;
}

.aside .asideIndex .navText {
  margin-left: 15px;
}

.aside .asideItem {
  width: 100%;
  height: 50px;
  padding-left: 35px;
  line-height: 50px;
  margin: 10px 0;
  transform: all 2s linear;
  font-size: 15px;
}

/* 选中后的样式 */
.aside .asideItem:hover,
.active {
  font-weight: bold;
  color: red;
  background-color:#f7f8f9;
  cursor: pointer;
}

.aside .asideItem .itemText {
  margin-left: 20px;
}
</style>