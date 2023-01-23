<template>
  <div style="height: 100%">
    <el-menu :default-openeds="['1']" style="min-height: 100%"
             background-color="rgb(48,65,86)"
             text-color="#fff"
             active-text-color="#ffd04b"
             router
             @select="handleSelect"
    >
<!--        sdas-->
      <!-- line-height设置成d的高度后可以让内容垂直居中         -->
      <div style="height: 59px;line-height: 60px;text-align: center">
        <!--position: relative;top:7pxmargin-right: 5px  向下移动7像素,离右边间距为5像素-->
        <img src="../../assets/logo.png" alt="" style="width: 30px;position: relative;top:7px;margin-right: 5px">
        <b style="color: aliceblue">后台管理系统</b>
      </div>
      <el-menu-item index="/" >
        <template slot="title">
          <i class="el-icon-house"></i>
          <span slot="title">主页</span>
        </template>
      </el-menu-item>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item index="/video">
          <i class="el-icon-s-management"></i>
          <span slot="title">番剧管理</span>
        </el-menu-item>
        <el-menu-item index="/playManagement">
          <i class="el-icon-video-camera-solid"></i>
          <span slot="title">剧集管理</span>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="3" >
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item index="/permission">
          <i class="el-icon-coordinate"></i>
          <span slot="title">用户列表</span>
        </el-menu-item>
      </el-submenu>


    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data(){
    return{
      authRequired:true
    }
  },

  methods:{
    handleSelect(index){
      console.log(index)

    }
  }
}
</script>

<style scoped>

</style>
