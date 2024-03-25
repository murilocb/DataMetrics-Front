import { ref } from 'vue'

const file = ref<File | null>(null)

async function uploadFile(formData: FormData) {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + 'upload', {
      method: 'POST',
      body: formData,
      mode: 'cors'
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Upload failed: ${errorData.message || 'Unknown error'}`)
    }

    file.value = null
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Upload error:', error)
    throw new Error('Erro ao enviar o arquivo')
  }
}

export default uploadFile
