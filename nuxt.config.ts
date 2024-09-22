


export default defineNuxtConfig({
  $production:{
      routeRules:{ 
        '/**': { isr: true }
      }
    },
    $development:{
      
    },
    runtimeConfig:{
    // The private keys which are only available server-side
    apiSecret:'123',
    // Keys within public are also exposed client-side
    public:{
      API_BASE_URL: process.env.API_BASE_URL
    },

    modules:[
      '@vesp/nuxt-fontawesome',
    ],
  
    fontawesome: {
      icons: {
        solid: true,
        brands: true
      }
    },
  },
  

  components: [{
        path:'~/components',
        pathPrefix:false,    
      
      },],
  modules:[
    '@vesp/nuxt-fontawesome',
  ],

  fontawesome: {
    icons: {
      solid: ['faHome', 'faUser', 'faCog'],
    }
  },



     


  
  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
  ]    
  
})
