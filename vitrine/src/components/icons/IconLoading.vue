<script setup lang="ts">
</script>

<template>
  <div>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<style scoped>
div {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;  
}

span {
  height: 15%;
  width: 15%;
  border-radius: 50%;
  background-color: var(--color-foreground);
  transform: translateY(100%);
}

span:nth-child(1) {
  animation: 1s ease-out rotate infinite;
}

span:nth-child(2) {
  animation: 1s ease-out .2s rotate infinite;

}

span:nth-child(3) {
  animation: 1s ease-out .4s rotate infinite;

}

span:nth-child(4) {
  animation: 1s ease-out .6s rotate infinite;
}

@keyframes rotate {
    0%{
      opacity: .5;
    }
    50%{
      opacity: 1;
    }
    100%{
      opacity: .5;
    }
  }
</style>
