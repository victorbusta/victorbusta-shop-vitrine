<script setup lang="ts">
import { useCheckoutStore } from '../store/checkoutStore';
import { ref } from 'vue'
import type { FormField } from '@/interfaces/form';
import FormComponent from '@/components/FormComponent.vue';

const checkoutFields: FormField[] = [
  { id: 'customer_firstname', label: 'Prénom', type: 'text', value: '' },
  { id: 'customer_lastname', label: 'Nom', type: 'text', value: '' },
  { id: 'customer_email', label: 'Email', type: 'email', value: '' },
  { id: 'shipping_adress', label: 'Adresse', type: 'text', value: '' },
  { id: 'shipping_postalcode', label: 'Code Postale', type: 'text', value: '' },
  { id: 'shipping_city', label: 'Ville', type: 'text', value: '' }
]
</script>

<template>
  <div class="checkout">
    <h1>Information client</h1>
    <hr style="width: 90%;">
    <FormComponent :fields="checkoutFields" apiEndPoint="order" />
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

hr {
  width: 80%;
  opacity: .5;
  margin-bottom: 16px;
}

h1 {
  width: calc(100% - 32px);
  border-radius: 0 0 16px 16px;
  color: var(--color-text);
  text-align: center;
  font-size: var(--font-size-big-small);
}
</style>
