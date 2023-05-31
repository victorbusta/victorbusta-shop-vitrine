<script setup lang="ts">
import { ref } from 'vue';
import type { PropType } from 'vue';
import type { FormField } from '@/interfaces/form';
import { useCheckoutStore } from '@/store/checkoutStore';
import ArrowIcon from './icons/IconArrow.vue';
import { HTTP } from '@/http';
import LoadingIcon from '@/components/icons/IconLoading.vue';

const checkoutStore = useCheckoutStore();

const props = defineProps({
  fields: {
    type: Array as PropType<FormField[]>,
    required: true,
  },
  apiEndPoint: {
    type: String,
    required: true,
  }
});

const fields = ref<FormField[]>(props.fields);
const order = ref();
const orderSend = ref(false);
const orderSending = ref(false);

function handleSubmit() {
  orderSending.value = true;

  let formData: any = {};
  fields.value.forEach((field) => {
    formData[field.id] = field.value;
  });

  formData = {...formData, ...{formats_id: []}}

  checkoutStore.prints.forEach(print => {
    formData.formats_id.push(print.format.id);
  });

  HTTP.post(props.apiEndPoint, formData).then(res => {
    order.value = res.data;
    orderSend.value = true;
  });

  checkoutStore.resetPrints();
}
</script>

<template>

  <div v-if="!orderSending && !orderSend" style="width: 100%; display: flex; flex-direction: column; align-items: center;">
  
    <form @submit.prevent="handleSubmit">
      <div class="formInput" v-for="field in fields" :key="field.id">
        <input :type="field.type" :id="field.id" v-model="field.value" :placeholder="field.label"/>
        <hr>
      </div> 
    </form>

    <hr style="width: 90%; margin: 16px 0;">

    <div class="bottomNav">
      <RouterLink to="/checkout" class="back">
        <ArrowIcon style="width: 32px; height: 32px;" />
      </RouterLink>
      <div class="order" @click="handleSubmit">
        <h2>commander</h2>
      </div>
    </div>   
    
  </div>

  <div v-else-if="orderSending && !orderSend">
    <LoadingIcon style="width: 64px; height: 64px;"/>
  </div>

  <div v-else-if="orderSending && orderSend">
    <h2>La commade n#{{ order.id }} est bien envoyé !</h2>
    <h3>Merci de bien vérifier votre boîte mail et de cliquer sur le lien pour valider la prise de commande</h3>
  </div>

</template>

<style scoped>
form {
  font-size: var(--font-size-medium);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.formInput {
  padding: 8px;
  border: solid 1px ;
}

input {
  font-size: var(--font-size-medium-medium);
  border: none;
  background-color: var(--color-background);
  width: 100%;
}

input:focus {
  outline: none;
}

hr {
  width: 100%;
  opacity: .5;
}

.order {
  padding: 0 8px;
  border: solid 1px var(--color-foreground);
}

.order:hover {
  color: var(--color-background);
  background-color: var(--color-foreground);
}

h2 {
  margin: 16px;
  padding: 8px;
  color: var(--color-foreground);
  font-size: var(--font-size-medium-medium);
  border: solid 1px var(--color-foreground);
  width: fit-content;
}

form > div {
  display: flex;
  flex-direction: column;
  margin: 8px 4px;
}

.bottomNav {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back {
  position: absolute;
  left: 0;
}
</style>
