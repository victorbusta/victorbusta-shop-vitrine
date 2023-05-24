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
      // sessionStorage.setItem('checkout', JSON.stringify(this.prints));
    },
    removePrint(this: any, print: CheckoutPrint) {
      this.prints.forEach((checkedPrint: CheckoutPrint, key: number) => {
        if (checkedPrint.format.id === print.format.id) {          
          this.prints.splice(key, 1);
        }
      });
      // sessionStorage.setItem('prints', JSON.stringify(this.prints));
    },
    checkStored(this: any, print: CheckoutPrint) {
      for (const _print in this.prints) {
        if (this.prints[_print].format.id === print.format.id) 
          return true;
      }
      return false;
    },
    initData() {
      // Check if there is data stored in sessionStorage
      // const storedData = sessionStorage.getItem('checkout');

      // if (storedData) {
      //   // Parse the stored data and set it as the state value

      //   // this.prints = JSON.parse(storedData);
      // }
    },
  },
})