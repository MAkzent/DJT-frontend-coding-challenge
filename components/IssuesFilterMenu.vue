<template>
  <nav class="nav" aria-label="Main menu">
    <ul class="menu-list">
      <li v-for="menu in menuList" :key="menu">
        <nuxt-link
          :to="{ query: { ...query, menu, page: 1 } }"
          :class="{ active: menu === activeMenu }"
          class="menu-item"
          :data-testid="menu === activeMenu ? 'active-menu' : null"
          >{{ getMenuText(menu) }}</nuxt-link
        >
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Menu } from '~/store'

export const MenuText = {
  [Menu.All]: 'All Issues',
  [Menu.Open]: 'Open Issues',
  [Menu.Closed]: 'Closed Issues',
  [Menu.Pr]: 'Pull Request',
}

@Component
export default class IssuesFilterMenu extends Vue {
  @Prop({ type: String, required: true }) readonly activeMenu!: string
  menuList = Menu

  get query() {
    return this.$route.query
  }

  getMenuText(menu: Menu) {
    return MenuText[menu]
  }
}
</script>

<style scoped lang="scss">
@import '~/theme/colors';

.nav {
  font-weight: 300;
  padding: 48px 75px 24px;

  @media (max-width: 480px) {
    padding: 12px 24px;
  }
}

.menu-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

.menu-item {
  color: $color-gray;
  margin-right: 16px;
  text-decoration: none;

  &:hover {
    color: $color-dark-gray;
  }

  &.active {
    color: $color-red;
  }
}
</style>
