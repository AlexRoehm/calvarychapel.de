<template>
  <div>
    <!-- Header with Logo and Menu -->
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
    <Content class="bg-light">
    <ContentRenderer v-if="page" class="text-dark mb-18" id="html-content" :value="page" />
    </Content>
    <Footer/>
  </div>
</template>

<script setup>
const { locale } = useI18n();

const getStyle = (slug) => {
  return (slug == '/' ? 'bg-gray-600' : '')
}

const path = '/start_'+locale.value
const { data: page } = await useAsyncData('page-' + path, async () => {
  const t = await queryCollection('docs').path(path).first()
  if (!t) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }
  return t
})
</script>