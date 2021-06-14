<template>

<el-container style="height: 100vh; border: 1px solid #eeeeee">
<el-aside width="100%" height="500px" style="background-color: rgb(238, 241, 246)">
  <el-menu
      router
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <el-menu-item index="/">推荐</el-menu-item>
    <el-menu-item index="/articles/create">电影</el-menu-item>
    <el-menu-item index="/articles/list">动漫</el-menu-item>
    <el-menu-item index="/articles/search">搜索</el-menu-item>
    <el-menu-item index="/articles/test">广场</el-menu-item>
    <el-menu-item index="/articles/login">影院</el-menu-item>


<!--    <el-container>-->
<!--      <el-header style="text-align: right; font-size: 1rem;">-->
<!--        <span>王小虎</span>-->
<!--      </el-header>-->
<!--    </el-container>-->
  </el-menu>




  <el-main>
    <router-view></router-view>
  </el-main>
</el-aside>

</el-container>
</template>
<style>
html,body{
  padding:0;
  margin:0;
}


</style>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
