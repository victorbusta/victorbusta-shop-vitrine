<script setup lang="ts">
import IconArrow from '@/components/icons/IconArrow.vue';
import { useCheckoutStore } from '@/store/checkoutStore';
import { RouterLink } from 'vue-router'
import { HTTP } from '@/http';
import { ref } from 'vue';
import type { AxiosError, AxiosResponse } from 'axios';
import SucceededComponent from '@/components/SucceededComponent.vue'
import FailComponent from '@/components/FailedComponent.vue'

const checkoutStore = useCheckoutStore();
const orderRes = ref({} as AxiosResponse);
const orderErr = ref({} as AxiosError);
const suceeded = ref(false);
const failed = ref(false);

interface FormData {
  customer_firstname: string;
  customer_lastname: string;
  customer_email: string;
  shipping_adress: string;
  shipping_postalcode: string;
  shipping_city: string;
}

const formData: FormData = {
  customer_firstname: '',
  customer_lastname: '',
  customer_email: '',
  shipping_adress: '',
  shipping_postalcode: '',
  shipping_city: '',
};

function submitForm() {
  // Process the form data, e.g., send it to the server
  const form = document.getElementById('customer-info') as HTMLFormElement;

  if (form.checkValidity()) {
    handleForm();
  } else {
    form.reportValidity();
  }
}

function handleForm() {
  // Process the form data, e.g., send it to the server
  HTTP.post('/order', {...formData, formats: checkoutStore.articles})
  .then(res => {
    window.open(res.data)
    orderRes.value = res;
    suceeded.value = true;
    failed.value = false;
  })
  .catch(err => {
    orderErr.value = err;
    suceeded.value = false;
    failed.value = true;
  });
}
</script>

<template>
  <header>
    <h1>Informations Client</h1>
  </header>

  <main>

    <form id="customer-info" @submit.prevent="handleForm">

      <input required placeholder="Prénom" type="text" id="customer_firstname" v-model="formData.customer_firstname" />
      <input required placeholder="Nom" type="text" id="customer_lastname" v-model="formData.customer_lastname" />
      <input placeholder="Email" required type="email" id="customer_email" v-model="formData.customer_email" />
      <input placeholder="Adresse de livraison" required type="text" id="shipping_adress" v-model="formData.shipping_adress" />
      <input placeholder="Code Postale" required type="text" id="shipping_postalcode" v-model="formData.shipping_postalcode" />
      <input placeholder="Ville" required type="text" id="shipping_city" v-model="formData.shipping_city" />

    </form>
    <SucceededComponent v-if="suceeded" :res="orderRes"/>
    <FailComponent v-else-if="failed" :res="orderErr"/>

  </main>

  <footer>
    <RouterLink id="arrow" to="/checkout">
      <IconArrow />
    </RouterLink>

    <a @click="submitForm">
      <h1>Commander</h1>
      <h1>Commander</h1>
    </a>
  </footer>

</template>

<style scoped>
header > h1 {
  font-size: 24px;
  line-height: 16px;
  border-bottom: 1px solid var(--color-foreground);
}

main {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  padding: 8px 8px 4px 8px;
  width: 100%;
  border: 1px solid var(--color-foreground);
  background-color: var(--color-background);
  z-index: 1;
}

input {
  width: 100%;
  max-width: 256px;
  height: 32px;
  font-size: 16px;
  margin: 8px 0;
  padding: 8px;
  border: 0;
  border-bottom: 1px solid var(--color-foreground);
  /* background-color: var(--color-background); */
}

@media (min-width: 426px) {
  input {
    width: 100%;
  }
}

@media (min-width: 768px) {
  input {
    width: 80%;
  }
}

@media (min-width: 1023px) {
  /* input {
    width: 80%;
  } */
}


footer {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

footer > a {
  width: 204px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-foreground);
}

footer > a > h1 {
  position: absolute;
  font-size: 24px;
  line-height: 16px;
  padding: 16px;
  border: 1px solid var(--color-foreground);
  background-color: var(--color-foreground);
}

footer > a > h1:last-child {
  transform: translate(4px, -4px);
  transition: all .1s ease-in-out;
  background-color: var(--color-background);
}

footer > a:hover > h1:last-child {
  transform: translate(0);
}

#arrow {
  position: absolute;
  left: 16px;
  width: 32px;
  height: 32px;
}
</style>
