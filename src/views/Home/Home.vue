<script>
import PageLayout from '@/components/PageLayout/PageLayout.vue';
import { usePostStore } from '@/stores/post';
import { onMounted } from 'vue';

export default {
  name:"Home",
  components:{
    PageLayout,
  },
  data() {
    return{

    }
  },
  setup(){
    const postStore=usePostStore();

    onMounted(()=>{
      postStore.getAllPosts();
      postStore.getAllTags();
      postStore.getAllCategories();
    });

    return{
      postStore,
    }
  },
  
}
</script>

<template>

</template>