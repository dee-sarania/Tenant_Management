// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    port: 3001,
  },

  vite: {
    // @ts-ignore
    ssr: { noExternal: ["moment"] },
  },

  // css: ["vue-toast-notification/dist/theme-default.css"],

  modules: ["@nuxtjs/tailwindcss"],
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

  runtimeConfig: {
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      baseURL:
        process.env.NODE_ENV == "development"
          ? "http://localhost:8000"
          : process.env.BASE_URL,
    },
  },
});
