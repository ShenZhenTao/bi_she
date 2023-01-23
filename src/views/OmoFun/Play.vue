<template>
<div>
  <div class="div-video">
    <video
        id="my-video"
        controls
        preload="auto"
        width="100%"
        :src="videoUrl"
    >
    </video>
  </div>
  <div class="div-other">
    <div class="margin-left play-title">
      <h2>{{video.title}}</h2>
    </div>
    <div class="margin-left text-align-left margin-top-20px">
      <el-tag type="success" size="medium">{{video.year}}</el-tag>
      <el-tag type="success" size="medium">{{video.area}}</el-tag>
      <el-tag type="success" size="medium">{{video.language}}</el-tag>
      <el-tag type="success" size="medium">{{video.plot}}</el-tag>
    </div>
    <div class="div-xuanji">
      <el-button   :class="list.part==lll? 'newclass':''" class="xuanji-button" v-for="(list,index) in play" :key="index"  @click="bofang(list.part)">第{{ list.part }}集</el-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Play",
  created() {
    this.jiazai()
    this.playVideo()
    this.cookie()
    // this.getDuration()
  },
  data(){
    return{
      play:{},
      video:{},
      variable:false,
      lll:this.$route.query.part,
      videoUrl:"",
    }
  },

  methods:{
    //当前视频播放位置
    getDuration(){
      // let myVid = document.getElementById("my-video");
      // console.log(myVid.duration);
    },
    cookie(){
      this.$cookies.config('30d')
    },
    playVideo() {
      this.request.get("/playVideo", {
        params: {
          id: this.$route.query.id,
          part: this.$route.query.part
        }
      }).then(res => {
        this.videoUrl=res.data[0].url
        console.log(res.data[0].url)
      })
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
        this.$cookies.set('videoId',this.$route.query.id)
        this.$cookies.set('videoName',this.video.title)
      })
      this.request.get("/play",{
        params:{
          id:this.$route.query.id
        }
      }).then(res=>{
        this.play=res.data
        this.$cookies.set('part',this.$route.query.part)
        this.$cookies.set('url',this.play.url)
      })
    },
    bianse(){
      if (play.part==this.$route.query.part){
        this.variable=true
      }else{
        this.variable=false
      }
    }
  }
}
</script>

<style scoped>

</style>
