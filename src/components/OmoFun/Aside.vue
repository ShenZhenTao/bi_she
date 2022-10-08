<template>
  <div style="position: fixed">
  <div style="line-height: 60px;margin-left: 15px" >
    <img style="width: 163px;height: 26px;top: 20px" src="../../assets/index.png"/>
  </div>
  <div style="width: 100%;height: 100%;" translate="yes">
    <ul class="nav-left aside-fontsize">
      <li >
        <a href="/index" class="bianse">
        <i class="el-icon-s-home">
            <span>首页</span>
        </i>
        </a>
      </li>
      <li class="bianse">
        <i class="el-icon-s-open" onclick="location='/dongmanindex?activeName=index'">更多</i>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
export default {
  name: "Aside",
  methods:{

  }
}
</script>

<style scoped>

</style>
