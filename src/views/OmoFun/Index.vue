<template>
<div>
  <div class="pmd-h-w">
    <el-carousel indicator-position="outside" class="lbt-h-w" height="450px">
      <el-carousel-item v-for="(item,index) in reying" :key="index">
        <a>
          <el-image class="img" :src=item.imageUrl></el-image>
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="zhengzaireying">
    <div class="reying">正在热映</div>
    <div style="display: flex">
        <router-link class="bianse" v-for="(list,index) in reying":key="index" :to="'/detail?id=' + list.videoId">
          <div>
            <img class="reying-img" :src=list.imageUrl>
          </div>
          <div  style="width: 200px">{{list.title}}</div>
        </router-link>
    </div>
  </div>
  <div class="zhengzaireying">
    <div class="reying">
      <a class=" bianse">
        国漫区
      </a>
      <el-button class="gengduo" type="primary" @click="guoman">更多</el-button>
    </div>


    <div class="flex-wrap">
        <router-link class="bianse" v-for="(list,index) in guomans":key="index" :to="'/detail?id=' + list.videoId">
          <img class="guoman-img" :src=list.imageUrl>
        <div class="bianse" style="width: 190px">{{list.title}}</div>
        </router-link>
    </div>

    <div class="reying">
      <a class="bianse">
        日漫区
      </a>
      <el-button class="gengduo" type="primary" @click="riman">更多</el-button>
    </div>

    <div class="flex-wrap">
      <router-link class="bianse" v-for="(list,index) in rimans":key="index" :to="'/detail?id=' + list.videoId">
        <img class="guoman-img" :src=list.imageUrl>
        <div class="bianse" style="width: 190px">{{list.title}}</div>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Index",
  created() {
    this.zhengzaireing()
    this.guomanqu()
    this.rimanqu()
  },
  data(){
    return {
      name:"",
      reying:[],
      guomans:[],
      rimans:[]

    }
  },
  methods:{
    riman(){
      this.$router.push('/dongmanindex?activeName=dongmanku&area=日本')
    },
    guoman(){
      this.$router.push('/dongmanindex?activeName=dongmanku&area=中国')
    },

    zhengzaireing(){
      this.request.get("/reying",{}).then(res=>{
        this.reying=res.data
      })
    },
    guomanqu(){
      this.request.get("/display",{
        params:{
          area:"中国"
        }
      }).then(res=>{
        this.guomans=res.data
      })
    },
    rimanqu(){
      this.request.get("/display",{
        params:{
          area:"日本"
        }
      }).then(res=>{
        this.rimans=res.data
      })
    }
  }

}
</script>

<style scoped>

</style>
