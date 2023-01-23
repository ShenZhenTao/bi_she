<template>
<div>
  <div style="padding: 10px 0;text-align: left">
    <el-input style="width: 200px" placeholder="请输入用户姓名" suffix-icon="el-icon-search" v-model="title"></el-input>
    <el-input style="width: 200px;margin-left: 5px" placeholder="请输入剧集" suffix-icon="el-icon-lollipop" v-model="part"></el-input>
    <el-button style="margin-left: 5px" type="primary" @click="load">搜索</el-button>
    <el-button type="warning" @click="reset">重置</el-button>
  </div>
  <div style="margin: 10px 0;text-align: left">

    <el-popconfirm
        confirm-button-text='确定'
        cancel-button-text='我再想想'
        icon="el-icon-info"
        icon-color="red"
        title="您确定批量删除这些数据吗？"
        @confirm="delBatch"
        style="margin-left: 10px;margin-right: 10px"
    >
      <el-button style="left: -10px" slot="reference" type="danger">批量删除<i style="margin-left: 10px" class="el-icon-remove-outline"></i></el-button>
    </el-popconfirm>
    <el-button type="primary">导入<i style="margin-left: 10px" class="el-icon-download"></i></el-button>
    <el-button type="primary" @click="download">导出<i style="margin-left: 10px" class="el-icon-upload2"></i></el-button>
  </div>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="id"
          label="序号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="userName"
          label="用户名字"
          width="180">
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别">
      </el-table-column>
      <el-table-column
          prop="age"
          label="年龄">
      </el-table-column>
      <el-table-column
          prop="status"
          label="用户状态">
        <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别">
      </el-table-column>
      <el-table-column
          prop="address"
          label="居住地">
      </el-table-column>
      <el-table-column
          prop="contactAddress"
          label="联系电话">
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="创建时间">
      </el-table-column>
      <el-table-column
          prop="caozuo"
          label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
export default {
  name: "Permission",
  data(){
    return{
        userList:{
          userName:"",
          sex:"",
          age:"",
          createTime:"",
          status:"",
          address:"",
          contactAddress:""
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods:{
    getUserList() {
      this.request.get("/backstage/userInfo",{
        params:{
          account:this.user.account
        }
      }).then(res=>{
        this.userInfo=res.data
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
