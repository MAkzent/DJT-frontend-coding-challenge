import axios from "axios";

const API_URL = "https://api.github.com/repos/";

function rawToRepo(raw) {
    console.log(raw);
  return {
    id: raw.id,
    repo: raw.name,
    org: raw.owner.login,
    url: raw.html_url
  };
}

export function getRepository(org, repo) {
  return axios
    .get(`${API_URL}${org}/${repo}`, {
      validateStatus: function(status) {
        return (status >= 200 && status < 300) || status === 404;
      }
    })
    .then(resp => {
      return resp.status === 404
        ? [null, "repository does not exist"]
        : [rawToRepo(resp.data), false];
    });
}

export function getRepositoryFromUrl(url) {
  const [org, repo, err] = urlToOrgRepo(url);
  if (err) {
    return Promise.resolve([null, "invalid url"]);
  }
  return getRepository(org, repo);
}

function urlToOrgRepo(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "github.com") {
      return [null, null, "not a github url"];
    }
    const path = parsed.pathname.substr(1).split("/");
    if (path.length !== 2) {
      return [null, null, "no org/repo path"];
    }
    return [path[0], path[1], false];
  } catch (e) {
    return [null, null, "no a valid url"];
  }
}
