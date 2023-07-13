<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64" >
    <circle id="base" cx="32" cy="32" r="32"/>
    <rect id="rect" x="21.8284" y="19" width="32" height="4" transform="rotate(45 21.8284 19)" />
    <rect id="rect" x="19" y="41.6274" width="32" height="4" transform="rotate(-45 19 41.6274)" />
  </svg>
</template>

<style scoped>
svg {
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}

#base {
    fill: var(--color-background);
  }

#rect {
  fill: var(--color-foreground);
  width: 0;
  animation: grow .2s ease-in-out 1 forwards;
}

@keyframes grow {
  from {
    width: 0;
  }
  to {
    width: 32px;
  }
}
</style>
