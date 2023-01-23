<template>
  <div>
    <div style="padding: 10px 0;text-align: left">
      <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="title"></el-input>
      <el-input style="width: 200px;margin-left: 5px" placeholder="请输入类型" suffix-icon="el-icon-lollipop" v-model="plot"></el-input>
      <el-input style="width: 200px;margin-left: 5px" placeholder="请输入地区" suffix-icon="el-icon-position" v-model="area"></el-input>
      <el-button style="margin-left: 5px" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>

    <div style="margin: 10px 0;text-align: left">
      <el-button type="primary" @click="handleAdd">新增<i style="margin-left: 10px" class="el-icon-circle-plus-outline"></i></el-button>

      <el-popconfirm
          confirm-button-text='确定'
          cancel-button-text='我再想想'
          icon="el-icon-info"
          icon-color="red"
          title="您确定批量删除这些数据吗？"
          @confirm="delBatch"
          style="margin-left: 10px;margin-right: 10px"
      >
        <el-button slot="reference" type="danger">批量删除<i style="margin-left: 10px" class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>

      <el-button type="primary" @click="upload">导入<i style="margin-left: 10px" class="el-icon-download"></i></el-button>
      <el-button type="primary" @click="download">导出<i style="margin-left: 10px" class="el-icon-upload2"></i></el-button>
    </div>



    <el-table :data="tableData"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="videoId" label="ID" width="80"></el-table-column>
      <el-table-column prop="title" label="番剧名" width="140"></el-table-column>
      <el-table-column prop="popularity" label="热度"></el-table-column>
      <el-table-column prop="director" label="导演" ></el-table-column>
      <el-table-column prop="actors" label="主演"></el-table-column>
      <el-table-column prop="area" label="地区"></el-table-column>
      <el-table-column prop="plot" label="类型" ></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit-outline"></i></el-button>
          <el-button type="info" @click="handleEdit2(scope.row)">添加剧集<i class="el-icon-circle-plus-outline"></i></el-button>
          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定删除吗？"
              @confirm="del(scope.row.videoId)"
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

    <el-dialog title="番剧信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="番剧名称">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="form.introduction" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="导演">
          <el-input v-model="form.director" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片地址">
          <el-input v-model="form.imageUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="主演">
          <el-input v-model="form.actors" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="热度">
          <el-input v-model="form.popularity" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地区">
          <el-input v-model="form.area" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="语言">
          <el-input v-model="form.language" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年份">
          <el-input v-model="form.year" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="form.plot" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加剧集" :visible.sync="addVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="番剧ID">
          <el-input :disabled="true" v-model="play.videoId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="番剧名称">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="番剧集数">
          <el-input v-model="play.part" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单集地址">
          <el-input v-model="play.url" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePlay">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "VideoManagement",
  data(){
    return{
      tableData:[
      ],
      pageNum:1,
      pageSize:5,
      videoId:"",
      title:"",
      plot:"",
      area:"",
      nickname:"",
      form:{},
      play:{},
      dialogFormVisible:false,
      addVisible:false,
      multipleSelection:[],
      total:0,
      //查询条件
      condition:{
        title:"",
        plot:"",
        area:""
      }
    }
  },
  created() {
    //  请求分页查询数据
    this.load()

  },

  methods:{
    //导入数据
    upload(){

    },
    download(){
      // window.open("http://localhost:9091/backstage/test/downloadVideo")
        axios({
          method: "get",
          url: "http://localhost:9091/backstage/test/downloadVideo",
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



    handleSizeChange(pageSize){
      this.pageSize=pageSizes
      this.load()
    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      this.load()
    },
    //  请求分页查询数据
    load(){
      this.request.get("/backstage/dongmanindex/page",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          title:this.title,
          plot:this.plot,
          area:this.area
        }
      }).then(res=>{
        this.tableData=res.data.records
        this.total=res.data.total
      })
    },
    reset(){
      this.title=""
      this.plot=""
      this.area=""
      this.load()
    },
    handleAdd(){
      this.dialogFormVisible=true
      this.form={}
    },
    save(){
      this.request.post("/backstage/save",this.form).then(res =>{
        if (res){
          this.$message.success("保存成功")
          this.dialogFormVisible=false

          this.load()
        }else{
          this.$message.error("保存失败")
        }
      })
    },
    savePlay(){
      this.request.post("/backstage/savePlay",this.play).then(res =>{
        if (res){
          this.$message.success("保存成功")
          this.addVisible=false
          this.load()
        }else{
          this.$message.error("保存失败")
        }
      })
    },
    handleEdit(row){
      this.form=row
      this.dialogFormVisible=true
    },
    handleEdit2(row){
      this.form=row
      this.play.videoId=row.videoId
      this.addVisible=true
    },

    del(id){this.request.delete("/backstage/del/"+id).then(res=>{
      if (res){
        this.$message.success("删除成功")
        this.dialogFormVisible=false
        this.load()
      }else{
        this.$message.error("删除失败")
      }
    })},
    handleSelectionChange(val){
      this.multipleSelection=val
    },
    delBatch(){
      let ids=this.multipleSelection.map(v => v.videoId)//把一个纯对象数组变成一个存id数组
      this.request.post("/backstage/del/batch",ids).then(res=>{
        if (res){
          this.$message.success("批量删除成功")
          this.dialogFormVisible=false
          this.load()
        }else{
          this.$message.error("批量删除失败")
        }
      })

    }
  }
}
</script>

<style scoped>

</style>
