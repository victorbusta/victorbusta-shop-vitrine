<template>
  <div id="logo">
    <h1>Van</h1>
    <h1>Butsele</h1>
    <h1>Diane</h1>
  </div>
</template>

<style scoped>

#logo {
  width: fit-content;
  display: flex;
}

h1 {
  font-family: 'CopperPlate Goth';
  color: var(--color-foreground);
  margin-left: 8px;
}

@media (max-width: 768px) {
  h1 {
    font-size: 24px;
  }

  h1:not(:first-child) {
    margin-left: 6px;
  }
}

@media (max-width: 425px) {
  #logo {
    flex-direction: column;
  }

  h1 {
    font-size: 16px;
    margin-left: 8px;
    line-height: 14px;
  }
}
</style>