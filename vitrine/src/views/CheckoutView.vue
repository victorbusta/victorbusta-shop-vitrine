<script setup lang="ts">
import { useCheckoutStore } from '../store/checkoutStore';
import { ref } from 'vue'
import CheckoutableCard from '@/components/CheckoutableCard.vue';
import type { FormField } from '@/interfaces/form';
import { RouterLink } from 'vue-router'

const checkoutStore = useCheckoutStore();

const checkoutPrints = ref(checkoutStore.prints); 

const checkoutFields: FormField[] = [
  { id: 'name', label: 'Name', type: 'text', value: '' },
  { id: 'email', label: 'Email', type: 'email', value: '' },
  { id: 'message', label: 'Message', type: 'textarea', value: '' }
]
</script>

<template>
  <div class="checkout">
    <h1>Panier</h1>
    <hr style="width: 90%;">
    <div class="checkouts">


      <div class="checkoutAble" v-for="print in checkoutPrints" :key="print">
        <CheckoutableCard :print="print" apiEndPoint="order" />
        <hr>
      </div>

      <RouterLink to="/customer" v-if="checkoutPrints.length !== 0">
        <h2>Passer commande</h2>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.checkout {
  width: 90%;
  height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px 16px 0 0;
  overflow: scroll;
}

.checkouts {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.checkoutAble {
  grid-column: 1;
  width: 90%;
}

hr {
  width: 100%;
  opacity: .5;
}

h1 {
  width: calc(100% - 32px);
  border-radius: 0 0 16px 16px;
  color: var(--color-text);
  text-align: center;
  font-size: var(--font-size-big-small);
}

h2 {
  margin: 16px;
  padding: 8px;
  color: var(--color-foreground);
  font-size: var(--font-size-medium-medium);
  border: solid 1px var(--color-foreground);
}

h2:hover {
  color: var(--color-background);
  background-color: var(--color-foreground);
}
</style>
