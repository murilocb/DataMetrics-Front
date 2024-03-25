<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits(['page'])
const { itemsPerPage, total, page } = defineProps(['itemsPerPage', 'total', 'page'])

const currentPage = ref<number>(page)
const totalPages = computed(() => Math.ceil(total / itemsPerPage))
const visiblePageNumbers = computed(() => {
  const pageNumbers = []
  const maxVisiblePages = 5
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2)
  let startPage = currentPage.value - halfMaxVisiblePages
  let endPage = currentPage.value + halfMaxVisiblePages

  if (startPage < 1) {
    endPage += 1 - startPage
    startPage = 1
  }
  if (endPage > totalPages.value) {
    endPage = totalPages.value
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return pageNumbers
})

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    emit('page', currentPage.value)
  }
}
</script>
<template>
  <div class="flex justify-between items-center mt-8">
    <span class="text-sm font-normal text-white mb-4 md:mb-0 block w-full md:inline md:w-auto"
      >Exbindo
      <span class="font-semibold text-white">{{ currentPage }}-{{ totalPages }}</span>
      de <span class="font-semibold text-white">{{ total }}</span></span
    >
    <nav aria-label="Pagination">
      <ul class="pagination">
        <li :class="{ disabled: currentPage === 1 }">
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Anterior</button>
        </li>
        <li v-for="pageNumber in visiblePageNumbers" :key="pageNumber">
          <button @click="goToPage(pageNumber)" :class="{ active: pageNumber === currentPage }">
            {{ pageNumber }}
          </button>
        </li>
        <li :class="{ disabled: currentPage === totalPages }">
          <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
            Próximo
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<style scoped>
.pagination {
  display: flex;
  list-style: none;
}

.pagination li {
  margin-right: 0.5rem;
}
.pagination li:last-child {
  margin-right: 0;
}
.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: #262d33;
  cursor: pointer;
  color: #fff;
  border-radius: 5px;
}
.pagination .active {
  border: 1px solid #8ce77c;
  background-color: #57e140;
  color: #fff;
}
.pagination button:hover {
  border: 1px solid #8ce77c;
  background-color: #57e140;
  color: #fff;
}

.pagination button:focus {
  outline: none;
}

.pagination .disabled button {
  pointer-events: none;
  opacity: 0.5;
}
</style>
