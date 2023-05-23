<script setup lang="ts">
</script>

<template>
  <div>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
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
  justify-content: center;
  align-items: center;  
}

span {
  position: absolute;
  height: 25%;
  width: 10%;
  border-radius: 8px;
  background-color: var(--color-foreground-mute);
  transform: translateY(100%);
}

span:nth-child(1) {
  animation: 3s ease-out rotate infinite;
}

span:nth-child(2) {
  animation: 3s ease-out .2s rotate infinite;

}

span:nth-child(3) {
  animation: 3s ease-out .4s rotate infinite;

}

span:nth-child(4) {
  animation: 3s ease-out .6s rotate infinite;
}

span:nth-child(5) {
  animation: 3s ease-out .8s rotate infinite;
}

span:nth-child(6) {
  animation: 3s ease-out 1s rotate infinite;
}

span:nth-child(7) {
  animation: 3s ease-out 1.2s rotate infinite;
}

span:nth-child(8) {
  animation: 3s ease-out 1.4s rotate infinite;
}

@keyframes rotate {
    0%{
      rotate: 0;
    }
    33%{
      rotate: 360deg;
    }
    100%{
      rotate: 360deg;
    }
  }
</style>