<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n();
var search = route.path.replace("/en","").replace(/\/+$/, '')+'_'+locale.value
const { data: page } = await useAsyncData(search, async () => {
  const t = await queryCollection('docs').path(search).first()
  if (!t) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }
  return t
}, { server: true })


const imgsrc = computed(() => '/img/' + page.value.image)
const imgclass = computed(() => (page.value?.layout == 'columns' ? 'w-32' : 'w-full'))

</script>

<template>
  <div>
  <PageLayout v-if="page" :layout="page?.layout">
    <div class="mb-10 mr-10">
      <a :href="imgsrc"><img v-if="page?.image" :src="imgsrc" :class="imgclass" class="object-scale-down" /></a>
    </div>
    <ContentRenderer class="mb-18" id="html-content" :value="page" />
  </PageLayout>
</div>
</template>