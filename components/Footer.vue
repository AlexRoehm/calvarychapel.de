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
const year = ref(2025)

onMounted(() => {
  var now = new Date()
  year.value = now.getFullYear()
})
</script>SWqqV324qYKjKMxf#JaE