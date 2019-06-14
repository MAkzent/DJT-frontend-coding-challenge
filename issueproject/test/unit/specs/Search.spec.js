import Vue from 'vue'
import Search from '@/components/Search'
import { mount } from '@vue/test-utils'

describe('Search.vue', () => {
  let cmp, vm;

  beforeEach(() => {
    cmp = Vue.extend(Search); // Create a copy of the original component
    vm = new cmp({
      data: {
        searchQuery: 'https://github.com/facebook/react/issues'
      }
    }).$mount(); // Instances and mounts the component
  });

  it('should test a Vue instance', () => {
    const wrapper = mount(Search)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('renders a div', () => {
    const wrapper = mount(Search)
    expect(wrapper.contains('div')).toBe(true)
  })
  it('should render title', () => {
    const Constructor = Vue.extend(Search)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#search h1').textContent)
      .toEqual('Github Issues Viewer')
  })
  it('equals searchQuery to https://github.com/facebook/react/issues', () => {
    expect(vm.searchQuery).toEqual('https://github.com/facebook/react/issues');
  });
})
