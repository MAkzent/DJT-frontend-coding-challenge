<template>
  <Card>
    <template v-slot:header>
      <v-clamp
        tag="h4"
        :style="{
          overflow: 'hidden',
          'max-height': '24px',
          'text-overflow': 'ellipsis',
          'white-space': 'nowrap'
        }"
      >
        {{ title }}</v-clamp
      >
      <IssueClosedIcon v-if="state === 'closed'" />
      <PullRequestIcon v-if="pullRequest" />
    </template>
    <template v-slot:body>
      <p v-if="!description.length" class="issue-no-description">
        No description provided.
      </p>
      <v-clamp
        v-else
        autoresize
        :style="{
          'overflow-y': 'scroll',
          'max-height': '104px'
        }"
      >
        {{ description }}
      </v-clamp>
    </template>
    <template v-slot:footer>
      <ul class="label-list">
        <li v-for="label in labels" :key="label" class="label">
          {{ label }}
        </li>
      </ul>
    </template>
  </Card>
</template>
<script>
import VClamp from 'vue-clamp'
import Card from './Card'
import IssueClosedIcon from '~/assets/icons/issue-closed.svg'
import PullRequestIcon from '~/assets/icons/pull-request.svg'

export default {
  components: {
    Card,
    IssueClosedIcon,
    PullRequestIcon,
    VClamp
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: ''
    },
    labels: {
      type: Array,
      default: () => []
    },
    pullRequest: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
.issue-no-description {
  color: #cfd8cd;
}

.label-list {
  display: flex;
  list-style: none;

  .label {
    align-items: center;
    background-color: #e91e63;
    border-radius: 4px;
    color: #fff;
    display: flex;
    flex: 0 0 1;
    font-size: 9px;
    margin-right: 1.25em;
    padding: 2px 6px 2px 6px;
  }

  .label:before {
    display: block;
    content: '\2022';
    color: #fff;
    flex: 0 0 0;
    font-weight: bolder;
    margin-right: 0.5em;
  }
}
</style>
