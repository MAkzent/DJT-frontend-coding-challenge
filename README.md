# github-issue-viewer

> An app to view GitHub issues and PRs based on the URL.

## Build Setup

### Setup .env

1. Copy `.env.example` into `.env`
   ```bash
   cp .env.example .env
   ```
2. [Create a GitHub token](https://github.com/settings/tokens/new?scopes=public_repo&description=GitHub%20Issue%20Viewer) and paste it after `GITHUB_TOKEN=` in `.env`. This is to avoid the GitHub API rate limit issue. With out it we can only make 60 requests per hour.

### Available commands

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

### Testing

#### Static Analysis

```bash
$ yarn static-check
```

#### Unit test

```bash
$ yarn test
```

#### E2E test

```bash
$ yarn build && yarn start
# on another terminal session
$ yarn e2e

# You can also debug the E2E with
$ yarn e2e:dev
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
