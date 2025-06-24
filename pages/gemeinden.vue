<script lang="ts" setup>
import { CHURCHES } from '../content/gemeinden'
const selectedId = ref("0")

const searchText = ref("")

const visibleChurches = ref([])

// Computed Filter
const filteredItems = computed(() => {
  if (visibleChurches.value.length>0 && searchText.value == "") return visibleChurches.value
  if (!searchText.value.trim()) return CHURCHES
  const term = searchText.value.toLowerCase()
  return CHURCHES.filter((item) =>
    item.name.toLowerCase().includes(term)
  )
})

// Computed Filter
const filteredMap = computed(() => {
  if (!searchText.value.trim()) return CHURCHES
  const term = searchText.value.toLowerCase()
  return CHURCHES.filter((item) =>
    item.name.toLowerCase().includes(term)
  )
})

const selectPost = (post) => {
  visibleChurches.value = [post]
  searchText.value = ""
  selectedId.value = post.id
}

</script>

<template>
  <div>
    <PageLayout>
      <div class="flex flex-col items-center my-10">
        <h1 class="text-3xl font-extrabold">{{ $t("Gemeinden") }}</h1>
        <p class="my-8 px-10 text-md">{{ $t("GemeindenIntro") }}</p>
  <div class="container mx-auto px-4 py-6">
    <ChurchMap :churches="filteredMap" :selected-id="selectedId" @visibleChanged="visibleChurches = $event"/>   
    <Search class="absolute -top-12" @filter="searchText = $event"/>
        <div class="w-full mt-10">
          <div class="flex justify-center items-center" v-for="post in filteredItems" :key="post.id">
            <Card class="mt-4"  :post="post" @click="selectPost(post)"/>
          </div>
        </div>
  </div>         
      </div>
    </PageLayout>
  </div>
</template>