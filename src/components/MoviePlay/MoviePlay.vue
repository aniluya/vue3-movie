<template>
  <div class="playContainer">
    <div class="playAddress">
      <div class="playControl">
        <vue3VideoPlay
          :src="playStore.$state.movieUrl.oneEpisodeUrl?playStore.$state.movieUrl.oneEpisodeUrl:''"
          poster="http://127.0.0.1/static/images/%E4%B9%85%E4%BF%9D%E5%90%8C%E5%AD%A6%E4%B8%8D%E6%94%BE%E8%BF%87%E6%88%91.webp"
        />
      </div>
      <div class="movieMsg">
        <Title
          :detailName="detailStore.$state.movieDetail.detailName"
          :detailType="detailStore.$state.movieDetail.detailType"
        ></Title>
        <div class="otherOption">
          <Options
            class="playAllStyle"
            isPlay="true"
            :detailEpisodes="detailStore.$state.movieDetail.detailEpisodes"
            :onlyIndex="detailStore.$state.movieDetail.onlyIndex"
          ></Options>
        </div>
        <div class="function">
          <div class="sort">
            <text class="iconfont icon-jiazupaiming"></text>排序
          </div>
          <div class="share">
            <text class="iconfont icon-fenxianghaibao"></text>分享
          </div>
        </div>
      </div>
    </div>
    <div class="recommend">
      <MovieItem :typeList="ItemStore.$state.typeList"></MovieItem>
    </div>
  </div>
  <video
    ref="videoElement"
    src="http://127.0.0.1/static/movie/index.m3u8"
    id="videoElement"
    type="video/mp4"
    controls
    muted
    style="width: 300px; height: 300px; object-fit: fill"
  ></video>
</template>

<script setup>
import MovieItem from "../MovieItem/MovieItem.vue";
import Title from "../MovieDetail/title.vue";
import Options from "../MovieDetail/Options.vue";
import hlsjs from "hls.js";

import { onBeforeMount, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMovieDetail, useMoviePlay,useTypeItem } from "../../pinia/store";




// 获取路由进行编程式导航 router表整个路由实例 route则是当前路由
const router = useRouter();
const route = useRoute();
const detailStore = useMovieDetail();
const playStore = useMoviePlay();
const ItemStore=useTypeItem()

const videoUrl =
  // "http://127.0.0.1/static/movie/久保同学不放过我/久保同学不放过我 第02话.mp4";
  "http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8";
// 生命周期钩子

onBeforeMount(()=>{
  detailStore.getMovieDetail(route.query.onlyIndex);
  playStore.getMoviePlay(route.query.onlyIndex, route.query.index);
  ItemStore.getTypeItem()
})

onMounted(() => {
  console.log('挂载了')
  const video = document.getElementById("videoElement"); //定义挂载点
  if (hlsjs.isSupported()) {
    let hls = new hlsjs();
    hls.loadSource(
      "http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8"
    ); //设置播放路径
    hls.attachMedia(video); //解析到video标签上
    hls.on(hlsjs.Events.MANIFEST_PARSED, () => {
      video.play();
      console.log("加载成功");
    });
    hls.on(hlsjs.Events.ERROR, (event, data) => {
      // 监听出错事件
      console.log("加载失败");
    });
  } else {
    console.log("不支持的格式");
    return;
  }
});

onUnmounted(()=>{
  console.log('卸载了')
})

</script>

<style scoped>
.playContainer {
  width: 100%;
  padding: 0 20px;
  overflow: hidden;
}

/* 控制区域 */
.playContainer .playAddress {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 450px;
}

/* 播放器 */
.playAddress .playControl {
  width: 880px;
  height: 100%;
}

/* 视频信息 */
.playAddress .movieMsg {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #e7eaed;
}

.movieMsg .otherOption {
  width: 100%;
  flex: 1;
  margin-top: 30px;
  background-color: white;
  overflow: auto;
}

/* 功能区域 */
.movieMsg .function {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fafafa;
}

.function div {
  width: 30%;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border-right: 2px solid white;
  display: flex;
  justify-content: space-evenly;
}
</style>