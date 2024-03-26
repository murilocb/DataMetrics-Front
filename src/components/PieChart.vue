<template>
  <section
    class="h-96 sm:ml-4 sm:mr-4 mb-8 p-6 bg-sky-100 rounded-2xl shadow-md flex flex-col justify-center items-center"
  >
    <Pie :data="chartData" :options="chartOptions" />
  </section>
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { useChartDataStore } from '../stores/main'
import { onMounted, watchEffect, ref } from 'vue'

ChartJS.register(ArcElement, Tooltip, Legend)

const store = useChartDataStore()

interface ChartDataEntry {
  ativa: number
  cancelada: number
  trial: number
}

// Função para atualizar os dados do gráfico
const updateChartData = () => {
  const data = getChartData()
  const labels = ['Ativa', 'Cancelada', 'Trial']
  const datasets = [
    {
      data: [data.ativa, data.cancelada, data.trial],
      backgroundColor: ['#f87979', '#7cb5ec', '#90ed7d']
    }
  ]

  chartData.value = {
    labels,
    datasets
  }
}

// Função para obter os dados do store ou retornar dados padrão
const getChartData = (): ChartDataEntry => {
  if (store.getData !== null && store.getData.porcentagemStatus !== null) {
    return store.getData.porcentagemStatus
  } else {
    // Return default values if data is not available
    return {
      ativa: 0,
      cancelada: 0,
      trial: 0
    }
  }
}

const chartData = ref()
updateChartData() // Inicializa os dados do gráfico

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const
    }
  }
}

// Ouvindo o evento emitido em outra tela e atualizando os dados do gráfico
onMounted(() => {
  const updateChartHandler = () => {
    updateChartData()
  }
  // Adiciona um ouvinte para o evento 'updateEvent'
  watchEffect(() => {
    updateChartHandler()
  })
})
</script>
