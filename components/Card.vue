<template>
  <div v-if="post" class="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-6 mb-10">
    <a :href="link">
      <div class="flex flex-col h-full">
        <h2 class="text-xl font-semibold mb-2!=''">{{ post.name }}</h2>
        <hr />
        <div class="mt-2 text-xs sm:text-sm">
          <div class="mt-2" v-for="row in rows" :key="row.label">
            <div class="grid grid-cols-3 gap-1 mt-1 leading-relaxed">
              <div>{{ $t(row.label) }}:</div>
              <div class="col-span-2">{{ row.content }}</div>
            </div>
          </div>
          <div class="mt-2">
            <a v-if="podcast!=''" :href="podcast">{{ $t("Podcast") }}</a>
          </div>
          <div class="mt-2">
            <a v-if="stream!=''" :href="stream">{{ $t("Live Stream") }}</a>            
          </div>
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

    function addHttp(url){
      return url.startsWith("http")&&url==""? url : "https://" + url
    }
    const link = ref(addHttp(props.post.website))
    const podcast = ref("")
    const stream = ref("")
    const godis = ref(locale.value == "en" && props.post.services ? props.post.services : props.post.godis)

    const rows = computed(() => {
      var result = []
      if (props.post.pastor != '') result.push({ label: "Pastor", content: props.post.pastor })
      if (props.post.website != '') result.push({ label: "Webseite", content: props.post.website })
      if (props.post.address != '') result.push({ label: "Adresse", content: props.post.address })
      if (props.post.phone != '') result.push({ label: "Telefon", content: props.post.phone })
      if (props.post.email != '') result.push({ label: "Email", content: props.post.email })
      if (godis != '') result.push({ label: "Gottesdienste", content: godis })
      return result
    })
    onMounted(() => {
      podcast.value = addHttp(props.post.podcast)
      stream.value = addHttp(props.post.stream)
    })
    return {
      link, godis, rows, podcast, stream
    }
  }
})
</script>
