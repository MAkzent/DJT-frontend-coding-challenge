import axios from "axios";

const API_URL = "https://api.github.com/repos/";

function newQuery(
  org,
  repo,
  issues = [],
  perPage = 30,
  page = 1,
  filter = "all"
) {
  return {
    org: org,
    repo: repo,
    issues: issues,
    perPage: perPage,
    page: page,
    filter: filter,
    url: `https://github.com/${org}/${repo}`
  };
}

export function queryIssues(org, repo, conf = {}) {
  const page = conf.page || 1;
  const perPage = conf.perPage || 30;
  const filter = conf.filter || "all";
  return getIssues(org, repo, { page, perPage, filter }).then(issues =>
    newQuery(org, repo, issues, perPage, page, filter)
  );
}

export function next(query) {
  return queryIssues(query.org, query.repo, {
    page: query.page + 1,
    perPage: query.perPage,
    filter: query.filter
  });
}

export function extend(query) {
  const page = query.page + 1;
  return getIssues(query.org, query.repo, {
    page: page,
    perPage: query.perPage,
    filter: query.filter
  }).then(issues => {
    return newQuery(
      query.org,
      query.repo,
      query.issues.concat(issues),
      query.perPage,
      page,
      query.filter
    );
  });
}

function getIssues(org, repo, conf = {}) {
  const page = conf.page || 1;
  const perPage = conf.perPage || 30;
  const filter = conf.filter || "all";
  const action = filter === "pull" ? "pulls" : "issues";
  return axios
    .get(
      `${API_URL}${org}/${repo}/${action}?page=${page}&per_page=${perPage}&state=${filter}`
    )
    .then(res => res.data.map(issue => rawToIssue(issue)));
}

function rawToIssue(issue) {
  return {
    id: issue.number,
    title: issue.title,
    body: issue.body,
    state: issue.state,
    isPull: issue.pull_request != null || issue.requested_reviewers != null,
    labels: issue.labels,
    url: issue.html_url
  };
}
