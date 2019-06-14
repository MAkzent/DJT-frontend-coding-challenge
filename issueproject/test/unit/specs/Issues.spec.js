import Vue from 'vue'
import Issues from '@/components/Issues'
import { mount } from '@vue/test-utils'

describe('Issues.vue', () => {
  let cmp, vm;

  beforeEach(() => {
    cmp = Vue.extend(Issues); // Create a copy of the original component
    vm = new cmp({
      data: {
        userString: 'facebook',
        repoString: 'react',
        filterStatus: 'all'
      }
    }).$mount(); // Instances and mounts the component
  });

  // it('should test a Vue instance', () => {
  //   const wrapper = mount(Issues)
  //   expect(wrapper.isVueInstance()).toBeTruthy()
  // })
  // it('renders a div', () => {
  //   const wrapper = mount(Issues)
  //   expect(wrapper.contains('div')).toBe(true)
  // })
  it('should render title', () => {
    const Constructor = Vue.extend(Issues)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#issues h1').textContent)
      .toEqual('Github Issues Viewer')
  })
  it('equals filterStatus to all', () => {
    expect(vm.filterStatus).toEqual('all');
  });
  it('equals userString to facebook', () => {
    expect(vm.userString).toEqual('facebook');
  });
  it('equals repoString to react', () => {
    expect(vm.repoString).toEqual('react');
  });
})
