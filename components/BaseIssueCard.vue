<template>
  <div class="card" data-testid="issue-card">
    <div class="title">
      <div class="line-clamp">{{ title }}</div>
      <img
        v-if="isPullRequest"
        key="pr-icon"
        src="~/assets/icons/pull-request.svg"
        class="icon"
        alt="pull request icon"
      />
      <img
        v-else-if="isClosed"
        key="closed-issue-icon"
        src="~/assets/icons/issue-closed.svg"
        class="icon"
        alt="closed issue icon"
      />
    </div>
    <div class="content">
      <div class="body">
        <div v-if="body.length" key="body" class="line-clamp">{{ body }}</div>
        <div v-else key="empty-body" class="no-description">
          No description provided
        </div>
      </div>
      <div v-if="labels.length" class="labels">
        <span v-for="label in labels" :key="label.id" class="label">
          <span class="dot" />{{ label.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Label } from '~/serverMiddleware/api'

@Component
export default class BaseIssueCard extends Vue {
  @Prop({ type: String, required: true }) readonly title!: string
  @Prop({ type: String, required: true }) readonly body!: string
  @Prop({ type: Array, default: () => [] }) readonly labels!: Label[]
  @Prop({ type: Boolean, required: true }) readonly isPullRequest!: boolean
  @Prop({ type: Boolean, required: true }) readonly isClosed!: boolean
}
</script>

<style scoped lang="scss">
@import '~/theme/colors';

.card {
  box-shadow: 0 8px 32px 0 rgba($color-dark-gray, 0.5);
  color: $color-gray;
  height: 176px;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    margin-bottom: 24px;
  }
}

.title {
  padding: 20px;
  background: $color-blue;
  font-size: 18px;
  color: white;
  line-height: 24px;
  position: relative;
}

.icon {
  position: absolute;
  top: 8px;
  right: 8px;
  height: 10px;
}

.content {
  padding: 12px;
  font-size: 12px;
  color: $color-gray;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.body {
  flex: 1;
}

.no-description {
  color: $color-light-gray;
}

.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.labels {
  margin-top: 12px;
  display: flex;
  margin-bottom: -12px;
  flex-wrap: wrap;
  height: 32px;
  overflow: hidden;
}

.label {
  border-radius: 4px;
  background: $color-red;
  padding: 4px 4px 4px 6px;
  color: white;
  font-size: 9px;
  font-weight: 300;
  display: flex;
  width: fit-content;
  align-items: center;
  margin: 0 12px 12px 0;
}

.dot {
  width: 4px;
  height: 4px;
  display: inline-block;
  background: white;
  border-radius: 50%;
  margin-right: 4px;
}
</style>
