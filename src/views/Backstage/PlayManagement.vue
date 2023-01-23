<template>
  <div>
    <div style="padding: 10px 0;text-align: left">
      <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="title"></el-input>
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



    <el-table :data="tableData"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column :disabled="true" prop="playId" label="ID" width="80"></el-table-column>
      <el-table-column prop="title" label="番剧名" width="200"></el-table-column>
      <el-table-column prop="part" label="剧集" width="120"></el-table-column>
      <el-table-column prop="url" label="链接" ></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit-outline"></i></el-button>
          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定删除吗？"
              @confirm="del(scope.row.playId)"
          >
            <el-button type="danger" slot="reference" style="margin-left: 10px">删除<i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>



    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog title="剧集信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item  label="番剧ID">
          <el-input  v-model="form.videoId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="番剧名称">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  label="剧集ID">
          <el-input :disabled="true" v-model="form.playId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="剧集">
          <el-input v-model="form.part" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="视频链接">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PlayManagement",
  data(){
    return{
      tableData:[
      ],
      pageNum:1,
      pageSize:5,
      title:"",
      part:"",
      nickname:"",
      form:{},
      dialogFormVisible:false,
      multipleSelection:[],
      total:0,
    }
  },
  created() {
    //  请求分页查询数据
    this.load()

  },

  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    },
    download(){
      // window.open("http://localhost:9091/backstage/test/downloadVideo")
      axios({
        method: "get",
        url: "http://localhost:9091/backstage/test/downloadPlay",
        responseType: "arraybuffer"
      }).then(response => {
        //通过header中获取返回的文件名称
        let fileName = "导出文件"
        let blob = new Blob([response.data], { type: "application/vnd.ms-excel" })
        let downloadElement = document.createElement("a")
        var href = window.URL.createObjectURL(blob)
        downloadElement.href = href
        //指定下载的文件的名称，切记进行decode
        downloadElement.download = decodeURI(fileName)
        document.body.appendChild(downloadElement)
        downloadElement.click()
        //移除临时创建对象，释放资源
        document.body.removeChild(downloadElement)
        window.URL.revokeObjectURL(href)
      });
    },
    //  请求分页查询数据
    load() {
      this.request.get("/backstage/backstage/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          title: this.title,
          part: this.part
        }
      }).then(res => {
        this.tableData = res.data
        // this.total = res.total
      })
      this.request.get("/backstage/backstage/count", {
        params: {
          title: this.title,
          part: this.part
        }
      }).then(res => {
        this.total = res.data
      })
    },
    reset() {
      this.title = ""
      this.plot = ""
      this.area = ""
      this.load()
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
    },
    update(){
      this.request.post("/backstage/updatePlay", this.form).then(res => {
        if (res) {
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    save() {
      console.log(this.form)
      this.request.post("/backstage/savePlay", this.form).then(res => {
        if (res) {
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    handleEdit(row) {
      this.form = row
      this.dialogFormVisible = true
    },
    del(id) {
      this.request.delete("/backstage/delPlay/" + id).then(res => {
        if (res) {
          this.$message.success("删除成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delBatch() {
      let ids = this.multipleSelection.map(v => v.playId)//把一个纯对象数组变成一个存id数组
      console.log(ids)
      this.request.post("/backstage/delPlay/batch", ids).then(res => {
        if (res) {
          this.$message.success("批量删除成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("批量删除失败")
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
