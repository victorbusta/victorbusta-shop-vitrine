import { defineStore } from 'pinia'
import type { OrderFormat } from '@/interfaces/print';

export const useCheckoutStore = defineStore({
  id: 'checkout',
  state: () => ({
    formats: [] as OrderFormat[],
  }),
  getters: {
    articleCount(state) {
      let articleCount = 0;

      state.formats.forEach(format => articleCount += format.qty);

      return articleCount;
    },
  },
  actions: {
    updateFormats(this: any, format: OrderFormat) {
      this.formats = this.formats.filter((_format: OrderFormat) => _format.format.id !== format.format.id);

      if (format.qty !== 0) this.formats.push(format);

      sessionStorage.setItem('formats', JSON.stringify(this.formats));
    },
    getStoredNb(this: any, formatId: number) {      
      return this.formats.filter((_format: OrderFormat) => _format.format.id === formatId)[0]?.qty;
    },
    initData() {
      // Check if there is data stored in sessionStorage
      const storedData = sessionStorage.getItem('formats');

      if (storedData) {
        // Parse the stored data and set it as the state value

        JSON.parse(storedData).forEach((format: OrderFormat) => {
          this.formats.push(format);          
        });
      }
    },
  },
})