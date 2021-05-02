<template>
  <div class="card">
    <div class="header">
      <p>{{ issue.title }}</p>
      <div class="pull" v-if="issue.hasOwnProperty('pull_request')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 48">
          <path
            d="M7.2 3.2C3.7 3.2.8 6.1.8 9.6.8 12 2.1 14 4 15.1v21C2.1 37.2.8 39.2.8 41.6c0 3.5 2.9 6.4 6.4 6.4s6.4-2.9 6.4-6.4c0-2.4-1.3-4.4-3.2-5.5v-21c1.9-1.1 3.2-3.2 3.2-5.5 0-3.5-2.9-6.4-6.4-6.4zm0 41.6c-1.8 0-3.2-1.4-3.2-3.2 0-1.8 1.4-3.2 3.2-3.2 1.8 0 3.2 1.4 3.2 3.2 0 1.8-1.4 3.2-3.2 3.2zm0-32C5.4 12.8 4 11.4 4 9.6s1.4-3.2 3.2-3.2c1.8 0 3.2 1.4 3.2 3.2S9 12.8 7.2 12.8zM36 36.1V16c0-9.6-9.6-9.6-9.6-9.6h-3.2V0l-9.6 9.6 9.6 9.6v-6.4h3.2c2.8 0 3.2 3.2 3.2 3.2v20.1c-1.9 1.1-3.2 3.1-3.2 5.5 0 3.5 2.9 6.4 6.4 6.4s6.4-2.9 6.4-6.4c0-2.4-1.3-4.4-3.2-5.5zm-3.2 8.7c-1.8 0-3.2-1.4-3.2-3.2 0-1.8 1.4-3.2 3.2-3.2 1.8 0 3.2 1.4 3.2 3.2 0 1.8-1.4 3.2-3.2 3.2z"
          />
        </svg>
      </div>
      <div class="pull" v-if="issue.state === 'closed'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path
            d="M32 14.2L27.2 19l8 8.2L48 14.4l-4.8-4.8-7.9 7.9-3.3-3.3zM22.4 40c-8.8 0-16-7.2-16-16s7.2-16 16-16c4.4 0 8.4 1.8 11.3 4.7l4.5-4.5c-4.1-4.1-9.7-6.6-15.8-6.6C10 1.6 0 11.6 0 24s10 22.4 22.4 22.4 22.4-10 22.4-22.4l-10 10c.4-.5-3.8 6-12.4 6zm3.2-28.8h-6.4v16h6.4v-16zm-6.4 25.6h6.4v-6.4h-6.4v6.4z"
          />
        </svg>
      </div>
    </div>
    <div class="body">
      <p :class="descriptionCheck() ? 'des' : 'noDes'">
        {{ descriptionCheck() ? issue.body : "No description provided" }}
      </p>
    </div>
    <ul class="footer">
      <Label
        v-for="(label, index) in issue.labels"
        :key="index"
        :label="label"
      />
    </ul>
  </div>
</template>

<script>
import Label from "../components/Label";
export default {
  components: {
    Label
  },
  props: {
    issue: Object
  },
  methods: {
    descriptionCheck: function() {
      return this.issue.body !== "";
    }
  }
};
</script>

<style scoped>
.card {
  /* width: 30rem; */
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  margin: 10px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.295);
}

.header {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: var(--card-header);
  width: 100%;
  min-height: 30%;
  padding: 12px;
}

.pull {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 9px;
}

.header p {
  color: white;
  font-size: var(--title-text);
  font-weight: bold;
  text-align: center;
}

.body {
  min-height: 5rem;
  padding: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.body p {
  overflow: hidden;
  font-size: var(--para-text);
}

.des {
  color: var(--text-default);
  line-height: 2.2rem;
}

.noDes {
  color: var(--text-light);
}

.footer {
  display: flex;
  padding: 10px;
}
</style>
