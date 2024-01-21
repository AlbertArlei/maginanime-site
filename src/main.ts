import './assets/main.css'

import { createApp, ref } from 'vue'
import { type Ref } from 'vue'
import App from './App.vue'
import router from './router'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      globalIsLoggedUser: Ref<boolean>;
      globalApiUrl: string;
    }
  }
  
const app = createApp(App);
app.config.globalProperties.globalIsLoggedUser = ref(false);
app.config.globalProperties.globalApiUrl = 'http://127.0.0.1:8181';
app.use(router)

app.mount('#app')