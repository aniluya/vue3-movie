<template>
  <section class="sorterContainer" @click="getSort($event)">
    <div class="first">首页</div>
    <div class="last">上一页</div>
    <div :class="['sort',active=='1'?'active':'']" data-active="1">{{ start }}</div>
    <div :class="['sort',active=='2'?'active':'']" data-active="2">{{ start + 1 }}</div>
    <div :class="['sort',active=='3'?'active':'']" data-active="3">{{ sortNumber >= 3 ? sortNumber : 3 }}</div>
    <div :class="['sort',active=='4'?'active':'']" data-active="4">{{ end - 1 }}</div>
    <div :class="['sort',active=='5'?'active':'']" data-active="5">{{ end }}</div>
    <div class="next">下一页</div>
    <div class="end">尾页</div>
  </section>
</template>

<script setup>
import { computed, defineProps, defineEmits, watch, ref } from "vue";

const a = defineProps(["sortControl"]);
const emit = defineEmits(["changeSort"]);
// 控制显示的页码数
let sortNumber=ref(1)
let {sortSize,sortTotal,continues}=a.sortControl

let active=ref(1)

watch(a.sortControl,(newvalue)=>{
    sortNumber.value=newvalue.sortNumber
},{immediate:true})

const start = computed(() => {
  let start = sortNumber.value - parseInt(continues / 2);
  if (start <= 0) start = 1;
  return start;
});

const end = computed(() => {
  let end = sortNumber.value + parseInt(continues / 2);
  if (end < continues) end = continues;
  return end;
});

// 切换页码
const getSort = (event) => {
  // 触发自定义事件，将页码提交给父组件WorkStore，刷新数据
  const target = event.target;
  if (target.nodeName.toLowerCase() === "div") {
    switch (target.innerText) {
      case "首页": {
        emit("changeSort", 1);
        sortNumber.value = 1;
        break;
      }
      case "上一页": {
        if(sortNumber.value>1){
          emit("changeSort", sortNumber.value-1);
          sortNumber.value -= 1;
          active.value -= sortNumber;
        }else{
          emit("changeSort", 1);
          sortNumber.value = 1;
        }
        break;
      }
      case "下一页": {
        if(sortNumber.value<Math.ceil(sortTotal/sortSize)){
          emit("changeSort", sortNumber.value+1);
          sortNumber.value += 1;
        }else{
          emit("changeSort", Math.ceil(sortTotal/sortSize));
          sortNumber.value =Math.ceil(sortTotal/sortSize);
        }
        break;
      }
      case "尾页": {
        emit("changeSort", Math.ceil(sortTotal/sortSize));
        sortNumber.value = Math.ceil(sortTotal/sortSize);
        break;
      }
      default : {
        emit("changeSort", target.innerText*1);
      }
    }
    
  }
  active.value=target.dataset.active
};
</script>

<style scoped>
.sorterContainer {
  width: 720px;
  height: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 14px;
}
/* 首页 尾页 */
.first,
.end {
  width: 55px;
  height: 28px;
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  line-height: 28px;
  border: 1px solid gainsboro;
}
/* 上一页 下一页 */
.last,
.next {
  width: 75px;
  height: 28px;
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  line-height: 28px;
  border: 1px solid gainsboro;
}
/* 五个页码块 */
.sort {
  width: 45px;
  height: 28px;
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  line-height: 28px;
  border: 1px solid gainsboro;
}

/* 按钮激活样式 */
.active{
  color: #fff;
  font-weight: bold;
  background-color:  #dc143c;
}

.first:hover,
.end:hover,
.last:hover,
.next:hover,
.sort:hover {
  color: #dc143c;
}
</style>