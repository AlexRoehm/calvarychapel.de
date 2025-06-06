<template>
  <UApp class="font-sans text-light">
      <NuxtPage />
  </UApp>
</template>
<style>
.page-enter-active {
  transition: all 0.4s;
}
.page-enter-from {
  opacity: 0;
  filter: blur(1rem);
}
</style>
