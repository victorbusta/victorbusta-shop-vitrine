<script setup lang="ts">
import type { FormField } from '@/interfaces/form';
import ArrowIcon from '@/components/icons/IconArrow.vue';
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

    <div class="bottomNav">
      <RouterLink to="/checkout" class="back">
        <ArrowIcon style="width: 32px; height: 32px;" />
      </RouterLink>
      <RouterLink to="/customer">
        <input class="order" type="submit" value="Commander">
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
}

hr {
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

.order {
  height: fit-content;
  width: fit-content;
  padding: 8px;
  font-size: var(--font-size-medium-medium);
  border: solid 1px var(--color-foreground);
  background-color: var(--color-background);
  color: var(--color-foreground);
  width: fit-content;
  font-family: 'CopperPlate Goth';
}

.order:hover {
  color: var(--color-background);
  background-color: var(--color-foreground);
}

.back {
  position: absolute;
  left: 0;
}
.bottomNav {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 4px;
}
</style>
