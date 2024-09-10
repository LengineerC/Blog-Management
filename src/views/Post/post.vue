<script setup>
import PageLayout from '@/components/PageLayout/PageLayout.vue';
import router from '@/router';
import { usePostStore } from '@/stores/post';
import { ElMessageBox, ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

const postStore=usePostStore();
const tableData=ref([]);
const loading=ref(true);
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
  loading.value=false;
}

function handleFresh(){
  loading.value=true;
  pagination.value={
    page:1,
    pageSize:10,
  }
  postStore.getPostByPage(pagination.value,initTableData)
}

function handlePageChange(currentPage){
  loading.value=true;
  pagination.value={
    page:currentPage,
    pageSize:10,
  }
  postStore.getPostByPage(pagination.value,initTableData);
}

function handleDelete(id){
  ElMessageBox.confirm(
    "确定删除文章？",
    "Warning",
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  ).then(()=>{
    const payload={
      postId:id
    }
    postStore.deletePost(payload,handleFresh);

  }).catch(()=>{
    ElMessage({
      type: 'info',
      message: 'Delete canceled',
    })
  });
  
}

onMounted(()=>{
  postStore.getPostByPage(pagination.value,initTableData);
});

</script>

<template>
  <PageLayout>
    <el-card>
      <div class="btn-line">
        <el-button style="width: 75px;" @click="handleFresh()">
          <el-icon :size="15" style="margin-right: 5px;">
            <Refresh />
          </el-icon>
          刷新
        </el-button>
        <el-button style="width: 75px;" @click="()=>{router.push('/Posts/Edit')}">
          <el-icon :size="15" style="margin-right: 5px;">
            <Plus />
          </el-icon>
          新建
        </el-button>
      </div>

      <el-table 
      style="width: 100%; height: 80%;"
      :data="tableData"
      stripe
      show-overflow-tooltip
      v-loading="loading"
      >
        <el-table-column width="50" label="ID" prop="postId"/>

        <el-table-column label="Title" prop="title"/>

        <el-table-column width="150" label="Author" prop="author"/>

        <el-table-column width="75" label="Top" align="center">
          <template #default="scope">
            <el-tag type="success" v-if="!!scope.row.top">
              Y
            </el-tag>
            <el-tag type="danger" v-else>
              N
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column width="75" label="Locked" align="center">
          <template #default="scope">
            <el-tag type="success" v-if="!!scope.row.lock">
              Y
            </el-tag>
            <el-tag type="danger" v-else>
              N
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column width="130" label="Password" align="center">
          <template #default="scope">
            <el-popover 
            effect="dark" 
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

        <el-table-column 
        label="Operations"
        align="center"
        >
          <template #default="scope">
            <RouterLink :to="`/Posts/Edit/${scope.row.postId}`">
              <a class="op-btn">
                <el-icon :size="15">
                  <Edit />
                </el-icon>
              </a>
            </RouterLink>

            <el-divider direction="vertical"/>

            <a class="op-btn" @click="handleDelete(scope.row.postId)">
              <el-icon :size="15">
                <Delete />
              </el-icon>
            </a>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination 
      layout="prev, pager, next" 
      :total="postStore.total" 
      :default-page-size="pagination.pageSize" 
      @change="handlePageChange"
      v-model:currentPage="pagination.page"
      />
    </el-card>

  </PageLayout>
</template>

<style lang="scss" scoped>
.btn-line{
  display: flex;
  align-items: center;
  width: 100%;
  height: 10%;
  padding-left: 1%;
}

:deep(.el-table__inner-wrapper){
  &::before{
    display: none !important;
  }
}

.el-pagination{
  justify-content: end;
  padding-right: 1%;
}

.op-btn{
  color: rgb(47,161,255);
  transition: 0.3s;

  &:hover{
    color: rgb(146, 206, 255);
  }

  &:active{
    color: rgb(12, 142, 248);
  }
}

</style>