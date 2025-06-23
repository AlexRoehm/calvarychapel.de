// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  experimental: {
    payloadExtraction: false // verhindert _payload.json preload
  },
  devtools: { enabled: false },
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/ui',
    '@nuxtjs/i18n'
  ],
    i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'de',
    locales: [
      { 
        code: "en", 
        file: "en.json", 
        language: 'en-US',
        name: "English"
      },
      {
        code: "de",
        file: "de.json", 
        language: 'de-DE',
        name: "Deutsch"
      }
    ],
    lazy: false,
    langDir: './locales',
  },
  css: ['~/assets/css/main.css', 'maplibre-gl/dist/maplibre-gl.css' ]
})