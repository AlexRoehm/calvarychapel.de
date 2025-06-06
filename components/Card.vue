<template>
    <div class="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-6 mb-10">
    <a :href="link(post.website)">
      <div class="flex flex-col h-full">
        <h2 class="text-xl font-semibold mb-2">{{ post.name }}</h2>
        <hr/>
          <div class="grid grid-cols-3 gap-1 text-xs sm:text-sm mt-4 leading-relaxed">
              <div v-if="post.pastor">{{ $t("Pastor") }}: </div><div class="col-span-2" v-if="post.pastor">{{ post.pastor }}</div>
              <div v-if="post.website">{{ $t("Webseite") }}: </div><div class="col-span-2" v-if="post.website"><a :href="post.website">{{ post.website }}</a></div>
              <div v-if="post.address">{{ $t("Adresse") }}:</div><div class="col-span-2" v-if="post.address">{{ post.address }}</div>
              <div v-if="post.phone">{{ $t("Telefon") }}:</div><div class="col-span-2" v-if="post.phone">{{ post.phone }}</div>
              <div v-if="post.email">{{ $t("Email") }}:</div><div class="col-span-2" v-if="post.email"><a :href="'mailto://'+post.email">{{ post.email }}</a></div>
              <div v-if="godis">{{ $t("Gottesdienste") }}:</div><div class="col-span-2" v-if="godis">{{ godis }}</div>
              <div  class="col-span-3" v-if="post.podcast"><a :href="post.podcast">{{ $t("Podcast") }}</a></div>
              <div class="col-span-3" v-if="post.stream"><a :href="post.podcast">{{ $t("Live Stream") }}</a></div>
          </div>
        </div>
      </a>

  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Card',
  props: {
    post: Object,
  },
  setup(props, ctx) {
    const { locale } = useI18n();
    function link(url) {
      if (url.startsWith("http")) return url;
      return "https://"+url
    }
    return {
      link: link,
      godis: (locale.value=="en" && props.post.services?props.post.services:props.post.godis)
      }
  }
})
</script>
