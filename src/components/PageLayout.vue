<script>
import { ArrowRight } from '@element-plus/icons-vue';

export default{
  name:"PageLayout",
  components:{
    ArrowRight,
  },
  data(){

  },
}

</script>

<template>
  <div>
    <div class="nav-container">
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      </el-breadcrumb>

      <hr class="hr-twill">

      <div class="path-name">
        Path
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.nav-container{
  display: flex;
  flex-direction: column;
  width: auto;
  padding: 20px;
  background-color: #fff;
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
</style>