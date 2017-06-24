// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

require('./sass/main.scss');

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

// window.sr = ScrollReveal({
// 		origin: 'right',
// 		duration: 900,
// 		distance:'10rem',
// 	});
// sr.reveal('.foo');
// sr.reveal('.bar');
