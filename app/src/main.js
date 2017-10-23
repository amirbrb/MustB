// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate';

Vue.use(VueRouter)
Vue.use(VeeValidate);
Vue.config.productionTip = false;

import HelpCaseView from './components/help/HelpCaseView'
import Settings from './components/misc/Settings'

const routes = [
	{ path: '/case/:id', component: HelpCaseView },
	{ path: '/settings', component: Settings }
];
const router = new VueRouter({ routes });

if(document.deviceready){
  document.addEventListener('deviceready', init, false);
}
else{
  init();
}

function init(){
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    data () {
      return {
        isLoading: false
      }
    },
    router: router
  }) 
}

