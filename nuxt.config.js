// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  vite: {
    // @ts-ignore
    ssr: { noExternal: ["moment"] },
  },

  // css: ["vue-toast-notification/dist/theme-default.css"],

  modules: ["@nuxtjs/tailwindcss", "nuxt-vuefire"],
  css: ["vue-toast-notification/dist/theme-default.css"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Tenent Management System",
      meta: [
        {
          name: "description",
          content: "ButaAxom - Admin Dashboard",
        },
      ],
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&display=swap",
        },
      ],
    },
  },
  vuefire: {
    auth: {
      enabled: true,
    },
    config: {
      apiKey: "AIzaSyCiIyOYcT5KkcfJ_Vv6x8FT1KHne9diXeI",
      authDomain: "rentease-a00ae.firebaseapp.com",
      projectId: "rentease-a00ae",
      storageBucket: "rentease-a00ae.appspot.com",
      messagingSenderId: "448116008743",
      appId: "1:448116008743:web:a65acd4964395e65ac6b02",
    },
  },
});
