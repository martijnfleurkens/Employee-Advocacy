import Vue from 'vue'

import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import store from './store';

//Templates
import App from './views/App.vue'

  //routes
  import Post from './views/post/Post.vue'
  import Activate from './views/post/Activate.vue'
  import Thank_you from './views/post/Thank_you.vue'

  //Dashboard routes
  import Login from './views/dashboard/Login.vue'
  import dashboard from './views/dashboard/Home.vue'
  import new_proposal from './views/dashboard/New_proposal.vue'
  import new_mail from './views/dashboard/New_mail.vue'

Vue.config.productionTip = false

//Vue router
Vue.use(VueRouter);
const routes = [
  { path: '/activate', component: Activate },
  { path: '/post/:id', component: Post },
  { path: '/thank_you', component: Thank_you },
  { path: '/dashboard', component: dashboard, name: "dashboard", beforeEnter: (to, from, next) => {routerprotec(to,from,next);}},
  { path: '/dashboard/login', component: Login },
  { path: '/', component: Login },
  { path: '/dashboard/new_proposal', component: new_proposal, beforeEnter: (to, from, next) => {routerprotec(to,from,next);} },
  { path: '/dashboard/new_mail', component: new_mail, beforeEnter: (to, from, next) => {routerprotec(to,from,next);} },
];

function routerprotec(to,from,next){
  if(store.state.authentication.authenticated == false) {
    next(false);
  } else { next(); }
}

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
  store,
  render: h => h(App)
});
