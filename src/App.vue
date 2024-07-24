<script setup>
import { ref } from 'vue'
import {
  House
} from '@element-plus/icons-vue';
import { RouterView } from 'vue-router';

const isCollapse=ref(false);

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="title-container">
          <h3>
            Blog Management
          </h3>
        </div>
      </el-header>

      <el-container>
        <el-aside width="250px">
          <el-scrollbar>
            <el-menu
            :collapse="isCollapse"
            >
            <RouterLink to="/">
              <el-menu-item index="1">
                <el-icon><house /></el-icon>
                <span>Home</span>
              </el-menu-item>  
            </RouterLink>
            </el-menu>
          </el-scrollbar>
        </el-aside>

        <el-main>
          <RouterView />
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
@import "./styles/base.scss";

.title-container{
  @extend .flex-hv-center;
  width: 250px;
  height: 100%;
  background: #2fa1ff;
  // background: linear-gradient(to right,#2fa1ff 80%,#f1f6fcdd);

  h3{
    color: #fff;
    margin: 0;
    font-size: 25px;
    font-family: Arial, sans-serif;
  }
}

.common-layout{
  width: 100%;
}

.el-header{
  padding: 0;
  box-shadow:0 5px 10px -6px #aaaaaaaa;
  z-index: 1;
}

.el-aside{
  padding-top: 3%;
  box-shadow: 5px 0 10px -6px #aaaaaaaa;
  z-index: 0;

  a{
    text-decoration: none;
  }
}

.el-main{
  --el-main-padding: 0px;
  background: rgb(240,242,245);
}

.el-container.is-vertical{
  height: 100%;
}
</style>