<template>
<div class="headStyle">
  <div class="sousuokuang">
    <el-input  style="width: 530px;height: 30px" placeholder="今天想看些什么呢？"v-model="name" @keyup.enter.native="sousuo">
        <i slot="suffix" class="el-icon-search" @click="sousuo"></i>
    </el-input>
  </div>
  <div>
    <el-dropdown class="guankanjilu" style="float: left;width: 20%">
      <i class="el-icon-time"><span>观看记录</span></i>
      <el-dropdown-menu slot="dropdown">
        <div style="height: 100px;width: 200px;margin-left: 40px">
          <el-timeline :reverse="reverse">
            <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.part">
              <span class="bianse" @click=cook>{{activity.VideoName}}</span>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</div>
</template>

<script>
export default {
  name: "Header",
  title:"",
  data(){
    return{
      name:"",
      reverse: true,
      activities: [{
        VideoName: this.$cookies.get('videoName'),
        part: "第"+this.$cookies.get('part')+"集"
      }]
    }
  },
  methods:{
    cook(){
      location="/play?id="+this.$cookies.get('videoId')+"&part="+this.$cookies.get('part')
    },
    sousuo(){
      location="/dongmanindex?activeName=dongmanku&name="+this.name
    }
  }
}
</script>

<style scoped>

</style>
