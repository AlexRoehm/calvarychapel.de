<script lang="ts" setup>
import { CHURCHES } from '../content/gemeinden'
const selectedId = ref("0")

const searchText = ref("")

// Computed Filter
const filteredItems = computed(() => {
  console.log(searchText.value)
  if (!searchText.value.trim()) return CHURCHES
  const term = searchText.value.toLowerCase()
  return CHURCHES.filter((item) =>
    item.name.toLowerCase().includes(term)
  )
})
</script>

<template>
  <div>
    <PageLayout>
      <div class="flex flex-col items-center my-10">
        <h1 class="text-3xl font-extrabold">{{ $t("Gemeinden") }}</h1>
        <p class="my-8 px-10 text-md">{{ $t("GemeindenIntro") }}</p>
  <div class="container mx-auto px-4 py-6">
    <ChurchMap :churches="filteredItems" :selected-id="selectedId" />
    
<!--     <ul class="mt-6 space-y-4">
      <li 
        v-for="church in CHURCHES"
        :key="church.id"
        class="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer"
        @click="selectedId = church.id"
      >
        <h3 class="font-bold text-lg">{{ church.name }}</h3>
        <p>{{ church.city }} – {{ church.address }}</p>
        <a :href="'https://www.google.com/maps?q='+church.latitude+','+church.longitude" target="_blank" class="text-blue-500 hover:underline">
          Visit website
        </a>
      </li>
    </ul> -->

    <Search class="absolute -top-12" @filter="searchText = $event"/>
        <div class="w-full mt-10">
          <div v-for="post in filteredItems" :key="post.id">
            <Card :post="post" @click="selectedId = post.id"/>
          </div>
        </div>
  </div>         
      </div>
    </PageLayout>
  </div>
</template>