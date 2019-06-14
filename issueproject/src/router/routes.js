import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/Search'
import Issues from '@/components/Issues'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search
    },
    {
      path: '/issues',
      name: 'issues',
      component: Issues
    }
  ]
})
