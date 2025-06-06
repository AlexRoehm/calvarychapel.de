<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n();
const path = (route.path.endsWith('/')?route.path.slice(0,-1):route.path)


const { data: page } = await useAsyncData('page-' + route.path, async () => {
  const search = route.path.replace("/en","")+'_'+locale.value
  console.log(search)
  const t = await queryCollection('docs').path(search).first()
  if (!t) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }
  return t
})


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