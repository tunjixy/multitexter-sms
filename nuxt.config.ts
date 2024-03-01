// https://www.npmjs.com/package/vite-svg-loader
import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'en',
      },
      viewport: 'width=device-width, initial-scale=1',
      title: 'Best Bulk SMS Service in Nigeria | Multitexter',
      meta: [
        {
          name: 'description',
          content:
            "Buy and send bulk SMS on Nigeria and Africa's reliable text messaging provider, platform, portal and gateway. Best free and premium bulk SMS @ 1 unit per SMS.",
        },
        { name: 'msapplication-TileColor', content: '#40c2f3' },
        { name: 'theme-color', content: '#40c2f3' },
        {
          name: 'google-site-verification',
          content: 'Qnew9MfPLuroCdyTkh09XrdlNs8G5ZNWLOXMLz475w4',
        },
        {
          name: 'googlebot',
          content: 'index,follow',
        },
        {
          name: 'keywords',
          content:
            'bulk sms in nigeria with android app, bulk message,bulk sms free online,bbn sms,smslive247, smartsms, smartsmssolutions, rapidsms,Bulk SMS, Buy Bulk SMS, Bulk SMS In Nigeria, A2P Provider, Free SMS, SMS API, HTTP XML API, P2P API, SMPP, One time Password, OTP, Sender ID registration, Sender name, Mass SMS in Nigeria, Send SMS, Buy SMS online, Buy SMS with ATM Card, Web2SMS, text messaging, bulksms,bulk sms, bulk sms provider,bulk SMS service, How to Send Bulk SMS, cheap bulk sms, bulk sms nigeria,multitexter bulk sms, send free bulk sms in nigeria, how to send bulk sms free from internet to mobile, bulk sms nigeria, free bulk sms sending site, 24/7 bulk sms, 9mobile bulk sms, best bulk sms best bulk sms in nigeria, best bulk sms provider, best bulk sms provider in nigeria, best bulk sms providers, best bulk sms service in nigeria, best bulk sms service provider, free bulk sms site, bulk sms gateway in nigeria, bulk sms providers, bulk sms free trial, free bulk sms site in nigeria,free bulk sms software from pc to mobile,free bulk sms service from internet to mobile,airtel bulk sms,bulk sms business in nigeria,send bulk sms free online,bulk sms clickatell,mtn nigeria bulk sms,cheapest bulk sms in nigeria,bulk sms providers in nigeria,bulk sms in nigeria,send free bulk sms online,etisalat bulk sms,bulk sms,international bulk sms provider,send bulk sms,bulk sms online,bulk sms sites,free bulk sms,bulk sms site in nigeria,free bulk sms service in nigeria,free bulk sms sending in nigeria,sending free bulk sms,bulk sms reseller in nigeria,free bulk sms in nigeria,bulk sms device,bulk sms free online,glo bulk sms,mtn bulk sms,free bulk sms service,cheapest bulk sms,send bulk sms in nigeria,bulk sms free,nigerian bulk sms,free unlimited bulk sms service,how to send bulk sms from gmail,send bulk sms online free,bulk sms sites in nigeria,how to send bulk sms,bulk sms service, bulk sms service provider,bulk sms provider, bulk sms services, sms marketing, sms service provider, bulk sms marketing, sms bulk, bulk sms providers,sms provider, bulk sms company,bulk sms service providers,bulk sms gateway,sms gateway,bulk sms reseller provider,sms service,bulk sms reseller,sms providers,cheapest bulk sms service provider,bulk sms login,bulk email service provider,sms reseller,cheapest bulk sms provider,cheap bulk sms service provider,bulk sms price,best bulk sms email to sms, sms api, sms service providers, transactional sms, sms gateway provider, cheap bulk sms provider, bulk sms solutions, bulk sms gateway provider, promotional sms, voice sms service provider,voice sms service, sms marketing services, sms blast, mass sms service, cheapest bulk sms, cheap sms,buy sms, cheap bulk sms service, bulk sms, bulk sms companies, bulk sms services provider, international bulk sms, missed call service provider, reseller bulk sms, send sms bulk, sms broadcast, sms company, sms provider company, smsbulk, web sms, bulk voice call, cheap sms gateway, cheapest sms api, best bulk sms service provider, bulk sms marketing service, bulk sms packages, bulk sms provider company, business sms, bulksmsgateway, best bulk sms provider, bulk sms software, bulk sms site, bulk sms service provider indore, cheapest sms service,gateway sms,international sms gateway provider,mass sms, online bulk sms, sms portal, sms solution, transaction sms, voice call services,website development, bulksms service, bulksmsservice, best bulk sms service, bulk sms, bulk sms, bulk email, bulk email service, bulk messaging, bulk sms package,bulk sms portal, bulk sms platform, sms platform,sms gateway providers, sms gateway pricing, sms gateway price, sms gateway api, sms email, sms bulk provider, sms blast service, short code sms, reseller bulk sms gateway, promotional sms service, promotional sms providers, transactional sms gateway, web design company, voice call service provider, voice call service, transactional sms services, transactional sms service, transactional sms price, transactional bulk sms, sms solutions, sms software HTTP API, SMPP API',
        },
        {
          name: 'country',
          content: 'NG',
        },
        {
          name: 'author',
          content: 'MultiTexter.com',
        },
        {
          name: 'language',
          content: 'en',
        },
        // Open Graph
        {
          name: 'og:type',
          content: 'website',
        },
        {
          name: 'og:url',
          content: '/',
        },
        {
          name: 'og:title',
          content:
            'Multitexter Bulk SMS: Send Free SMS to all Nigerian Networks. Get free delivery reports & API',
        },
        {
          name: 'og:description',
          content:
            "Buy and send bulk SMS on Nigeria and Africa's reliable text messaging provider, platform, portal and gateway. Best free and premium bulk SMS @ 1 unit per SMS.",
        },
        {
          name: 'og:image',
          content: '/multitexter.jpg',
        },
        // Twitter Card
        {
          name: 'twitter:title',
          content:
            'Multitexter Bulk SMS: Send Free SMS to all Nigerian Networks. Get free delivery reports & API',
        },
        {
          name: 'twitter:description',
          content:
            "Buy and send bulk SMS on Nigeria and Africa's reliable text messaging provider, platform, portal and gateway. Best free and premium bulk SMS @ 1 unit per SMS.",
        },
        {
          name: 'twitter:image',
          content: '/multitexter.jpg',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:site',
          content: 'Multitexter BulkSMS',
        },
        {
          name: 'twitter:url',
          content: '/',
        },
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com" crossorigin' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap',
        },
      ],
      script: [
        {
          src: 'https://apis.google.com/js/platform.js',
          defer: true,
        },
        {
          src: 'https://embed.tawk.to/5e9e109e69e9320caac5a432/default',
          defer: true,
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  typescript: {
    shim: false,
  },

  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@morev/vue-transitions/nuxt',
    '@nuxt/image',
  ],

  image: {
    domains: ['https://multitexter-sms.vercel.app/'],
  },

  colorMode: {
    classSuffix: '',
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },

  pinia: {
    autoImports: ['defineStore', 'storeToRefs'],
  },

  imports: {
    dirs: ['stores'],
  },

  experimental: {
    typedPages: true,
  },

  vite: {
    plugins: [
      svgLoader({
        svgo: true,
        svgoConfig: {
          plugins: [],
        },
      }),
    ],
  },

  runtimeConfig: {
    public: {
      BASE_URL: import.meta.env.NUXT_PUBLIC_BASE_URL,
      // BASE_URL: 'https://sandbox.multitexter.com/v2/app',
    },
  },

  devtools: { enabled: true },

  routeRules: {
    // User dashboard renders only on client-side
    '/dashboard/**': { ssr: false },
  },

  hooks: {
    'pages:extend'(pages) {
      // add routes
      pages.push(
        {
          name: 'login',
          path: '/login',
          file: '~/pages/auth/login.vue',
        },
        {
          name: 'signup',
          path: '/signup',
          file: '~/pages/auth/signup.vue',
        },
        {
          name: 'forgot-password',
          path: '/forgot-password',
          file: '~/pages/auth/forgot-password.vue',
        },
        {
          name: 'reset-password',
          path: '/reset-password',
          file: '~/pages/auth/reset-password.vue',
        },
        {
          name: 'resend-activation',
          path: '/resend-activation',
          file: '~/pages/auth/resend-activation.vue',
        },
        {
          name: 'logout',
          path: '/logout',
          file: '~/pages/auth/logout.vue',
        },
      )
    },
  },
})
