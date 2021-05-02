const axios = require("axios");

export const state = () => ({
  searchedParsed: [],
  searchedUrl: "",
  allIssues: [],
  filteredItem: "",
  valid: true
});

export const mutations = {
  updateParsedSearch: function(state, array) {
    state.searchedParsed = array;
  },
  updateSearchUrl: function(state, url) {
    state.searchedUrl = url;
  },
  setIssues: function(state, issues) {
    state.allIssues = issues;
  },
  setFilteredItem: function(state, filtered) {
    state.filteredItem = filtered;
  },
  setValid: function(state, bool) {
    state.valid = bool;
  }
};

export const actions = {
  fetchData: function({ commit, state }) {
    axios
      .get(
        `https://api.github.com/repos/${state.searchedParsed[0]}/${state.searchedParsed[1]}/issues`
      )
      .then(res => {
        console.log(res.data.labels);
        commit("setIssues", res.data);
      });
  },
  updateFilteredItem: function({ commit }, filtered) {
    commit("setFilteredItem", filtered);
  },
  setValid: function({ commit }, value) {
    commit("setValid", value);
  }
};
