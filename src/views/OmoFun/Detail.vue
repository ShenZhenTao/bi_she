<template>
  <div>
    <div align="left" class="margin-left ">
      <h1 class="detail-h1">{{video.title}}</h1>
      <div class="detail-title-maring">
        <el-tag type="success" size="medium">{{video.year}}</el-tag>
        <el-tag type="success" size="medium">{{video.area}}</el-tag>
        <el-tag type="success" size="medium">{{video.language}}</el-tag>
        <el-tag type="success" size="medium">{{video.plot}}</el-tag>
      </div>
      <div class="div1">
        <div class="detail">
          <div style="width: 80%;float: left" >
            <div class="detail-title-maring margin-left">
              <p class="title">{{video.introduction}}</p>
              <hr class="hr1" style="width: 1200px">
            </div>
            <div class="margin-left margin-bottom">
              <h4 style="display: inline">导演：</h4><font size="3px">{{video.director}}</font>
            </div>
            <div class="margin-left margin-bottom">
              <h4 style="display: inline">主演：</h4>{{video.actors}}
            </div>
            <div class="margin-left">
              <el-button round size="150px" class="bofang" @click="toplay"><i class="el-icon-caret-right"></i>播放</el-button>
            </div>
          </div>
          <div>
            <img class="detail-image" :src=video.imageUrl>
          </div>
        </div>
        <div class="dibuyuanjiao ">
        </div>
      </div>
      <div class="margin-top">
        <h1 class="detail-h2 ">选集播放</h1>
      </div>
    </div>
    <div class="xuanjibofang">
      <el-button  class="jishuanniu" v-for="(list,index) in play" :key="index" @click="bofang(list.part)">第{{ list.part }}集</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  created() {
    this.jiazai()
  },
  data(){
    return{
      play:{},
      video:{},
    }
  },
  methods:{
    toplay(){
      location="/play?id="+this.$route.query.id+"&part="+this.play[0].part
    },
    bofang(part){
      location="/play?id="+this.$route.query.id+"&part="+part
    },
    jiazai(){
      this.request.get("/detail",{
        params:{
          id:this.$route.query.id
        }
      }).then(res=>{
        this.video=res.data
      })
      this.request.get("/play",{
        params:{
          id:this.$route.query.id
        }
      }).then(res=>{
        console.log(res)
        this.play=res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
