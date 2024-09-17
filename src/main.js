import 'vuetify/styles' // Global CSS has to be imported
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
// import VueDatepickerUi from 'vue-datepicker-ui'
import 'vue-datepicker-ui/lib/vuedatepickerui.css';
import './main.scss'
import router from './router'
import i18n from './i18n'
import interceptor from './api/interceptor'
interceptor()

createApp(App).use(i18n)
  .use(vuetify)
  .use(router)
  .mount('#app')
