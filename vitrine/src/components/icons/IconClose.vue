<script setup lang="ts">
const props = defineProps({
  dark: {
    type: Boolean,
    required: true,
  }
});
</script>

<template>
  <div id="cross">
    <span :class="props.dark ? 'sideDark' : 'side'"></span>
    <span :class="props.dark ? 'sideDark' : 'side'"></span>
  </div>
</template>

<style scoped>
  div {
    width: 64px;
    height: 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  span {
    position: absolute;
    width: 100%;
    height: 10%;
    border-radius: 4px;
  }

  .side {
    background-color: var(--color-background);
  }

  .sideDark {
    background-color: var(--color-foreground);
  }

  span:nth-child(1) {
    rotate: 45deg;
  }

  span:nth-child(2) {
    rotate: -45deg;
  }
</style>
  