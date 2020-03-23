import Vue from 'vue'

import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'

//Templates
import App from './App.vue'

  //routes
  import Post from './Post.vue'
  import Activate from './Activate.vue'
  import Thank_you from './Thank_you.vue'

Vue.config.productionTip = false

//Vue router
Vue.use(VueRouter);
const routes = [
  { path: '/activate', component: Activate },
  { path: '/', component: Post },
  { path: '/thank_you', component: Thank_you },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

//Axios
Vue.use(VueAxios, axios);

//VueAuthenticate
Vue.use(VueAuthenticate, {
  // baseUrl: 'http://localhost:8080', // Your API domain
  baseUrl: 'http://server.martijnfl.nl', // Your API domain
  tokenName: 'access_token',
  tokenPath: 'access_token',
  
  providers: {
    linkedin: {
      clientId: '86h220n2vlk99q',
      redirectUri: 'http://localhost:8080/activate', // Your client app URL
      // redirectUri: 'http://server.martijnfl.nl/test/api.php', // Your client app URL
      state: function () { 
        return '!o!HH-Q991dF';//new Date().getTime().toString();
      },
      // url: 'http://localhost:8080/test/api.php',
      url: '/test/api.php',
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
