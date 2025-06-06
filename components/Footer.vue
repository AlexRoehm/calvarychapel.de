<template>
  <div class="z-20 bg-accent text-light flex justify-between px-4 sm:px-30 py-8 text-xs sm:text-sm">
    <div>
      &copy; Calvary Chapel Freiburg, {{ year }}
  </div>
    <NuxtLink class="pl-12" to="impressum">
        Impressum
    </NuxtLink>
  
  </div>
</template>

<script lang="ts" setup>
var now = new Date()
const year = ref(now.getFullYear())
</script>