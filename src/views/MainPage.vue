<template>
  <main class="bg-primary mt-8 max-h-screen">
    <div class="flex flex-col sm:flex-row">
      <UploadFile class="w-screen sm:mr-4 sm:w-1/4 mb-4 sm:mb-4" />
      <AboutBoard class="w-screen mr-4 sm:w-1/4 mb-4 sm:mb-4" />
      <PieChart class="w-screen sm:mr-8 mb-4 sm:mb-4" />
    </div>
    <div class="flex flex-col sm:flex-row">
      <BarChartMRR class="w-screen sm:w-1/2 mb-4 sm:mb-4" />
      <BarChartChurnRate class="w-screen sm:w-1/2 mb-4 sm:mb-4" />
      <LineChart class="w-screen sm:w-1/2 mb-4 sm:mb-4" />
    </div>
    <div class="flex flex-col sm:flex-row">
      <BarChartVue class="w-screen sm:mb-4" />
    </div>
  </main>
</template>

<script setup lang="ts">
import UploadFile from '../components/UploadFile.vue'
import AboutBoard from '../components/AboutBoard.vue'
import BarChartVue from '../components/BarChart.vue'
import BarChartMRR from '../components/BarChartMRR.vue'
import BarChartChurnRate from '../components/BarChartChurnRate.vue'
import BubbleChart from '../components/BubbleChart.vue'
import DoughnutChart from '../components/DoughnutChart.vue'
import LineChart from '../components/LineChart.vue'
import PieChart from '../components/PieChart.vue'
</script>

<style>
body {
  --tw-bg-opacity: 1;
  background-color: rgb(52 18 102 / var(--tw-bg-opacity));
}
</style>
