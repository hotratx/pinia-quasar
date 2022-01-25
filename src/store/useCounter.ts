import { defineStore } from 'pinia';

export const useStoreCounter = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      counter: 2,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
  getters: {
    doubleCounter: (state) => state.counter * 2
  },
  actions: {
    addOne() {
      this.counter++;
    }
  }
});
