<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M31.9927 20C25.3694 20.0039 21 25.375 21 32C21 38.5496 25.2705 43.8737 31.7675 43.9978C25.2474 43.8739 20 38.5498 20 32C20 25.375 25.3686 20.0039 31.9927 20Z"/>
  </svg>
</template>

<style scoped>
  svg {
    width: 64px;
    height: 64px;
    fill: var(--color-background);
    animation: spin .7s ease-out infinite;
    rotate: 22deg;
  }

  @keyframes spin {
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
</style>