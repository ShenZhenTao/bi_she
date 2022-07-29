<template>
<div class="headStyle">
  <el-dropdown style="width: 100px;cursor: pointer;">
    <div style="display: inline-block">
      <img :src="url" class="avatar">
      <span>{{user.username}}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <span @click="personal">
        <el-dropdown-item >
          个人信息
        </el-dropdown-item>
      </span>
      <span @click="logout">
        <el-dropdown-item>
         退出
        </el-dropdown-item>
      </span>
    </el-dropdown-menu>
  </el-dropdown>
</div>
</template>

<script>
export default {
  name: "BackStageHeader.vue",
  title:"",
  data(){
    return{
      //三目表达式，如果游览器中存有user数据则进行赋值，否则赋值为空
      user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
      url:""
    }
  },
  created() {
    this.UserInfo()
  },
  methods:{
    logout(){
      this.$router.push("/login")
      localStorage.removeItem("user")
      this.$message.success("退出成功！")
    },
    personal(){
      this.$router.push("/personal")
    },
    UserInfo(){
      this.request.get("/backstage/userInfo",{
        params:{
          account:this.user.account
        }
      }).then(res=>{
        this.url=res.data.files.url
      })
    }

  }
}
</script>

<style scoped>
.avatar{
  width: 30px;height: 30px; border-radius:100%;position: relative;top: 10px;right: 5px
}
</style>
