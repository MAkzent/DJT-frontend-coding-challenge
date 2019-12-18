<template>
  <nav aria-label="Pagination">
    <ul class="pagination-wrapper">
      <li v-for="(pageNumber, index) in pageNumbers" :key="index">
        <div v-if="pageNumber === 0" class="pagination-gap">...</div>
        <nuxt-link
          v-else
          class="pagination-link"
          :to="{ query: { ...query, page: pageNumber } }"
          :class="{ active: isCurrentPage(pageNumber) }"
          :aria-current="isCurrentPage(pageNumber)"
          :aria-label="`Go to page ${pageNumber}`"
          >{{ pageNumber }}</nuxt-link
        >
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { generatePageNumbers } from '~/utils/pageNumbers'

@Component
export default class ThePagination extends Vue {
  @Prop({ type: Number, required: true }) readonly totalPageNumber!: number

  get query() {
    return this.$route.query
  }

  get currentPage() {
    return +this.query.page || 1
  }

  get pageNumbers() {
    return generatePageNumbers(this.currentPage, this.totalPageNumber)
  }

  isCurrentPage(pageNumber: number) {
    return pageNumber === this.currentPage
  }
}
</script>

<style scoped lang="scss">
@import '~/theme/colors';

.pagination-wrapper {
  margin-top: 48px;
  text-align: center;
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;

  @media (max-width: 480px) {
    margin-top: 24px;
  }
}

.pagination-link {
  padding: 0 8px;
  color: $color-gray;
  margin-right: 4px;
  text-decoration: none;

  &:hover {
    color: $color-dark-gray;
  }

  &.active {
    color: $color-red;
  }

  @media (max-width: 480px) {
    padding: 0 4px;
  }
}

.pagination-gap {
  color: $color-light-gray;
  margin-right: 4px;
  padding: 0 4px;

  @media (max-width: 480px) {
    padding: 0;
  }
}
</style>
