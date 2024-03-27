<template>
  <section
    class="sm:max-w-[400px] h-96 sm:ml-8 sm:mr-0 mb-8 p-6 bg-sky-100 rounded-2xl shadow-md text-center flex flex-col justify-center items-center"
  >
    <label for="file-upload" class="block text-lg font-medium text-gray-600 mb-2 mt-6">
      Selecione o arquivo:
    </label>
    <div class="relative">
      <button class="bg-button text-white font-bold py-2 px-4 rounded mb-2" @click="addFile">
        Selecionar Arquivo
      </button>
      <input
        id="file-upload"
        type="file"
        ref="fileInput"
        accept=".csv,.xlsx"
        class="absolute top-0 left-0 opacity-0"
        @change="handleFileChange"
      />
    </div>

    <!-- Mostra o nome do arquivo selecionado -->
    <div v-if="file" class="mt-2">
      <p class="text-sm font-medium text-gray-900">Arquivo selecionado:</p>
      <p class="text-gray-400">{{ file.name }}</p>
    </div>

    <button
      class="bg-button text-white font-bold py-2 px-4 rounded mt-4"
      @click="fileUpload"
      :disabled="!file"
    >
      Enviar Arquivo
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import uploadFile from '../services/fetchFiles'
import { useChartDataStore } from '../stores/main'

const file = ref<File | null>(null)

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const selectedFile = target.files[0]

    if (isValidFileType(selectedFile)) {
      file.value = selectedFile
    } else {
      toast.error('Por favor, selecione um arquivo CSV ou XLSX.')
      file.value = null
    }
  }
}

const addFile = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.csv,.xlsx'
  input.click()

  input.addEventListener('change', handleFileChange)
}

const fileUpload = async () => {
  if (!file.value) return

  const formData = new FormData()
  formData.append('file', file.value)

  try {
    const response = await uploadFile(formData)
    toast.success('Arquivo enviado com sucesso!')
    const store = useChartDataStore()
    store.setData(response)
    file.value = null
    const fileInput = document.getElementById('file-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  } catch (err) {
    console.error('Erro ao enviar o arquivo:', err)
    toast.error('Erro ao enviar o arquivo. Por favor, tente novamente mais tarde.')
  }
}

const isValidFileType = (file: File) => {
  const allowedTypes = [
    'text/csv',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
  return allowedTypes.includes(file.type)
}

// Emitindo o evento personalizado
defineEmits(['updateEvent'])
</script>
