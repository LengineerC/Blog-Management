<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="title-container">
          <h3>Blog Management</h3>
        </div>

        <div class="tools-container">
          <div class="user-container" @mouseenter="showUserOps = true" @mouseleave="showUserOps = false">
            <el-icon size="20">
              <User />
            </el-icon>

            <span style="font-size: 14px;margin: 0 5px;">
              {{ username }}
            </span>

            <Transition name="fade">
              <div class="user-ops-container" v-show="showUserOps">
                <div class="user-op">
                  <el-icon>
                    <Setting />
                  </el-icon>
                  <span class="op-text">账号设置</span>
                </div>

                <div class="user-op" @click="handleSignOut">
                  <el-icon>
                    <SwitchButton />
                  </el-icon>
                  <span class="op-text">退出账号</span>
                </div>
              </div>
            </Transition>
          </div>

        </div>
      </el-header>

      <el-container>
        <el-aside :width="isCollapse?'65px':'250px'">
          <el-scrollbar>
            <div class="collapse-btn" @click="isCollapse=!isCollapse">
              <el-icon color="#fff" v-if="isCollapse"><Expand /></el-icon>
              <el-icon color="#fff" v-else><Fold /></el-icon>
            </div>
            <el-menu 
            :collapse="isCollapse"
            default-active="1"
            >
              <RouterLink to="/">
                <el-menu-item index="1">
                  <el-icon>
                    <house />
                  </el-icon>
                  <template #title><span>Home</span></template>
                </el-menu-item>
              </RouterLink>

              <RouterLink to="/Post">
                <el-menu-item index="2">
                  <el-icon><Document /></el-icon>
                  <template #title><span>Posts management</span></template>
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

<script setup>
import { ref } from 'vue'
import { Expand, Fold, House, User } from '@element-plus/icons-vue';
import { RouterView, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const isCollapse = ref(false);
const router = useRouter();
const username = ref(userStore.username);

const showUserOps = ref(false);

function handleSignOut() {
  localStorage.setItem("token", '');
  userStore.clearUser();
  router.push('/Login');
}
</script>

<style lang="scss" scoped>
@import "../../styles/base.scss";

.title-container {
  @extend .flex-hv-center;
  width: 250px;
  height: 100%;
  background: #2fa1ff;

  h3 {
    color: #fff;
    margin: 0;
    font-size: 25px;
    font-family: Arial, sans-serif;
  }
}

.tools-container {
  height: 100%;
  display: flex;

  .user-container {
    height: 100%;
    @extend .flex-hv-center;

    .user-ops-container {
      position: absolute;
      border-radius: 5px;
      height: auto;
      width: 100px;
      background: rgb(240, 242, 245);
      top: 50px;

      .user-op {
        @extend .flex-hv-center;
        width: 100%;
        height: auto;
        transition: 0.3s;
        padding: 8px 0;
        border-radius: 5px;

        &:hover {
          background-color: #fff;
        }

        .op-text {
          font-size: 13px;
          margin-left: 5px;
        }

      }
    }
  }
}

.common-layout {
  width: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  padding: 0 2% 0 0;
  box-shadow: 0 5px 10px -6px #aaaaaaaa;
  z-index: 1;
}

.el-aside {
  box-shadow: 5px 0 10px -6px #aaaaaaaa;
  z-index: 0;
  transition: 0.3s;

  a {
    text-decoration: none;
  }

  ul{
    width: 100%;
  }

  .collapse-btn{
    @extend .flex-hv-center;
    height: 25px;
    background-color: #2fa1ff6f;
    transition: 0.15s;

    &:hover{
      background-color: #53b1ff6f;
    }

    &:active{
      background-color: #77c0fc6f;
    }
  }
}

.el-main {
  --el-main-padding: 0px;
  background: rgb(240, 242, 245);
}

.el-container.is-vertical {
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>