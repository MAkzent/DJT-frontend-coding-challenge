<template>
  <div class="results">
    <div class="button-wrapper">
      <button v-on:click="handleAll">All issues</button>
      <button v-on:click="handleOpen">Open issues</button>
      <button v-on:click="handleClosed">Closed issues</button>
      <button v-on:click="handlePulls">Pull requests</button>
    </div>
    <div class="card-wrapper">
      <div class="card" v-for="issue in issues" v-bind:key="issue.number">
        <p id="card-title" v-text="issue.title"></p>
        <p id="card-body" v-text="issue.body"></p>
        <p id="card-state" v-text="issue.state"></p>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "Results",
  props: ["url"],
  watch: {
    url: function() {
      const addIssues = this.url + "/issues?state=all";
      axios.get(addIssues).then(response => {
        this.issues = response.data;
      });
    }
  },
  methods: {
    handleAll() {
      const addAll = this.url + "/issues?state=all";
      axios.get(addAll).then(response => {
        this.issues = response.data;
      });
    },
    handleOpen() {
      const addOpen = this.url + "/issues?state=open";
      axios.get(addOpen).then(response => {
        this.issues = response.data;
      });
    },
    handleClosed() {
      const addClosed = this.url + "/issues?state=closed";
      axios.get(addClosed).then(response => {
        this.issues = response.data;
      });
    },
    handlePulls() {
      const addPulls = this.url + "/pulls";
      axios.get(addPulls).then(response => {
        this.issues = response.data;
      });
    }
  },
  data() {
    return {
      issues: null
    };
  }
};
</script>

<style scoped>
.results {
  background-color: #ffffff;
  padding: 20px;
}

button {
  margin: 20px;
  border: none;
}

button:focus {
  outline: 0;
  color: #e91e63;
}

.card-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.card {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  background-color: #ffffff;
  width: 90%;
  height: 40vh;
  color: #000;
  margin: 20px;
  box-shadow: 8px 8px 30px rgb(163, 162, 162);
}

#card-title {
  overflow: hidden;
  font-size: 20px;
  padding: 15px 25px 25px 25px;
  background-color: #3f51b5;
  margin: 0px;
  color: #ffffff;
  line-height: 20px;
}

#card-body {
  overflow: hidden;
  font-size: 10px;
  padding: 25px;
  text-overflow: ellipsis;
  line-height: 15px;
  max-height: 30px;
}

#card-state {
  overflow: hidden;
  font-size: 10px;
  padding: 25px;
}

@media (max-width: 900px) {
  .card-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 650px) {
  .card-wrapper {
    display: grid;
    grid-template-columns: 1fr;
  }
  button {
    margin: 5px;
  }
}
</style>