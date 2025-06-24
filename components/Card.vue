<template>
<div v-if="post" class="bg-white rounded-2xl shadow-md p-6 max-w-3xl w-full flex flex-col sm:flex-row justify-between gap-4">
  <!-- Left Column: Main Info -->
  <div class="flex-1 space-y-2">
    <!-- Title and City -->
    <div>
      <h2 class="text-xl font-bold text-gray-800">{{ post.name }}</h2>
      <div class="text-sm text-gray-500">{{ post.city }}</div>
    </div>

    <!-- Info Rows -->
    <div class="text-sm text-gray-700">
      <span class="font-semibold">{{ $t('Pastor') }}:</span> {{ post.pastor }}
    </div>

    <div class="text-sm text-gray-700">
      <span class="font-semibold">{{ $t('Adresse') }}:</span> {{ post.address }}
    </div>

    <div class="text-sm text-gray-700">
      <span class="font-semibold">{{ $t('Gottesdienste') }}:</span><br />
      <span class="block mt-1 text-gray-600">
        {{ godis }}
      </span>
    </div>

    <div class="text-sm text-gray-700">
      <span class="font-semibold">{{ $t('Kontakt') }}:</span><br />
      <a :href="'mailto:'+post.email" class="text-blue-600 hover:underline">{{post.email}}</a><br />
      <a :href="'tel:'+post.phone" class="text-blue-600 hover:underline">{{ post.phone }}</a>
    </div>
  </div>

  <!-- Right Column: Links with right-aligned icons -->
  <div class="flex flex-col justify-start gap-2 text-sm text-gray-700 pt-[1.375rem] text-right">
    <a v-if="post.website!=''" :href="'https://'+post.website" target="_blank" class="flex items-center justify-between gap-2 hover:text-blue-600">
      <span>{{ $t('Webseite') }}</span>
      <!-- Globe Icon -->
      <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.21 0 4 4.03 4 9s-1.79 9-4 9-4-4.03-4-9 1.79-9 4-9z"/>
        <path stroke-linecap="round" stroke-linejoin="round" d="M2 12h20"/>
      </svg>
    </a>
    <a v-if="podcast!=''" :href="podcast" target="_blank" class="flex items-center justify-between gap-2 hover:text-blue-600">
      <span>{{ $t('Podcast') }}</span>
      <!-- Mic Icon -->
      <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 1v14m0 0a4 4 0 0 0 4-4V7a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4zm0 4v2m-4 0h8"/>
      </svg>
    </a>
    <a v-if="stream!=''" :href="stream" target="_blank" class="flex items-center justify-between gap-2 hover:text-blue-600">
      <span>{{ $t('Live Stream') }}</span>
      <!-- Video Icon -->
      <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14m-9 2h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2z"/>
      </svg>
    </a>
    <a v-if="post.gmaps!=''" :href="post.gmaps"  target="_blank" class="flex items-center justify-between gap-2 hover:text-blue-600">
      <span>{{ $t('Karte') }}</span>
      <!-- Map Pin Icon -->
      <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 22s8-5.5 8-11a8 8 0 1 0-16 0c0 5.5 8 11 8 11z"/>
      </svg>
    </a>
  </div>
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

    function addHttp(url){
      return (url && url.startsWith("http") || url==""? url : "https://" + url)
    }
    const link = ref(addHttp(props.post.website))
    const podcast = ref("")
    const stream = ref("")
    const godis = ref(locale.value == "en" && props.post.services ? props.post.services : props.post.godis)

    onMounted(() => {
      podcast.value = addHttp(props.post.podcast)
      stream.value = addHttp(props.post.stream)
    })
    return {
      link, godis, podcast, stream
    }
  }
})
</script>
