<template>
  <section
    class="h-96 sm:ml-8 sm:-mr-2 mb-8 p-6 bg-sky-100 rounded-2xl shadow-md flex flex-col justify-center items-center"
  >
    <Bar :data="chartData" :options="chartOptions" />
  </section>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { useChartDataStore } from '../stores/main'
import { onMounted, watchEffect, ref } from 'vue'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const store = useChartDataStore()

interface ChartDataEntry {
  chave: string
  ativa: number
  cancelada: number
  trial: number
  valor: number
  quantidadeCobrancas: number
  cobrancaACadaXDias: number
  qtdIDAssinante: number
  MRR: number
  churnRate: number
}

// Função para atualizar os dados do gráfico
const updateChartData = () => {
  const data = getChartData()
  const labels = data.map((entry: ChartDataEntry) => entry.chave)
  const datasets = [
    {
      label: 'MRR',
      borderColor: '#90ed7d',
      backgroundColor: '#90ed7d',
      data: data.map((entry: ChartDataEntry) => entry.MRR)
    }
  ]

  chartData.value = {
    labels,
    datasets
  }
}

// Função para obter os dados do store ou retornar dados padrão
const getChartData = (): ChartDataEntry[] => {
  if (store.getData !== null && store.getData.formattedData !== null) {
    return store.getData.formattedData
  } else {
    // Retorne dados padrão vazios
    return []
  }
}

const chartData = ref()
updateChartData() // Inicializa os dados do gráfico

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
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
