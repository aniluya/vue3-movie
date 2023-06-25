<template>
  <div class="navContainer">
    <div class="navItem" v-for="item in typeNavList" :key="item">
      <div class="navText">{{item.type}}: ></div>
      <div class="navOptions">
        <div :class="['option', isChecked===index?'active':'']" v-for="(option,index) in item.typeList" :key="option" @click="changeActive(index)">
          {{option.typeName}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';


// 控制导航栏的数据
const typeNavList=[{type:'剧情',typeList:[{typeName:"全部"},
{typeName:"动作"},{typeName:"喜剧"},{typeName:"爱情"},{typeName:"科幻"},
{typeName:"剧情"},{typeName:"动漫"},{typeName:"歌舞"},{typeName:"纪录"},{typeName:"其他"}]},
{type:'地区',typeList:[{typeName:"全部"},{typeName:"中国大陆"},{typeName:"中国台湾"},{typeName:"日本"}]},
{type:'语言',typeList:[{typeName:"全部"},{typeName:"国语"},{typeName:"英语"}]},
{type:'年份',typeList:[{typeName:"全部"},{typeName:"2023"},{typeName:"2022"}]},
{type:'排序',typeList:[{typeName:"全部"},{typeName:"时间排序"},{typeName:"人气排序"},{typeName:"评分排序"}]}]

const isChecked=ref(0)

const changeActive=(index)=>{
    isChecked.value=index
}

</script>

<style scoped>
.navContainer {
  width: 100%;
  height: 100%;
  border-bottom: 3px solid gainsboro;
}

.navItem {
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: flex-start;
  font-size: medium;
}

.navItem .navText {
  width: 80px;
  text-align: center;
  line-height: 56px;
  font-weight: bold;
}

.navItem .navOptions {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.navOptions .option {
  height: 30px;
  margin: 0 10px;
  padding: 0 15px;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  border: 1px solid gainsboro;
  border-radius: 5px;
  cursor: pointer;
}
/* 选择区域选中样式 */
.active {
  background-color: #ffddd5;
  color: #dc143c;
}
</style>