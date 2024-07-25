<script>
import { ArrowRight } from '@element-plus/icons-vue';

export default{
  name:"PageLayout",
  components:{
    ArrowRight,
  },
}

</script>

<template>
  <div class="page-layout-main">
    <div class="nav-container">
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      </el-breadcrumb>

      <hr class="hr-twill">

      <div class="path-name">
        Path
      </div>
    </div>

    <div class="layout-main">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-layout-main{
  display: flex;
  flex-direction: column;
  flex: 1;
  width: auto;
  height: 100%;
}

.nav-container{
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  box-sizing: border-box;
}

.hr-twill{
  margin: 15px 0;
  width: 100%;
  border: 0;
  padding: 2px;
  background: repeating-linear-gradient(135deg, #a2a9b6 0px, #a2a9b6 1px, transparent 1px, transparent 6px);
}

.path-name{
  display: flex;
  width: auto;
  font-size: 20px;
  padding-left: 20px;
}
.layout-main{
  display: flex;
  flex: 1;
  width: auto;
  margin: 20px 10px;
}
</style>