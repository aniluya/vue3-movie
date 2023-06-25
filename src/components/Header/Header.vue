<template>
 <div style="width: 100%;height: 64px;z-index: 99;">
  <el-header class="header">
        <div class="left">
            <text class="iconfont icon-weblanmutiao_juji logo">together</text>
        </div>
        <div class="right">
            <input type="text" placeholder="寻找作品"/>
            <text class="iconfont icon-sousuo sousuo"></text>
        </div>
  </el-header>
 </div>
</template>

<script>
export default {

}
</script>

<style scoped>
/* 头部 */
 .header {
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  padding: 0;
}

 .header .left {
  width: 200px;
  height: 64px;
  line-height: 64px;
  text-align: center;
  border-right: 1px solid black;
  border-bottom-right-radius: 10px;
  opacity: 0.8;
  background-color: white;
}

.header .left .logo{
    font-size: 20px;
    color: orange;
}

.header .right {
  flex: 1;
  height: 64px;
  margin-left: 50px;
  position: relative;
  border-bottom: 1px solid gray;
}

 .header .right  input {
  width: 625px;
  height: 30px;
  border-radius: 10px;
  position: absolute;
  top: 17px;
  background-color: antiquewhite;
}

.header .right input:hover{
    background-color: white;
    opacity: 1;
}

.header .right .sousuo{
    font-size: 20px;
    font-weight: bold;
    position: absolute;
    top: 20px;
    left: 600px;
}
</style>