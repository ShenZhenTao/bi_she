<template>
<div class="backgroup" >
  <div class="login">
    <div class="title1">
      <b>后台登录</b>
    </div>
    <el-form :model="user" ref="user" label-width="0px" class="demo-ruleForm">
      <el-form-item
          prop="account"
          :rules="[{ required: true, message: '账号不能为空'}]"
      >
        <el-input  @keyup.enter.native="login" type="username" prefix-icon="el-icon-user" v-model.number="user.account" autocomplete="off" class="input"></el-input>
      </el-form-item>

      <el-form-item
          prop="password"
          :rules="[{ required: true, message: '密码不能为空'}]"
      >
        <el-input  @keyup.enter.native="login" type="password" prefix-icon="el-icon-lock" v-model.number="user.password" autocomplete="off" class="input"></el-input>
      </el-form-item>

    <div style="margin: 10px 0;text-align: right">
      <el-button type="primary" size="small" autocomplete="off" @click="login">登录</el-button>
      <el-button type="primary" size="small" autocomplete="off">注册</el-button>
    </div>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      user:{
        account:"",
        password:""
      },
      token:""
    }
  },
  methods:{
    login(){
      this.request.post("/backstage/login",this.user).then(res=>{
        console.log(res)
        if (this.user.account==="" || this.user.password===""){
          this.$message.error("请输入账号和密码！")
        }else if(res.code==="200"){
          localStorage.setItem("user",JSON.stringify(res.data))
          this.$router.push("/Backstage")
          this.$message.success(res.msg)
        }else{
          this.$message.error(res.msg)
        }
      })

    }
  }
}
</script>

<style>
.input{
  margin: 10px 0
}
.title1{
  margin: 20px 0;
  text-align: center;
  font-size: 24px
}
.login{

  margin: 200px auto;
  background-color: #FFFFFF;
  width: 350px;
  height: 300px;
  padding: 20px;
  border-radius: 20px
}
height-30px{
  height: 30px;
}
.backgroup{
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to bottom right,#5ecc9a,orange);
  overflow: hidden;
}
body,html{
  height: 100%;
}

</style>
