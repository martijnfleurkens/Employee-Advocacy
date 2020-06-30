import Vue from "vue";

import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
import VueAuthenticate from "vue-authenticate";
import store from "./store";
import VueGtag from "vue-gtag";
import setup from "../setup";

//Templates
import App from "./views/App.vue";

//routes
import Post from "./views/post/Post.vue";
import Thank_you from "./views/post/Thank_you.vue";

//Dashboard routes
import Login from "./views/dashboard/Login.vue";
import dashboard from "./views/dashboard/Home.vue";
import new_proposal from "./views/dashboard/New_proposal.vue";
import new_mail from "./views/dashboard/New_mail.vue";

Vue.config.productionTip = false;

//Vue router
Vue.use(VueRouter);
const routes = [
  { path: "/post/:id", component: Post },
  { path: "/thank_you", component: Thank_you },
  { path: "/demo", redirect: "/post/ea9d719a-a1c3-4e67-b1b0-18346ef24f22" },
  { path: "/dashboard", component: dashboard, name: "dashboard", meta: { auth: true } },
  { path: "/login", component: Login },
  { path: "/", component: Login },
  { path: "", component: Login },
  { path: "/dashboard/new_proposal", component: new_proposal, meta: { auth: true } },
  { path: "/dashboard/new_mail", component: new_mail, meta: { auth: true } },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && store.state.authentication.authenticated == false) {
    next("/login");
  } else {
    next();
  }
});

//Axios
Vue.use(VueAxios, axios);

//VueAuthenticate
Vue.use(VueAuthenticate, {
  baseUrl: setup["azure"]["functions"]["baseUrl"], // Your API domain
  // baseUrl: "https://advocacytool.azurewebsites.net", // Your API domain
  tokenName: "access_token",
  tokenPath: "access_token",

  providers: {
    linkedin: {
      clientId: "86h220n2vlk99q",
      redirectUri: setup["url"], // Your client app URL
      state: function () {
        return "!o!HH-Q991dF";
      },
      // url: '/api/HttpTrigger1',
      url: setup["azure"]["functions"]["authentication"],
      scope: ["r_liteprofile", "r_emailaddress", "w_member_social"], //r_member_social
      optionalUrlParams: ["scope", "state"],
    },
  },
});

//Gtag
Vue.use(
  VueGtag,
  {
    config: { id: "UA-167521106-1" },
  },
  router
);

//Start Vue
new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
