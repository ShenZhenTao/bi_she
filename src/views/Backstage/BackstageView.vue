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

import Aside from "@/components/Backstage/Aside";
import Header from "@/components/Backstage/Header";
export default {
  name: 'HomeView',
  data:()=>({

  }),
  created() {

  },
  components: {Header, Aside},
  methods:{

  }
}
</script>


<style>

</style>
