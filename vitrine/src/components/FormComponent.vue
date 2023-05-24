<script setup lang="ts">
import { ref } from 'vue';
import type { PropType } from 'vue';
import type { FormField } from '@/interfaces/form';
import { useCheckoutStore } from '@/store/checkoutStore';
import ArrowIcon from './icons/IconArrow.vue';
import { HTTP } from '@/http';

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

function handleSubmit() {
  let formData: any = {};
  fields.value.forEach((field) => {
    formData[field.id] = field.value;
  });

  formData = {...formData, ...{formats_id: []}}

  checkoutStore.prints.forEach(print => {
    formData.formats_id.push(print.format.id);
  });

  console.log(JSON.stringify(formData));
}
</script>

<template>

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
      <h2>Prise de commande</h2>
    </div>
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
  font-size: var(--font-size-medium);
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