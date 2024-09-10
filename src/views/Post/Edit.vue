<script setup>
import { usePostStore } from '@/stores/post';
import { EDIT_CONDITION } from '@/utils/requests/enum';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route=useRoute();
const postStore=usePostStore();

const condition=ref(null);
const currentPost=ref({});

postStore.$subscribe((_,state)=>{
  currentPost.value=state.currentPost;
  console.log(currentPost.value);
})

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

</script>

<template>
  <div class="edit-main">
    <el-card>
      <div>

      </div>
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
}

</style>