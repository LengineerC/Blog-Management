<script>
import PageLayout from '@/components/PageLayout/PageLayout.vue';
import { usePostStore } from '@/stores/post';
import { onMounted, ref } from 'vue';
import * as echarts from "echarts";

export default {
  name: "Home",

  components: {
    PageLayout,
  },

  data() {
    return {

    }
  },

  setup() {
    const postStore = usePostStore();
    const tagCounts=ref({});
    const categoryCounts=ref({});

    onMounted(() => {
      if (postStore.total === 0) {
        postStore.getPostByPage({
          page: 0,
          pageSize: 0,
        });
        postStore.getAllPosts();
        postStore.getAllTags();
        postStore.getAllCategories();
      }

      const initCounts=()=>{
        if(Object.keys(postStore.tagCountDetails).length>0){
          tagCounts.value={...postStore.tagCountDetails};
        }
  
        if(Object.keys(postStore.categoryCountDetails).length>0){
          categoryCounts.value={...postStore.categoryCountDetails};
        }
      }

      initCounts();

      postStore.$subscribe((mutation,state)=>{
        initCounts();
      });

    });

    return {
      postStore,
      tagCounts,
      categoryCounts,
    }
  },

  methods: {
    initTagChart() {
      const { tagChart } = this.$refs;
      return echarts.init(tagChart);
    },
    
    initCategoryChart(){
      const {catChart}=this.$refs;
      return echarts.init(catChart);
    },

    createTagChart(){
      //echarts实例设置为响应式bug https://blog.csdn.net/zzsan/article/details/127121761

      let tagChartInstance = this.initTagChart();
      const tagOption={
        grid: {
          top: '15%',
          bottom: '15%', 
          left: '10%',
          right: '10%'
        },
        xAxis: {
          type: 'category',
          data: Object.keys(this.tagCounts),
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false,
          },
        },
        tooltip: {
          trigger: "axis"
        },
        dataZoom:{
          start:0,
          type:"inside",
        },
        color:[
          "#2fa1ff"
        ],
        series: {
          data: Object.values(this.tagCounts),
          type: 'bar'
        }
        
      };

      tagChartInstance.setOption(tagOption);
    },

    createCategoryChart(){
      let catChartInstance = this.initCategoryChart();

      const categoryOption={
        grid: {
          top: '15%',
          bottom: '15%',
          left: '10%',
          right: '10%'
        },
        xAxis: {
          type: 'category',
          data: Object.keys(this.categoryCounts),
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false,
          },
        },
        tooltip: {
          trigger: "axis",
        },
        dataZoom:{
          start:0,
          type:"inside",
        },
        color:[
          "#2fa1ff"
        ],
        series: {
          data: Object.values(this.categoryCounts),
          type: 'bar'
        }
        
      }

      catChartInstance.setOption(categoryOption);
    },

    resizeCharts() {
      this.tagChartInstance && this.tagChartInstance.resize();
      this.catChartInstance && this.catChartInstance.resize();
    },
  },

  mounted() {
    window.addEventListener('resize', this.resizeCharts);

    if(Object.keys(this.tagCounts)>0){
      this.createTagChart();
    }
    if(Object.keys(this.categoryCounts)>0){
      this.createCategoryChart();
    }
  },

  watch:{
    tagCounts(newValue){
      if(Object.keys(newValue).length>0){
        this.createTagChart();
      }
    },

    categoryCounts(newValue){
      if(Object.keys(newValue).length>0){
        this.createCategoryChart();
      }
    },
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeCharts);
  },

}
</script>

<template>
  <div class="home-main">
    <div class="home-card">
      <el-card>
        <div class="card-title">
          Tags
        </div>
        <div class="card-chart" ref="tagChart" />
      </el-card>
    </div>

    <div class="home-card">
      <el-card>
        <div class="card-title">
          Categories
        </div>
        <div class="card-chart" ref="catChart" />
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../styles/base.scss";

.home-main {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;

  .home-card {
    display: flex;
    width: 45%;
    height: 35%;
    min-height: 220px;
    min-width: 300px;

    :deep(.el-card__body) {
      display: flex;
      flex-direction: column;
    }

    .card-title {
      width: 100%;
      text-align: center;
      font-weight: bold;
    }

    .card-chart {
      @extend .flex-hv-center;
      display: flex;
      width: 100%;
      flex: 1;
    }
  }
}
</style>