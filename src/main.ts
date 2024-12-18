import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

//estilos generales
import './css/layaout.css';
import './css/normalice.css';
import './css/main.css'

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
