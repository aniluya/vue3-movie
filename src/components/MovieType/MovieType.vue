<template>
  <div class="typeContainer">
    <TypeHeader :type="route.query.type" active="1"></TypeHeader>
  </div>
  <MovieItem :typeList="Store.$state.typeList" >
    <template v-slot:newWork>
      <el-button plain class="newWorkButton" @click="toWorkStore">更多 ></el-button>
    </template>
    <template v-slot:rank>
      <div class="rankWork">
        <el-radio-group  text-color="#dc143c" fill="#dc143c" >
          <div data-index="1"><el-radio-button label="日榜" /></div>
          <el-radio-button label="周榜" data-index="2" @click="a($event.target)"/>
          <el-radio-button label="月榜" data-index="3"/>
        </el-radio-group>
      </div>
    </template>
    <template v-slot:last>
      <el-button plain class="newWorkButton">更多 ></el-button>
    </template>
  </MovieItem>
</template>

<script setup>
import TypeHeader from "../TypeHeader/TypeHeader.vue";
import MovieItem from "../MovieItem/MovieItem.vue";
import { useType,useRankType } from "../../pinia/store";
import { onMounted } from "vue";
import { useRouter,useRoute } from "vue-router";

// 总仓库
const Store = useType();
// 排行榜仓库
const rankStore=useRankType()
const router=useRouter()
const route=useRoute()

const toWorkStore=()=>{
  router.push({path:"/home/typeStore",query:{type:route.query.type,page:1}})
}

const a=(target)=>{
  rankStore.getRank("week")
}

onMounted(() => {
  Store.getTypeAll("动漫");
});
</script>

<style scoped>
.typeContainer {
  padding: 0 45px;
}

.newWorkButton {
  width: 70px;
  height: 40px;
  background-color: #ffffff;
  position: absolute;
  top: 20px;
  right: 20px;
}
.rankWork{
  position: absolute;
  top: 20px;
  right: 20px;
}

</style>