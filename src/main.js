import Vue from 'vue'

import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'

//Templates
import App from './views/App.vue'

  //routes
  import Post from './views/post/Post.vue'
  import Activate from './views/post/Activate.vue'
  import Thank_you from './views/post/Thank_you.vue'

  //Dashboard routes
  import Dashboard_home from './views/dashboard/Home.vue'

Vue.config.productionTip = false

//Vue router
Vue.use(VueRouter);
const routes = [
  { path: '/activate', component: Activate },
  { path: '/', component: Post },
  { path: '/thank_you', component: Thank_you },
  { path: '/dashboard', component: Dashboard_home },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

//Axios
Vue.use(VueAxios, axios);

//VueAuthenticate
Vue.use(VueAuthenticate, {
  // baseUrl: 'http://localhost:7071', // Your API domain
  baseUrl: 'https://advocacytool.azurewebsites.net', // Your API domain
  tokenName: 'access_token',
  tokenPath: 'access_token',

  providers: {
    linkedin: {
      clientId: '86h220n2vlk99q',
      redirectUri: 'http://localhost:8080/activate', // Your client app URL
      state: function () {
        return '!o!HH-Q991dF';//new Date().getTime().toString();
      },
      // url: '/api/HttpTrigger1',
      url: '/api/Authentication?code=1yxSUhXyFDhabdnw5MUTf2IaR8g2HydquCWyZTzlrE/siYmJkMSYGQ==',
      scope:['r_liteprofile','r_emailaddress','w_member_social'],
      // optionalUrlParams: ['scope', 'state', 'url']
      optionalUrlParams: ['scope', 'state']
    }
  }
})

//Start Vue
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
