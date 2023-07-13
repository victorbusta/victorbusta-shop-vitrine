<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64">
    <circle id="base" cx="32" cy="32" r="32"/>
    <rect id="rect" class="ext" x="16" y="40" width="24" height="4"/>
    <rect id="rect" class="int" x="16" y="30" width="32" height="4"/>
    <rect id="rect" class="ext" x="24" y="20" width="24" height="4"/>
  </svg>
</template>

<style scoped>
  svg {
    position: fixed;
    bottom: 0;
    right: 0;
    cursor: pointer;
  }

  #base {
    fill: var(--color-background);
  }

  #rect {
    fill: var(--color-foreground);
    width: 0%;
  }

  .int {
    animation: grow2 .2s ease-in-out 1 forwards;
  }

  .ext {
    animation: grow1 .2s ease-in-out 1 forwards;
  }

  @keyframes grow1 {
    from {
      width: 0%;
    }
    to {
      width: 24px;
    }
  }

  @keyframes grow2 {
    from {
      width: 0%;
    }
    to {
      width: 32px;
    }
  }
</style>
