<template>
<div>
  <!--  这是个人信息界面-->
  <div class="div-left">
<!--      <img :src="userInfo.files.url" class="avatar" @click="">-->
    <el-upload
        class="avatar-uploader"
        action="http://localhost:9091/file/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
      <img v-if=userInfo.files.url :src=userInfo.files.url class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <el-button @click="addVisible=true" size="medium" class="left-button" type="primary" >修改个人信息</el-button>

    <el-dialog title="用户信息" :visible.sync="addVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userInfo.telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="居住地">
          <el-input v-model="userInfo.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="userInfo.contactAddress" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </div>
    </el-dialog>

  </div>
  <div class="div-right">
    <el-descriptions class="margin-top" title="个人信息" :column="3" size="medium" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        {{userInfo.username}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        {{userInfo.telephone}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          居住地
        </template>
        {{userInfo.address}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          管理员权限
        </template>
        <el-tag size="small">{{userInfo.status}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          联系地址
        </template>
        {{userInfo.contactAddress}}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</div>
</template>

<script>
export default {
  name: "Personal",
  data() {
    return {
      //三目表达式，如果游览器中存有user数据则进行赋值，否则赋值为空
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      userInfo:{
        files:{
          url:""
        }
      },
      addVisible:false,
    }
  },
  created() {
    this.UserInfo()
  },
  methods:{
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    UserInfo(){
      this.request.get("/backstage/userInfo",{
        params:{
          account:this.user.account
        }
      }).then(res=>{
        this.userInfo=res.data
        console.log(res)
      })
    },
    saveUser(){
      this.request.post("/backstage/updateUser",this.userInfo).then(res =>{
        console.log(this.userInfo)
        if (res){
          this.$message.success(res.msg)
          this.addVisible=false
        }else{
          this.$message.error(res.msg)
        }
      })
    },

    // handleEdit(row){
    //   this.form=row
    //   this.dialogFormVisible=true
    // },
  }
}
</script>

<style scoped>
.avatar{
  width: 300px;
  height: 300px;
  border-radius:100%;
  position: relative;
  top: 10px;
  right: 5px;
  z-index:1;
}
.avatar-cover:hover{
  position: absolute;
  /*top: 0;*/
  /*left: 0;*/
  width: 300px;
  height: 300px;
  background: rgba(0,0,0,.6);
  font-size: 12px;
  color: #fff;
  line-height: 60px;
  text-align: center;
  opacity: 0;
  border-radius: 50%;
  transition: opacity .2s;
  z-index: 2;
}
.div-left{
  float: left;
  width: 23%
}
.div-right{
  float: left;width:77%
}
.left-button{
  margin-top: 40px
}

</style>