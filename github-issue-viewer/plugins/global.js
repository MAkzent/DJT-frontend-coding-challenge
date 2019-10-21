import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Fragment from 'vue-fragment'
import VueMQ from 'vue-mq'

Vue.use(Vuelidate)
Vue.use(Fragment.Plugin)
Vue.use(VueMQ, { breakpoints: { sm: 600, defaultBreakpoint: 'sm' } })
