<template>
  <div class="option">
    <div class="optionTitle">
      <div
        class="titleText"
        :style="props.isPlay ? 'background-color: #e7eaed;' : ''"
      >
        选集播放
      </div>
      <div
        class="titleOption"
        :style="props.isPlay ? ' border-radius: 0;' : ''"
      >
        <div
          v-for="(item, index) in 3"
          :key="index"
          class="bread"
          :class="index == activeOne? 'breadActive':''"
          @click="changeActive(index)"
        >
          高清线路{{ index + 1 }}
        </div>
      </div>
    </div>
    <div id="use1">
      <div class="allOption" v-bind="$attrs">
        <div
          v-for="(item, index) in props.detailEpisodes"
          :key="index"
          :class="[
            'optionItem',
            props.isPlay ? 'playStyle' : '',
            route.query.index === '0' + (index + 1) ? 'active' : '',
          ]"
          @click="toMoviePlay(props.onlyIndex, index)"
        >
          第{{ "0" + (index + 1) }}集
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, inject,ref } from "vue";
import { useRouter, useRoute } from "vue-router";
// 应为组件在moviePlay页面中复用了，导致两处样式不同，所有通过isPlay控制样式，moviePlay页面会传入isPlay来改变样式
const props = defineProps(["isPlay", "detailEpisodes", "onlyIndex"]);
const router = useRouter();
const route = useRoute();
const reload = inject("reload");

// 用以控制高清播放的样式
const activeOne = ref(0);

// 跳转到播放页面的方法（通过选集区域选集）
const toMoviePlay = (onlyIndex, index) => {
  router.push({
    path: "/movieplay",
    query: { onlyIndex, index: "0" + (index + 1) },
  });
  reload();
};

const changeActive = (index) => {
  activeOne.value = index;
};
</script>

<style scoped>
/* 选集区域 */
.option {
  width: 100%;
}

/* 选集标题区域 */
.option .optionTitle {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
}

.option .optionTitle .titleText {
  width: 120px;
  height: 100%;
  font-size: 20px;
  font-weight: inherit;
  text-align: center;
  line-height: 50px;
}

/* 面包屑区域 */
.option .optionTitle .titleOption {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  width: 300px;
  height: 100%;
  background-color: #e7eaed;
  border-radius: 6px 6px 0 0;
}

.titleOption .bread {
  width: 80px;
  height: 40px;
  font-size: small;
  border-radius: 5px 5px 0 0;
  text-align: center;
  line-height: 40px;
}

.titleOption .breadActive {
  color: #dc143c;
  background-color: white;
}

/* 选集内容区域 */
#use1 {
  width: 100%;
  overflow: hidden;
}

.option .allOption {
  width: 100%;
  padding: 10px 25px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid white;
  border-radius: 10px;
  background-color: white;
}

.option .playAllStyle {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
/* 详情页面的选集 */
.allOption .optionItem {
  width: 18%;
  height: 35px;
  margin: 15px 10px;
  text-align: center;
  line-height: 35px;
  border: 1px solid #f0f1f2;
  border-radius: 8px;
  cursor: pointer;
}

.allOption .optionItem:hover,
.active {
  color: #dc143c;
  background-color: rgb(255, 182, 193, 0.2);
}

/* 播放页面的选集 */
.allOption .playStyle {
  width: 80%;
}
</style>