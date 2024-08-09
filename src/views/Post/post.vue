<template>
  <PageLayout>
    <el-card>
      <el-table 
      style="width: 100%"
      height="70%"
      :data="tableData"
      stripe
      show-overflow-tooltip
      >
        <el-table-column width="50" label="ID" prop="postId"/>

        <el-table-column label="Title" prop="title"/>

        <el-table-column width="150" label="Author" prop="author"/>
        
        <el-table-column width="75" label="Locked">
          <template #default="scope">
            <el-tag type="success" v-if="!!scope.row.lock">
              Y
            </el-tag>
            <el-tag type="danger" v-else>
              N
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column width="130" label="Password">
          <template #default="scope">
            <el-popover 
            effect="light" 
            trigger="hover" 
            placement="top" 
            width="auto" 
            v-if="scope.row.password.length>0"
            >
              <template #default>
                <div>
                  {{ scope.row.password }}
                </div>
              </template>
              <template #reference>
                <div>
                  ******
                </div>
              </template>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="Categories">
          <template #default="scope">
            <el-tag 
            style="margin-right: 3px;" 
            type="warning" 
            v-for="category in scope.row.categories"
            >{{ category.name }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="Tags">
          <template #default="scope">
            <el-tag 
            style="margin-right: 3px;" 
            type="primary" 
            v-for="tag in scope.row.tags"
            >{{ tag.name }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="Operations">

        </el-table-column>
      </el-table>
    </el-card>
  </PageLayout>
</template>

<script setup>
import PageLayout from '@/components/PageLayout/PageLayout.vue';
import { usePostStore } from '@/stores/post';
import { onMounted, ref } from 'vue';

const postStore=usePostStore();
const tableData=ref([]);
const pagination=ref({
  page:1,
  pageSize:10,
});

function initTableData(postList){
  tableData.value=postList.map(post=>{
    return({
      ...post.post,
      tags:post.tags,
      categories:post.categories,
    })
  });
}

function handleFresh(){
  postStore.getPostByPage(pagination.value,initTableData)
}

onMounted(()=>{
  postStore.getPostByPage(pagination.value,initTableData);
});

</script>
