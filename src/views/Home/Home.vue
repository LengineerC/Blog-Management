<script>
import PageLayout from '@/components/PageLayout/PageLayout.vue';
import { usePostStore } from '@/stores/post';
import { onMounted, nextTick } from 'vue';
import * as echarts from "echarts";

export default {
  name: "Home",

  components: {
    PageLayout,
  },

  data() {
    return {
      catChartInstance: null,
      tagChartInstance: null,
    }
  },

  methods: {
    initChart() {
      const { tagChart, catChart } = this.$refs;
      this.tagChartInstance = echarts.init(tagChart);
      this.catChartInstance = echarts.init(catChart);
    },
    resizeCharts() {
      this.tagChartInstance && this.tagChartInstance.resize();
      this.catChartInstance && this.catChartInstance.resize();
    },
  },

  mounted() {
    nextTick(() => {
      this.initChart();
      window.addEventListener('resize', this.resizeCharts);
    });
    this.initChart();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeCharts);
  },

  setup() {
    const postStore = usePostStore();

    onMounted(() => {
      if (postStore.total === 0) {
        postStore.getPostByPage({
          page: 0,
          pageSize: 0,
        });
        postStore.getAllTags();
        postStore.getAllCategories();
      }

    });

    return {
      postStore,
    }
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