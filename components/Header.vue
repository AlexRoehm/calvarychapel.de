<template>
  <div>
    <!-- With hero image -->
    <section class="relative h-[40vh] md:h-[60vh] overflow-hidden text-light bg-accent">
      <div>
        <video autoplay muted loop playsinline class="z-20 absolute w-full h-full object-cover">
          <source src="~/assets/church_hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    <transition name="fade">
      <div v-show="!hero"> <!-- Nav Bar for page without hero video -->
        <div class="absolute z-40 fixed top-0 left-0 right-0 h-20 bg-accent">
        </div>
        <div class="absolute z-40 fixed top-6 left-5">
          <img src="~/assets/ccdove-1.png" class="w-8 h-8" />
        </div>
      </div>
      </transition>
      <header class="absolute fixed z-40 top-4 sm:top-6 right-5 w-full flex justify-end">
        <div class="invisible md:visible">
          <!-- Desktop Menu -->
          <nav class="hidden mt-2 mr-4 md:flex space-x-6 font-extrabold uppercase text-xs tracking-wider">
            <div v-for="item in menu" class="flex flex-col">
              <a :href="item.slug">{{ item.text }}</a>
              <div :class="getStyle(item.slug)" class="h-1 mt-1"></div>
            </div>
          </nav>
        </div>
        <!-- Language -->
        <div class="flex flex-row items-center flex-nowrap pl-2">
          <button data-testid="show-locale-dropdown" @click="toggle('language')"
            class="inline-flex items-center font-extrabold uppercase text-xs tracking-wider sm:gap-1" type="button">
            <svg class="w-4 h-4 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9">
              </path>
            </svg>
            <div class="invisible w-0 text-xs sm:w-14 sm:visible">{{ $t(locale) }}</div>
            <svg class="invisible w-4 h-4 sm:visible" aria-hidden="true" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div v-show="showDropdown" class="absolute z-40 bg-dark border-2 rounded shadow top-12 right-6 w-44">
            <ul class="py-1 text-sm">
              <li class="p-1" v-for="navLocale in locales.map((item) => item.code) as string[]" :key="navLocale">
                <NuxtLink v-if="otherLanguagesNav.hasOwnProperty(navLocale)" :data-testid="'switch-locale-' + navLocale"
                  :to="otherLanguagesNav[navLocale]" @click="localeChanged(navLocale)">
                  {{ $t(navLocale) }}
                </NuxtLink>
                <div v-else>{{ $t(navLocale) }}</div>
              </li>
            </ul>
          </div>
        </div>
        <!-- Mobile Menu Button -->
        <button id="menuBtn" class="visible md:invisible z-50 mt-1" @click="toggle('menu')">
          <Icon name="ci:hamburger-lg" />
        </button>

      </header>
      <div class="relative z-30 top-20 sm:top-56">
        <slot/>
      </div>

    </section>
    <transition name="slide">
        <!-- Mobile Menu -->

      <div v-show="!hidden" class="fixed right-0 top-0 z-40 h-full w-full bg-dark">
        <div class="flex fixed w-full top-0 left-0 h-12 justify-between items-center px-5 py-3 mt-1">
          <img src="~/assets/ccdove-1.png" class="w-8 h-8 " />
          <div class="text-sm">
            {{ $t('title') }}
          </div>
          <Icon class="mt-1" name="ci:hamburger-lg" />
        </div>
        <div class="fixed right-0 top-20 z-10 flex flex-col h-full min-w-4/6">
          <a v-for="item in menu" :href="item.slug" :class="getStyle(item.slug) + ' px-4 py-2 my-2 mx-2 border-1'">{{ item.text
            }}</a>
            
        </div>
      </div>
    </transition>
  </div>

</template>
<script lang="ts">
import { DE, EN } from '~/content/menu'
export default defineComponent({
  name: 'Header',
  props: {
    heroEnabled: {
      type: Boolean,
      default: false
    },
    otherLanguagesNav: {
      type: Object,
      default: { de: '/', en: '/en' }
    }
  },
  setup(props, ctx) {
    const route = useRoute()
    const { locale, locales, setLocale } = useI18n();
    const scroll = ref(0)
    const width = ref(0)
    var itWasMe = '';
    const showDropdown = ref(false)
    const hidden = ref(true)
    
    const menu = computed(() => (locale.value=="en"?EN:DE))

    const scrolled = (ev) => {
      scroll.value = ev.target.scrollingElement.scrollTop
      hidden.value = true
    }

    const resize = () => {
      width.value = window.innerWidth
    }


    const hero = computed(() => props.heroEnabled && scroll.value < 20)

    const navHeight = computed(() => {
      if (width.value < 640)
        return "h-10"
      if (scroll.value > 20)
        return "h-12"
      else if (scroll.value > 10)
        return "h-14"
      else if (scroll.value > 4)
        return "h-16"
      return "h-20"
    })

    const getStyle = (slug) => {
      return (route.path.endsWith(slug) ? 'font-extrabold' : '')
    }

    onMounted(() => {
      document.addEventListener('click', closeIfClickedOutside);
      document.addEventListener('scroll', scrolled);
      window.addEventListener('resize', resize);
      resize()
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', closeIfClickedOutside);
      document.removeEventListener('scroll', scrolled);
      window.removeEventListener('resize', resize);
    })
    function hide() {
      showDropdown.value = false
      hidden.value = true
      ctx.emit('closeAll')
    }
    function closeIfClickedOutside(event: any) {
      if (
        event.target.name === 'language_id' ||
        event.target.nodeName === 'OPTION' ||
        event.target.nodeName === 'LI'
      )
        return;
      if (itWasMe === '') {
        hide();
      }
      itWasMe = '';
    }
    function toggle(what: string) {
      itWasMe = what;
      if (what == 'language') {
        showDropdown.value = !showDropdown.value;
        hidden.value = true
      }
      else {
        hidden.value = !hidden.value
        showDropdown.value = false
        ctx.emit('menuButtonClick')
      }
    }
    function localeChanged(locale: string) {
      ctx.emit('localeChanged', locale);
    }
    return {
      navHeight,
      showDropdown,
      localeChanged,
      hidden,
      toggle,
      locale,
      locales,
      menu,
      hero,
      getStyle
    }
  }
})
</script>

<style>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>