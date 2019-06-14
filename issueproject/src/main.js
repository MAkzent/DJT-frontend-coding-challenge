// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import axios from 'axios'
import App from './App'
import router from './router/routes'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// new Vue({
//   el: '#githubIssuesApp',
//   data () {
//     return {
//       issuesObj: null,
//       isResult: false,
//       searchQuery: ''
//     }
//   },
//   methods: {
//     removeSearchQuery: function () {
//       this.searchQuery = ''
//       this.isResult = false
//     },
//     submitSearch: function () {
//       const newArrayStrings = this.searchQuery.split('/')
//       let reqURL = 'https://api.github.com/repos/' + newArrayStrings[newArrayStrings.length - 3] + '/' + newArrayStrings[newArrayStrings.length - 2] + '/issues'
//       console.log('search query', this.searchQuery, newArrayStrings, reqURL, this.issuesObj)
//       axios.get(reqURL, { params: {
//         state: 'all'
//       }
//       }).then((response) => {
//         console.log('github response shows ', response.data, this.issuesObj)
//         this.issuesObj = response.data
//         this.isResult = true
//         console.log('issuesObj shows ', this.issuesObj)
//       }, function (response) { /* fail response msg */
//         console.log(response)
//       })
//     }
//   }
// })

// check state for open for open issues
// check state for closed for closed issues
// check if "pull_request" is non empty
