import { defineStore } from 'pinia'

export const useChartDataStore = defineStore({
  id: 'chartData',
  state: () => ({
    data: null
  }),
  actions: {
    setData(data: any) {
      this.data = data
    }
  },
  getters: {
    getData(state): any {
      return state.data
    }
  }
})
