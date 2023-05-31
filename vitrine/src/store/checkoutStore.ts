import { defineStore } from 'pinia'
import type { CheckoutPrint } from '@/interfaces/print';

export const useCheckoutStore = defineStore({
  id: 'checkout',
  state: () => ({
    prints: [] as CheckoutPrint[],
  }),
  getters: {
    articleCount(state) {
      return state.prints.length;
    },
  },
  actions: {
    addPrint(this: any, print: CheckoutPrint) {
      this.prints.push(print);
      sessionStorage.setItem('prints', JSON.stringify(this.prints));
    },
    removePrint(this: any, print: CheckoutPrint) {
      let removed = false;
      this.prints.forEach((checkedPrint: CheckoutPrint, key: number) => {
        if (checkedPrint.format.id === print.format.id && !removed) {          
          this.prints.splice(key, 1);
          removed = true;
        }
      });
      sessionStorage.setItem('prints', JSON.stringify(this.prints));
    },
    checkStored(this: any, print: CheckoutPrint) {
      for (const _print in this.prints) {
        if (this.prints[_print].format.id === print.format.id) 
          return true;
      }
      return false;
    },
    getStoredNb(this: any, print: CheckoutPrint) {
      let stored = 0;
      this.prints.forEach((_print: CheckoutPrint) => {
        if (_print.format.id === print.format.id) 
          stored++;
      });
      return stored;
    },
    getStored(this: any) {
      const stored: CheckoutPrint[] = [];

      for (const printKey in this.prints) {
        let found = false;

        for (const storedKey in stored) {
          if (JSON.stringify(this.prints[printKey]) == JSON.stringify(stored[storedKey])) {
            found = true;
          }
        }

        if (!found) {
          stored.push(this.prints[printKey]);
        }
      }
      return stored;
    },
    resetPrints(this: any) {
      this.prints = [];
    },
    initData() {
      // Check if there is data stored in sessionStorage
      const storedData = sessionStorage.getItem('prints');

      if (storedData) {
        // Parse the stored data and set it as the state value

        JSON.parse(storedData).forEach((print: CheckoutPrint) => {
          this.prints.push(print);
          console.log(print);
          
        });
      }
    },
  },
})