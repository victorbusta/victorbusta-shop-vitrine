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

// function handleSubmit() {
//   orderSending.value = true;

//   let formData: any = {};
//   fields.value.forEach((field) => {
//     formData[field.id] = field.value;
//   });

//   formData = {...formData, ...{formats_id: []}}

//   checkoutStore.prints.forEach(print => {
//     formData.formats_id.push(print.format.id);
//   });

//   HTTP.post(props.apiEndPoint, formData).then(res => {
//     order.value = res.data;
//     orderSend.value = true;
//   });

//   checkoutStore.resetPrints();
// }
</script>

<template>

  <div v-if="!orderSending && !orderSend" style="width: 100%; display: flex; flex-direction: column; align-items: center;">
<!--   
    <form @submit.prevent="handleSubmit">
      <div class="formInput" v-for="field in fields" :key="field.id">
        <input :type="field.type" :id="field.id" v-model="field.value" :placeholder="field.label" required/>
        <hr>
      </div>

      <input class="order" type="submit" value="Commander">

    </form> -->

    <div class="bottomNav">
      <RouterLink to="/checkout" class="back">
        <ArrowIcon style="width: 32px; height: 32px;" />
      </RouterLink>
    </div>

  </div>

  <div v-else-if="orderSending && !orderSend">
    <LoadingIcon style="width: 64px; height: 64px;"/>
  </div>

  <div v-else-if="orderSending && orderSend">
    <h2>La commande n#{{ order.id }} est bien envoyée !</h2>
    <h3>Merci de bien vérifier ta boîte mail et de cliquer sur le lien pour valider la prise de commande</h3>
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


form > div {
  display: flex;
  flex-direction: column;
  margin: 8px 4px;
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
