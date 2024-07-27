<script>
import { useUserStore } from '@/stores/user';
import { reactive } from 'vue';
import { ElLoading } from 'element-plus';

export default{
  name:"Login",
  setup(){
    const userStore=useUserStore();
    const rules = reactive({
      username: [
        { required: true, message: 'username is not null', trigger: 'blur' },
      ],
      password: [
        { required: true, message: 'password is not null', trigger: 'blur' },
      ],
    });

    return {
      rules,
      userStore,
    }
  },
  components:{

  },
  data(){
    return{
      username:'',
      password:'',
      savePassword:false,
    }
  },
  mounted(){
    let user=localStorage.getItem("loginUser");
    try {
      user=JSON.parse(user);
      const {username,password}=user;
      this.username=username;
      this.password=password;
    } catch (error) {
      console.log("localStorage data error",error);
    }
  },
  methods:{
    async handleLogin(){
      const loginCard=document.getElementsByClassName("login-card")[0];
      const loading=ElLoading.service({
        target:loginCard,
        lock:true
      })

      const {formRef}=this.$refs;
      await formRef.validate((valid,fields)=>{
        const callback=(code)=>{
          if(code){
            this.$router.push('/Home');
          }
          loading.close();
        }

        if(valid){
          const user={
            username:this.username,
            password:this.password,
          };
          // console.log(user);
          if(this.savePassword){
            localStorage.setItem("loginUser",JSON.stringify(user));
            // localStorage.setItem("loginUser",user);
          }
          this.userStore.login(user,callback);
        }else{
          console.log("fields error",fields);
        }

      });
    }
  }
}
</script>

<template>
  <div class="login-main">
    <div class="login-main-bg"/>
    
    <div class="login-card" id="login-card">
      <el-card>
        <div class="form-title">Login</div>

        <div class="form-container">
          <el-form
          label-position="right"
          ref="formRef"
          :rules="rules"
          :model="{username,password}"
          >
            <el-form-item :required="true" label="User:" label-width="70px" prop="username">
              <el-input v-model="username" />
            </el-form-item>

            <el-form-item :required="true" label="Password:" label-width="70px" prop="password">
              <el-input v-model="password" type="password"/>
            </el-form-item>

            <el-form-item>
              <span style="font-size: 12px; margin-right: 5px; ">记住密码</span>
              <el-switch v-model="savePassword"/>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>

  </div>
</template>

<style lang="scss" scoped>
@import "../../styles/base.scss";

.login-main{
  @extend .flex-hv-center;
  width: 100%;
  height: 100%;

  .login-main-bg{
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/login-bg.webp);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    opacity: 0.3;
    z-index: -2;
  }

  .login-card{
    width: 30%;
    height: auto;

    :deep(.el-card.is-always-shadow){
      box-shadow: 0 0 15px #3c3c3c87;
      
      .el-card__body{
        @extend .flex-hv-center;
        flex-direction: column;
        height: 100%;
        box-sizing: border-box;
        justify-content: space-around;
        justify-items: center;
        

        .el-form-item__label{
          color: #616161;
        }
      }

      .el-form-item__content{
        justify-content: center;
      }

      .form-title{
        color: #333;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 30px;
      }
  
      .form-container{
        @extend .flex-hv-center;
        width: 100%;
        height: 70%;
      }
    }

  }
}
</style>