export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }, 
  devServer: { host: '0.0.0.0' },
  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
  },
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: '/ichera087site/',
    buildAssetsDir: 'assets',
    head: {
      title: 'iCHera087', 

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }, 

        {
          name: 'description', 
          content: 'Full-stack разработка веб-приложений любой сложности. Создаю быстрые, адаптивные и современные сайты на Vue.js и Nuxt.js, которые решают бизнес-задачи. Гарантирую чистый код, соблюдение сроков и поддержку после запуска.' 
        },

        { 
          name: 'keywords', 
          content: 'frontend, vue.js, nuxt, typescript, разработка сайтов, веб-разработчик, spa, ssr, nuxt, nuxt.js, vue, vue, backend, front-end, back-end, js, ts, закать сайт рб, заказ сайта рб, создание сайта' 
        },

        { property: 'og:title', content: 'Разработка сайтов под ключ в РБ и РФ' },
        { property: 'og:description', content: 'Full-stack разработка веб-приложений любой сложности. Создаю быстрые, адаптивные и современные сайты на Vue.js и Nuxt.js, которые решают бизнес-задачи. Гарантирую чистый код, соблюдение сроков и поддержку после запуска.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'http://ichera087.site' }, 
        { property: 'og:image', content: 'http://ichera087.site/favicon.ico' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
