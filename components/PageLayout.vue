<template>
    <div>
      <Header :heroEnabled="true">
                <!-- Hero Section -->
        <section>

      <div class="flex justify-center items-center h-full text-center px-4">
        <div class="flex sm:flex-row flex-col items-center">
          <img src="~/assets/ccdove-1.png" class="h-20 w-20 sm:h-40 sm:w-40" />
          <div class="sm:pl-20">
        <h1 class="text-2xl md:text-5xl font-bold mb-4 mt-8">{{ $t('title') }}</h1>
        <p class="text-sm md:text-md max-w-2xl">
          {{ $t('sub') }}
        </p>

          </div>          
          
        </div>
      </div>
        </section>
      </Header>
      <Content class="text-dark bg-light">
        <slot />
      </Content>
    <Footer />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'PageLayout',
  props: {
    layout: String,
  }
})
</script>