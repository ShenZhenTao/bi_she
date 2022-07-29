<template>
  <div>
  <el-container style="min-height: 100vh">
    <el-aside width="200px">
      <Aside/>
    </el-aside>
    <el-container>
      <el-header >
        <Header/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>


<script>

import Aside from "@/components/OmoFun/Aside";
import Header from "@/components/OmoFun/Header";
export default {
  name: 'HomeView',
  created() {
    console.log(this.$cookies.get('videoName'))
    console.log(this.$cookies.get('part'))
    console.log(this.$cookies.get('videoName'))
  },
  components: {Header, Aside},
  methods:{

  }
}
</script>


<style>

</style>
