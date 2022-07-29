<template>
  <div style="z-index: 1">
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动漫首页" name="index">
          <div class="zhengzaireying">
            <div class="reying" style="margin-top: 20px">
              <a class=" bianse">新片上线</a>
              <el-button id="guoman" class="gengduo" type="primary" @click="todongmanku">更多</el-button>
            </div>
            <div class="flex-wrap">
              <router-link class="bianse" v-for="(list,index) in newVideos":key="index" :to="'/detail?id=' + list.videoId">
                <img class="guoman-img" :src=list.imageUrl>
                <div class="bianse" style="width: 190px">{{list.title}}</div>
              </router-link>
            </div>
            <div class="reying">
              <a class="bianse">排行榜</a>
              <el-radio-group v-model="tabPosition" class="bangdanpaixu">
                <el-radio-button label="day">日榜</el-radio-button>
                <el-radio-button label="week">周榜</el-radio-button>
                <el-radio-button label="month">月榜</el-radio-button>
              </el-radio-group>
            </div>

            <div class="flex-wrap">
              <router-link class="bianse" v-for="(list,index) in popularityList":key="index" :to="'/detail?id=' + list.videoId">
                <img class="guoman-img" :src=list.imageUrl>
                <div class="bianse" style="width: 190px">{{list.title}}</div>
              </router-link>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="动漫库" name="dongmanku">
          <div>
            <div align="left" style="font-size: 20px;border-bottom: 2px solid #f1f3f5">
              <div class="border-bottom1">
                剧情
                <i class="el-icon-caret-right margin-left-15px"></i>
                <el-radio-group  v-model="juqing" class="typechxun" @change="page">
                  <el-radio-button label="" >全部</el-radio-button>
                  <el-radio-button  class="type_radio" :label=list.juqing v-for="(list,index) in plots" :key="index">{{ list.juqing }}</el-radio-button>
                </el-radio-group>

              </div>
              <div class="border-bottom1">
                地区
                <i  class="el-icon-caret-right margin-left-15px"></i>
                <el-radio-group  v-model="diqu" class="typechxun" @change="page">
                  <el-radio-button label="" >全部</el-radio-button>
                  <el-radio-button  class="type_radio" label="中国">中国</el-radio-button>
                  <el-radio-button  class="type_radio" label="日本">日本</el-radio-button>
                </el-radio-group>
              </div>
              <div class="border-bottom1">
                语言
                <i  class="el-icon-caret-right margin-left-15px"></i>
                <el-radio-group  v-model="yuyan" class="typechxun" @change="page">
                  <el-radio-button label="" >全部</el-radio-button>
                  <el-radio-button  class="type_radio" label="国语">国语</el-radio-button>
                  <el-radio-button  class="type_radio" label="日语">日语</el-radio-button>
                </el-radio-group>
              </div>
              <div class="border-bottom1">
                年份
                <i  class="el-icon-caret-right margin-left-15px"></i>
                <el-radio-group  v-model="nianfen" class="typechxun" @change="page">
                  <el-radio-button label="" >全部</el-radio-button>
                  <el-radio-button  class="type_radio" label="2022">2022</el-radio-button>
                  <el-radio-button  class="type_radio" label="2021">2021</el-radio-button>
                  <el-radio-button  class="type_radio" label="2020">2020</el-radio-button>
                  <el-radio-button  class="type_radio" label="2019">2019</el-radio-button>
                  <el-radio-button  class="type_radio" label="2018">2018</el-radio-button>
                  <el-radio-button  class="type_radio" label="2017">2017</el-radio-button>
                  <el-radio-button  class="type_radio" label="2016">2016</el-radio-button>
                  <el-radio-button  class="type_radio" label="2015">2015</el-radio-button>
                  <el-radio-button  class="type_radio" label="2014">2014</el-radio-button>
                </el-radio-group>
              </div>
              <div class="border-bottom1">
                字母
                <i  class="el-icon-caret-right margin-left-15px"></i>
                <el-radio-group  v-model="pyKey" class="typechxun" @change="page">
                  <el-radio-button label="" >全部</el-radio-button>
                  <el-radio-button   class="type_radio" :label=list.pyKey v-for="(list,index) in Initials" :key="index">{{ list.pyKey }}</el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div>
              <div class="flex-wrap">
                <router-link class="bianse" v-for="(list, index) in dongmanku" :key="index" :to="'/detail?id=' + list.videoId">
                  <img class="guoman-img" :src=list.imageUrl>
                  <div class="bianse" style="width: 190px">{{list.title}}</div>
                </router-link>
              </div>
            </div>
            <div style="margin-top: 50px">
              <el-pagination
                  background
                  layout="prev, pager, next"
                  @current-change="handleCurrentChange"
                  :current-page="pageNum"
                  :page-size="pageSize"
                  :total="total">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
export default {
  name: "DongManIndex",
  created() {
    this.newVideo()
    this.Popularity()
    this.pd()
    this.pdarea()
    this.page()

  },

  data(){
    return {
      title:this.$route.query.name,//动漫名
      plot:"",//剧情
      area:"",//地区
      language:"",//语言
      year:"",//年份
      pyKey:"",//首字母
      nianfen:"",
      juqing:"",
      diqu:"",
      yuyan:"",
      pageNum:1,
      pageSize:30,
      total:0,
      tabPosition: 'day',
      name:"",
      activeName: 'index',
      newVideos:[],
      popularityList:[],
      dongmanku:[],
      plots:[
        {juqing: "热血"},
        {juqing: "穿越"},
        {juqing: "奇幻"},
        {juqing: "战斗"},
        {juqing: "搞笑"},
        {juqing: "日常"},
        {juqing: "科幻"},
        {juqing: "萌系"},
        {juqing: "治愈"},
        {juqing: "校园"},
        {juqing: "恋爱"},
        {juqing: "魔法"},
        {juqing: "冒险"},
        {juqing: "机战"},
        {juqing: "催泪"},
        {juqing: "音乐"}
      ],
      Initials:[
        {pyKey:"A"},
        {pyKey:"B"},
        {pyKey:"C"},
        {pyKey:"D"},
        {pyKey:"E"},
        {pyKey:"F"},
        {pyKey:"G"},
        {pyKey:"H"},
        {pyKey:"I"},
        {pyKey:"J"},
        {pyKey:"K"},
        {pyKey:"L"},
        {pyKey:"M"},
        {pyKey:"N"},
        {pyKey:"O"},
        {pyKey:"P"},
        {pyKey:"Q"},
        {pyKey:"R"},
        {pyKey:"S"},
        {pyKey:"T"},
        {pyKey:"U"},
        {pyKey:"V"},
        {pyKey:"W"},
        {pyKey:"X"},
        {pyKey:"Y"},
        {pyKey:"Z"},
        {pyKey:"0-9"},
      ]
    }
  },
  methods: {
    page(){
      this.request.get("/dongmanindex/page",{
        params:{
          title:this.title,
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          area:this.diqu,
          language:this.yuyan,
          year:this.nianfen,
          plot:this.juqing,
          pyKey:this.pyKey
        }
      }).then(res=>{
        console.log(res)
        this.dongmanku=res.data.records
        this.total=res.data.total
      })
    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      this.page()
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },

    todongmanku(){
      this.activeName="dongmanku"
    },
    newVideo(){
      this.request.get("/dongmanindex/newVideo",{}).then(res=>{
        this.newVideos=res.data
      })
    },
    Popularity(){
      this.request.get("/dongmanindex/PopularityList",{}).then(res=>{
        this.popularityList=res.data
      })
    },
    pd(){
      if (this.$route.query.activeName==null){
        this.activeName="index"
      }else {
        this.activeName=this.$route.query.activeName
      }
    },
    pdarea(){
      if (this.$route.query.area==null){
        this.diqu=""
      }else {
        this.diqu=this.$route.query.area
      }
    }
  }
}
</script>

<style scoped>

</style>
