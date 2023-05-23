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
  <h1>Information client</h1>
  <hr>
  <FormComponent :fields="checkoutFields" apiEndPoint="order" />
</template>

<style scoped>
hr {
  width: 80%;
  opacity: .5;
  margin-bottom: 16px;
}

h1 {
  width: calc(100% - 32px);
  color: var(--color-text);
  text-align: center;
  font-size: var(--font-size-big-small);
}
</style>
