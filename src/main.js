// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import VeeValidate from "vee-validate";
// import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// veevalidate v2 ///////////////////////////////////
// import VeeValidate from "vee-validate";
//
// Vue.use(VeeValidate, {
//   inject: true,
//   fieldsBagName: "veeFields",
//   errorBagName: "veeErrors"
// });
///////////////////////////////////////////////////////

//vee-validate v3 /////////////////////////////////////
// import en from "vee-validate/dist/locale/en.json";
// import * as rules from "vee-validate/dist/rules";
// import {
//   ValidationObserver,
//   ValidationProvider,
//   extend,
//   localize
// } from "vee-validate";

// Object.keys(rules).forEach(rule => {
//   extend(rule, rules[rule]);
// });

// localize("en", en);

// // Install VeeValidate components globally
// Vue.component("ValidationObserver", ValidationObserver);
// Vue.component("ValidationProvider", ValidationProvider);
/////////////////////////////////////////////////////////

Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// new Vue({
//   router,
//   store,
//   render: (h) => h(App)
// }).$mount('#app')
