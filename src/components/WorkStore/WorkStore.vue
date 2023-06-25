<template>
  <div class="typeContainer">
    <TypeHeader :type="route.query.type" active="2"></TypeHeader>
  </div>
  <div class="navigation">
    <typeNavigation></typeNavigation>
  </div>
  <MovieItem :typeList="store.$state.typeList" ></MovieItem>
  <sorter :sortControl="sortList" @changeSort="changeSort"></sorter>
</template>

<script setup>
import TypeHeader from '../TypeHeader/TypeHeader.vue'
import typeNavigation from './typeNavigation.vue'
import sorter from './sorter.vue'
import { useRouter,useRoute } from "vue-router";
import MovieItem from "../MovieItem/MovieItem.vue";
import { useTypeStore } from "../../pinia/store";
import { onMounted,reactive } from "vue";


const store = useTypeStore();
const router=useRouter()
const route=useRoute()

const sortList=reactive({sortNumber:1,sortSize:12,sortTotal:28,continues:5})

// 切换页面的函数
const changeSort=(page)=>{
  store.getTypeStore("动漫",page)
  sortList.sortNumber=page
  // router.replace({query: {type:"动漫", page}})
}

onMounted(() => {
  store.getTypeStore("动漫",1);
});

</script>

<style scoped>
.typeContainer {
  padding: 0 45px;
}

.navigation{
    width: 100%;
    height: 280px;
    padding: 0 45px;
    margin-bottom: 20px;
}

</style>