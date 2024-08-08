<template>
  <PageLayout>
    <el-card>
      <el-table 
      style="width: 100%;"
      show-overflow-tooltip="true"
      >
        <el-table-column label="ID" prop="postId"/>
      </el-table>
    </el-card>
  </PageLayout>

</template>

<script>
import PageLayout from '@/components/PageLayout/PageLayout.vue';
import { usePostStore } from '@/stores/post';

export default {
  components: {
    PageLayout,
  },
  mounted(){
    
  },
  setup(){
    const postStore=usePostStore();
    let tableData=[];
    tableData=postStore.posts;
    console.log(tableData);

    return {
      
    }
  },

}

</script>
