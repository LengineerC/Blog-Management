<script setup>
import { usePostStore } from '@/stores/post';
import { EDIT_CONDITION } from '@/utils/requests/enum';
import { h, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessageBox, ElInput } from 'element-plus';
import MDRenderer from '@/components/MDRenderer/MDRenderer.vue';

const route=useRoute();
const postStore=usePostStore();

const condition=ref(null);
const currentPost=ref({
  post:{
    title:'',
    author:'',
    lock: 0,
    top: 0,
    password: '',
    content:'',
  },
  tags:[],
  categories:[],
});
const formRef=ref(null);
const tagOptions=ref([]);
const categoryOptions=ref([]);
const inputTag=ref('');
const inputCategory=ref('');

postStore.$subscribe((_,state)=>{
  currentPost.value=state.currentPost;
  tagOptions.value=state.tags.map(tag=>({value:{name:tag.name},label:tag.name}));
  categoryOptions.value=state.categories.map(category=>({value:{name:category.name},label:category.name}));

  Object.assign(currentPost,state.currentPost);
});

onMounted(() => {
  const id=route.params.id;
  condition.value=id?EDIT_CONDITION.EDIT:EDIT_CONDITION.ADD;
  
  switch(condition.value){
    case EDIT_CONDITION.ADD:
      break;
    
    case EDIT_CONDITION.EDIT:
      postStore.getPostById({postId:id});
      break;
  }

});

const openTagInput=()=>{
  ElMessageBox({
    message: () => h('div',{style:"display:flex;"},[
      h('span',{style:"display:flex;width:80px;margin-right:5px;align-items:center"},"Add Tag:"),
      h(ElInput, {
        modelValue: inputTag.value,
        'onUpdate:modelValue': (val) => {inputTag.value = val},
      })
    ]),
    showCancelButton: true,
    confirmButtonText: 'Add',
    cancelButtonText: 'Cancel',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        console.log(inputTag.value);
        currentPost.value.tags.push(inputTag.value);
        inputTag.value='';
      }
      done();
    }
  });
}

const openCategoryInput=()=>{
  ElMessageBox({
    message: () => h('div',{style:"display:flex;"},[
    h('span',{style:"display:flex;width:150px;margin-right:5px;align-items:center"},"Add Category:"),
      h(ElInput, {
        modelValue: inputCategory.value,
        'onUpdate:modelValue': (val) => {inputCategory.value = val},
      }),
    ]),
    showCancelButton: true,
    confirmButtonText: 'Add',
    cancelButtonText: 'Cancel',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        console.log(inputCategory.value);
        currentPost.value.categories.push(inputCategory.value);
        inputCategory.value='';
      }
      done();
    }
  });
}

</script>

<template>
  <div class="edit-main">
    <el-card>
      <el-form
      ref="formRef"
      :model="currentPost"
      >
        <div class="row-1">
          <el-form-item label="Title:" prop="title" class="column">
            <el-input 
            v-model="currentPost.post.title" 
            />
          </el-form-item>
  
          <el-form-item label="Author:" prop="author" class="column">
            <el-input 
            v-model="currentPost.post.author" 
            />
          </el-form-item>

          <el-form-item label="Top" prop="top" class="column">
            <el-switch v-model="currentPost.post.top" :active-value="1" :inactive-value="0"/>
          </el-form-item>
          
          <el-form-item label="Lock" prop="lock" class="column">
            <el-switch v-model="currentPost.post.lock" :active-value="1" :inactive-value="0"/>
          </el-form-item>
        </div>

        <div class="row-2">
          <el-form-item label="Password:" prop="password" style="margin-right: 15px;">
            <el-input 
            v-model="currentPost.post.password"
            :disabled="!currentPost.post.lock"
            />
          </el-form-item>

          <el-form-item label="Tags:" prop="tags">
            <el-select-v2
              v-model="currentPost.tags"
              :options="tagOptions"
              value-key="name"
              placeholder="Please select"
              style="width: 240px"
              multiple
              collapse-tags
              collapse-tags-tooltip
            />
          </el-form-item>
          <el-icon class="plus-icon" style="margin-right: 15px;" @click="openTagInput">
            <Plus />
          </el-icon>

          <el-form-item label="Categories:" prop="categories">
            <el-select-v2
              v-model="currentPost.categories"
              :options="categoryOptions"
              value-key="name"
              placeholder="Please select"
              style="width: 240px"
              multiple
              collapse-tags
              collapse-tags-tooltip
            />
          </el-form-item>
          <el-icon class="plus-icon" @click="openCategoryInput">
            <Plus />
          </el-icon>
        </div>

        <!-- <MDRenderer markdown="# 123"/> -->
          
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss">
@import "../../styles/base.scss";

.edit-main{
  display: flex;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 10px 5px;

  
  .row-1{
    display: flex;

    .column{
      margin-right: 20px;
    }
  }

  .row-2{
    display: flex;
  }

  .plus-icon{
    margin: 0 0 0 5px;
    color: grey;
    font-size: 13px;
    // font-weight: bold;
    transition: 0.3s;
    transform: translate3d(0,70%,0);

    &:hover{
      color: rgb(64,158,255);
      transform: scale(1.05);
      transform: translate3d(0,70%,0);
    }
  }

}

</style>