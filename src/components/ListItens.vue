<script setup lang="ts">
import FilterStatus from './FilterStatus.vue'
const emit = defineEmits(['status'])
const { billings } = defineProps(['billings'])

function emitStatus(status: string) {
  emit('status', status)
}
</script>
<template>
  <div class="relative overflow-x-auto shadow-md rounded-2xl bg-primary-50 p-8">
    <div class="flex items-center justify-between">
      <h1 class="text-xl text-white mb-6">Cobranças de usuários.</h1>
      <FilterStatus @status="emitStatus" v-if="billings.length" />
    </div>
    <table v-if="billings.length" class="w-full text-sm text-left rtl:text-right text-white">
      <thead class="text-xs text-white uppercase">
        <tr>
          <th scope="col" class="py-3">Quantidade cobranças</th>
          <th scope="col" class="py-3">Cobrada a cada X dias</th>
          <th scope="col" class="py-3">Data início</th>
          <th scope="col" class="py-3">Status</th>
          <th scope="col" class="py-3">Data status</th>
          <th scope="col" class="py-3">Data cancelamento</th>
          <th scope="col" class="py-3">Valor</th>
          <th scope="col" class="py-3">Próximo ciclo</th>
          <th scope="col" class="py-3">ID assinante</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="billing in billings" :key="billing.id" class="bg-primary-50 hover:bg-gray-60">
          <td class="py-4 font-medium text-white whitespace-nowrap">
            {{ billing.quantity }}
          </td>
          <td class="py-4">{{ billing.chargedIntervalDays }}</td>
          <td class="py-4">{{ new Date(billing.start).toLocaleDateString() }}</td>
          <td class="py-4">
            <span
              v-if="billing.status === 'Ativa'"
              class="bg-primary-300 text-white text-sm p-1 font-medium rounded"
            >
              {{ billing.status }}
            </span>
            <span v-else class="bg-primary-200 text-white p-1 text-sm font-medium rounded">
              {{ billing.status }}
            </span>
          </td>
          <td class="py-4">
            {{ new Date(billing.statusDate).toLocaleDateString() }}
          </td>
          <td class="py-4">
            {{
              billing.cancellationDate
                ? new Date(billing.cancellationDate).toLocaleDateString()
                : '-'
            }}
          </td>
          <td class="py-4">{{ billing.amount }}</td>
          <td class="py-4">
            {{ new Date(billing.nextCycle).toLocaleDateString() }}
          </td>
          <td class="py-4">{{ billing.userId }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="text-base text-white">Nenhum dado encontrado.</div>
  </div>
</template>
<style scoped></style>
