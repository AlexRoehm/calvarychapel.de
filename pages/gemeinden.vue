<script lang="ts" setup>
import { CHURCHES } from '../content/gemeinden'
</script>

<template>
  <div>
    <PageLayout>
      <div class="flex flex-col items-center my-10">
        <h1 class="text-3xl font-extrabold">{{ $t("Gemeinden") }}</h1>
        <p class="my-8 px-10 text-md">{{ $t("GemeindenIntro") }}</p>
        <div class="w-full">
          <div v-for="post in CHURCHES">
            <Card :post="post" />
          </div>
        </div>
      </div>
    </PageLayout>
  </div>
</template>